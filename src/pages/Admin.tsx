import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  stock: number;
  specifications?: Record<string, string>;
  brand?: string;
}

interface FAQ {
  id?: string;
  question: string;
  answer: string;
  category: string;
  dateAdded: string;
}

const AdminPage: React.FC = () => {
  const theme = useTheme();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageFileInputRef = useRef<HTMLInputElement>(null);

  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: '',
    price: 0,
    description: '',
    category: '',
    imageUrl: '',
    stock: 0,
    specifications: {},
    brand: '',
  });
  const [currentFAQ, setCurrentFAQ] = useState<FAQ>({
    question: '',
    answer: '',
    category: 'General',
    dateAdded: new Date().toISOString(),
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Product categories
  const productCategories = [
    'Software',
    'Laptops',
    'Desktops',
    'Accessories',
    'Monitors',
    'Storage',
    'Audio',
    'Networking',
  ];

  // FAQ categories
  const faqCategories = [
    'General',
    'Products',
    'Shipping',
    'Returns',
    'Technical Support',
    'Software',
    'Payments',
  ];

  // Check if user is admin, redirect if not
  useEffect(() => {
    if (!loading && user && !isAdmin()) {
      navigate('/');
    }
  }, [user, isAdmin, navigate, loading]);

  // Load products and FAQs
  useEffect(() => {
    fetchProducts();
    fetchFAQs();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load products',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'faqs'));
      const faqsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FAQ[];
      setFaqs(faqsList);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load FAQs',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenProductDialog = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setIsEditing(true);
    } else {
      setCurrentProduct({
        name: '',
        price: 0,
        description: '',
        category: '',
        imageUrl: '',
        stock: 0,
        specifications: {},
        brand: '',
      });
      setIsEditing(false);
    }
    setImageFile(null);
    setUploadProgress(0);
    setProductDialogOpen(true);
  };

  const handleOpenFAQDialog = (faq?: FAQ) => {
    if (faq) {
      setCurrentFAQ(faq);
      setIsEditing(true);
    } else {
      setCurrentFAQ({
        question: '',
        answer: '',
        category: 'General',
        dateAdded: new Date().toISOString(),
      });
      setIsEditing(false);
    }
    setFaqDialogOpen(true);
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: name === 'price' || name === 'stock' ? Number(value) : value });
  };

  const handleProductCategoryChange = (e: any) => {
    setCurrentProduct({ ...currentProduct, category: e.target.value });
  };

  const handleFAQChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentFAQ({ ...currentFAQ, [name]: value });
  };

  const handleFAQCategoryChange = (e: any) => {
    setCurrentFAQ({ ...currentFAQ, category: e.target.value });
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setCurrentProduct({ ...currentProduct, imageUrl: previewUrl });
    }
  };

  const uploadImageToStorage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      setIsUploading(true);
      setUploadProgress(0);
      
      // Create a unique file name
      const fileName = `product_images/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      
      // Upload the file
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      // Monitor the upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setIsUploading(false);
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          // Upload completed successfully, get the download URL
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setIsUploading(false);
          setUploadProgress(0);
          resolve(downloadUrl);
        }
      );
    });
  };

  const handleAddOrUpdateProduct = async () => {
    setLoading(true);
    try {
      // If a file was selected, upload it first
      let finalImageUrl = currentProduct.imageUrl;
      
      if (imageFile) {
        finalImageUrl = await uploadImageToStorage(imageFile);
      }
      
      if (isEditing && currentProduct.id) {
        // Update existing product
        await updateDoc(doc(db, 'products', currentProduct.id), {
          name: currentProduct.name,
          price: currentProduct.price,
          description: currentProduct.description,
          category: currentProduct.category,
          imageUrl: finalImageUrl,
          stock: currentProduct.stock,
          specifications: currentProduct.specifications,
          brand: currentProduct.brand,
        });
        setSnackbar({
          open: true,
          message: 'Product updated successfully',
          severity: 'success',
        });
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          name: currentProduct.name,
          price: currentProduct.price,
          description: currentProduct.description,
          category: currentProduct.category,
          imageUrl: finalImageUrl,
          stock: currentProduct.stock,
          specifications: currentProduct.specifications,
          brand: currentProduct.brand,
        });
        setSnackbar({
          open: true,
          message: 'Product added successfully',
          severity: 'success',
        });
      }
      setProductDialogOpen(false);
      setImageFile(null);
      fetchProducts();
    } catch (error) {
      console.error('Error adding/updating product:', error);
      setSnackbar({
        open: true,
        message: isEditing ? 'Failed to update product' : 'Failed to add product',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'products', id));
        setSnackbar({
          open: true,
          message: 'Product deleted successfully',
          severity: 'success',
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete product',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddOrUpdateFAQ = async () => {
    setLoading(true);
    try {
      if (isEditing && currentFAQ.id) {
        // Update existing FAQ
        await updateDoc(doc(db, 'faqs', currentFAQ.id), {
          question: currentFAQ.question,
          answer: currentFAQ.answer,
          category: currentFAQ.category,
        });
        setSnackbar({
          open: true,
          message: 'FAQ updated successfully',
          severity: 'success',
        });
      } else {
        // Add new FAQ
        await addDoc(collection(db, 'faqs'), {
          question: currentFAQ.question,
          answer: currentFAQ.answer,
          category: currentFAQ.category,
          dateAdded: new Date().toISOString(),
        });
        setSnackbar({
          open: true,
          message: 'FAQ added successfully',
          severity: 'success',
        });
      }
      setFaqDialogOpen(false);
      fetchFAQs();
    } catch (error) {
      console.error('Error adding/updating FAQ:', error);
      setSnackbar({
        open: true,
        message: isEditing ? 'Failed to update FAQ' : 'Failed to add FAQ',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'faqs', id));
        setSnackbar({
          open: true,
          message: 'FAQ deleted successfully',
          severity: 'success',
        });
        fetchFAQs();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        setSnackbar({
          open: true,
          message: 'Failed to delete FAQ',
          severity: 'error',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCsvImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results: Papa.ParseResult<any>) => {
        setLoading(true);
        try {
          const data = results.data as any[];
          let successCount = 0;
          
          // Determine if we're importing products or FAQs based on the current tab
          if (tabValue === 0) { // Products tab
            for (const item of data) {
              // Validate and transform CSV data
              const product: Product = {
                name: item.name || '',
                price: Number(item.price) || 0,
                description: item.description || '',
                category: item.category || '',
                imageUrl: item.imageUrl || '',
                stock: Number(item.stock) || 0,
                brand: item.brand || '',
                specifications: {},
              };
              
              // Add any specifications that might be included
              Object.keys(item).forEach(key => {
                if (key.startsWith('spec_') && item[key]) {
                  if (!product.specifications) product.specifications = {};
                  const specName = key.replace('spec_', '');
                  product.specifications[specName] = item[key];
                }
              });
              
              await addDoc(collection(db, 'products'), product);
              successCount++;
            }
          } else { // FAQs tab
            for (const item of data) {
              const faq: FAQ = {
                question: item.question || '',
                answer: item.answer || '',
                category: item.category || 'General',
                dateAdded: new Date().toISOString(),
              };
              
              await addDoc(collection(db, 'faqs'), faq);
              successCount++;
            }
          }
          
          setSnackbar({
            open: true,
            message: `Successfully imported ${successCount} ${tabValue === 0 ? 'products' : 'FAQs'}`,
            severity: 'success',
          });
          
          // Refresh the data
          if (tabValue === 0) {
            fetchProducts();
          } else {
            fetchFAQs();
          }
          
        } catch (error) {
          console.error('Error importing CSV:', error);
          setSnackbar({
            open: true,
            message: 'Failed to import CSV data',
            severity: 'error',
          });
        } finally {
          setLoading(false);
          // Clear the file input
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      },
      error: (error: Error) => {
        console.error('Error parsing CSV:', error);
        setSnackbar({
          open: true,
          message: 'Failed to parse CSV file',
          severity: 'error',
        });
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Add handler for specifications
  const [specificationKey, setSpecificationKey] = useState('');
  const [specificationValue, setSpecificationValue] = useState('');

  const handleAddSpecification = () => {
    if (specificationKey.trim() === '' || specificationValue.trim() === '') return;
    
    setCurrentProduct({
      ...currentProduct,
      specifications: {
        ...(currentProduct.specifications || {}),
        [specificationKey]: specificationValue
      }
    });
    
    // Clear inputs
    setSpecificationKey('');
    setSpecificationValue('');
  };

  const handleRemoveSpecification = (key: string) => {
    const newSpecs = { ...(currentProduct.specifications || {}) };
    delete newSpecs[key];
    
    setCurrentProduct({
      ...currentProduct,
      specifications: newSpecs
    });
  };

  // If not admin, redirect
  if (user && !isAdmin()) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography variant="h6">You don't have permission to access this page.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                mb: 4,
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Manage products and FAQs
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="admin tabs"
              sx={{ 
                '& .MuiTab-root': { 
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 500
                },
                '& .Mui-selected': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              <Tab label="Products" />
              <Tab label="FAQs" />
            </Tabs>
          </Box>

          {/* Products Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" fontWeight="medium">
                Manage Products
              </Typography>
              <Box>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleCsvImport}
                  sx={{ mr: 2 }}
                >
                  Import CSV
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenProductDialog()}
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                    },
                  }}
                >
                  Add Product
                </Button>
              </Box>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : products.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No products found. Add some products or import via CSV.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>R{product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenProductDialog(product)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => product.id && handleDeleteProduct(product.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* FAQs Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" fontWeight="medium">
                Manage FAQs
              </Typography>
              <Box>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleCsvImport}
                  sx={{ mr: 2 }}
                >
                  Import CSV
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenFAQDialog()}
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                    },
                  }}
                >
                  Add FAQ
                </Button>
              </Box>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : faqs.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No FAQs found. Add some FAQs or import via CSV.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Question</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Date Added</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {faqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell>{faq.question}</TableCell>
                        <TableCell>{faq.category}</TableCell>
                        <TableCell>{new Date(faq.dateAdded).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenFAQDialog(faq)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => faq.id && handleDeleteFAQ(faq.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </Paper>
      </Container>

      {/* Product Dialog */}
      <Dialog open={productDialogOpen} onClose={() => setProductDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Product Name"
                value={currentProduct.name}
                onChange={handleProductChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price (R)"
                type="number"
                value={currentProduct.price}
                onChange={handleProductChange}
                fullWidth
                required
                margin="normal"
                inputProps={{ step: 0.01, min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentProduct.category}
                  onChange={handleProductCategoryChange}
                  label="Category"
                >
                  {productCategories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="stock"
                label="Stock"
                type="number"
                value={currentProduct.stock}
                onChange={handleProductChange}
                fullWidth
                required
                margin="normal"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="brand"
                label="Brand"
                value={currentProduct.brand}
                onChange={handleProductChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="imageUrl"
                label="Image URL"
                value={currentProduct.imageUrl}
                onChange={handleProductChange}
                fullWidth
                margin="normal"
                helperText="URL to the product image"
              />
            </Grid>
            
            {/* Image Upload Section */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">OR</Typography>
              </Divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  ref={imageFileInputRef}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => imageFileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  Choose Image File
                </Button>
                {imageFile && (
                  <Typography variant="body2">
                    Selected: {imageFile.name}
                  </Typography>
                )}
                {isUploading && (
                  <Box sx={{ width: '100%', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Uploading: {Math.round(uploadProgress)}%
                    </Typography>
                    <LinearProgress variant="determinate" value={uploadProgress} />
                  </Box>
                )}
                {currentProduct.imageUrl && (
                  <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Image Preview:
                    </Typography>
                    <Box
                      component="img"
                      src={currentProduct.imageUrl}
                      alt="Product preview"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        p: 1
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                value={currentProduct.description}
                onChange={handleProductChange}
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
            </Grid>

            {/* Specifications Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                Product Specifications
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Specification Name"
                  value={specificationKey}
                  onChange={(e) => setSpecificationKey(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <TextField
                  label="Specification Value"
                  value={specificationValue}
                  onChange={(e) => setSpecificationValue(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleAddSpecification}
                  disabled={!specificationKey.trim() || !specificationValue.trim()}
                >
                  Add
                </Button>
              </Box>
              
              {/* Display current specifications */}
              {currentProduct.specifications && Object.keys(currentProduct.specifications).length > 0 && (
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Current Specifications:
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(currentProduct.specifications).map(([key, value]) => (
                      <Grid item xs={12} key={key}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {key}:
                            </Typography>
                            <Typography variant="body2">
                              {value}
                            </Typography>
                          </Box>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleRemoveSpecification(key)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddOrUpdateProduct} 
            variant="contained"
            disabled={loading || isUploading}
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            {(loading || isUploading) ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* FAQ Dialog */}
      <Dialog open={faqDialogOpen} onClose={() => setFaqDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={currentFAQ.category}
                  onChange={handleFAQCategoryChange}
                  label="Category"
                >
                  {faqCategories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="question"
                label="Question"
                value={currentFAQ.question}
                onChange={handleFAQChange}
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="answer"
                label="Answer"
                value={currentFAQ.answer}
                onChange={handleFAQChange}
                fullWidth
                multiline
                rows={6}
                required
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFaqDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddOrUpdateFAQ} 
            variant="contained"
            disabled={loading}
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPage; 