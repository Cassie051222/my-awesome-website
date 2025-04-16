import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Chip,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Rating,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  Dialog,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SortIcon from '@mui/icons-material/Sort';
import { getProducts, getProductCategories, Product } from '../services/ProductService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

// Add dialogStyle constant for future Dialog components
const dialogStyle = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    paddingTop: 5
  }
};

const ProductSearch = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  
  // State for products and filters
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Pagination
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  
  // Notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch categories
        const categoriesData = await getProductCategories();
        setCategories(categoriesData);
        
        // Fetch products with filters
        const productsData = await getProducts(
          selectedCategory || undefined,
          searchQuery || undefined,
          sortBy,
          sortDirection,
          priceRange[0] || undefined,
          priceRange[1] || undefined
        );
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedCategory, sortBy, sortDirection, priceRange]);
  
  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchSearchResults = async () => {
        try {
          setLoading(true);
          const productsData = await getProducts(
            selectedCategory || undefined,
            searchQuery || undefined,
            sortBy,
            sortDirection,
            priceRange[0] || undefined,
            priceRange[1] || undefined
          );
          setProducts(productsData);
        } catch (err) {
          console.error('Error fetching search results:', err);
          setError('Failed to search products. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchSearchResults();
    }, 500); // Debounce for 500ms
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Handle price range change
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };
  
  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    if (!user) {
      setNotification({
        open: true,
        message: 'Please log in to add items to your cart',
        severity: 'error',
      });
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    
    setNotification({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success',
    });
  };
  
  // Get current page products
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchQuery, priceRange, sortBy, sortDirection]);
  
  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: 6,
          mb: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: theme.palette.mode === 'dark' ? 0.1 : 0.05,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : '#121212',
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Browse Our Products
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto', mb: 3 }}
            >
              Find the perfect tech for your needs
            </Typography>
            
            {/* Search Bar */}
            <Box sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2
            }}>
              <TextField
                fullWidth
                placeholder="Search products..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '50px',
                    bgcolor: theme.palette.background.paper,
                  }
                }}
              />
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  value={`${sortBy}-${sortDirection}`}
                  label="Sort By"
                  onChange={(e) => {
                    const [field, direction] = e.target.value.split('-');
                    setSortBy(field);
                    setSortDirection(direction as 'asc' | 'desc');
                  }}
                  startAdornment={
                    <InputAdornment position="start">
                      <SortIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="name-asc">Name (A-Z)</MenuItem>
                  <MenuItem value="name-desc">Name (Z-A)</MenuItem>
                  <MenuItem value="price-asc">Price (Low-High)</MenuItem>
                  <MenuItem value="price-desc">Price (High-Low)</MenuItem>
                  <MenuItem value="rating-desc">Top Rated</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterListIcon />
                    Filters
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {/* Categories */}
                  <Typography variant="h6" sx={{ mb: 1 }}>Categories</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Chip
                      label="All Categories"
                      clickable
                      color={selectedCategory === '' ? 'primary' : 'default'}
                      onClick={() => setSelectedCategory('')}
                      sx={{ mb: 1 }}
                    />
                    {categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        clickable
                        color={selectedCategory === category ? 'primary' : 'default'}
                        onClick={() => setSelectedCategory(category)}
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {/* Price Range */}
                  <Typography variant="h6" sx={{ mb: 1 }}>Price Range</Typography>
                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={priceRange}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      min={0}
                      max={2000}
                      step={50}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2">
                        ${priceRange[0]}
                      </Typography>
                      <Typography variant="body2">
                        ${priceRange[1]}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  {/* Reset Filters */}
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => {
                      setSelectedCategory('');
                      setSearchQuery('');
                      setPriceRange([0, 2000]);
                      setSortBy('name');
                      setSortDirection('asc');
                    }}
                    sx={{ mt: 2 }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          {/* Products Grid */}
          <Grid item xs={12} md={9}>
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography>Loading products...</Typography>
              </Box>
            ) : error ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography color="error">{error}</Typography>
                <Button 
                  variant="contained" 
                  onClick={() => window.location.reload()}
                  sx={{ mt: 2 }}
                >
                  Try Again
                </Button>
              </Box>
            ) : products.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>No products found</Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Try adjusting your search or filter criteria
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                    setPriceRange([0, 2000]);
                  }}
                >
                  Clear Filters
                </Button>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography>
                    Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  {currentProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <CardMedia
                            component="img"
                            height="180"
                            image={product.imageUrl}
                            alt={product.name}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/products/${product.id}`)}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                {product.category}
                              </Typography>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                cursor: 'pointer',
                                '&:hover': { color: 'primary.main' },
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                height: '3.6rem',
                              }}
                              onClick={() => navigate(`/products/${product.id}`)}
                            >
                              {product.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                              {product.discount ? (
                                <Box>
                                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                    R{(product.price * 18.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </Typography>
                                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                    R{(product.price * 18.5 * (1 - product.discount / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </Typography>
                                </Box>
                              ) : (
                                <Typography variant="subtitle1" fontWeight="bold" color="primary">
                                  R{(product.price * 18.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Typography>
                              )}
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handleAddToCart(product)}
                                sx={{
                                  background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                                  '&:hover': {
                                    background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                                  },
                                }}
                              >
                                Add to Cart
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
                
                {/* Pagination */}
                {products.length > productsPerPage && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={Math.ceil(products.length / productsPerPage)}
                      page={page}
                      onChange={(_, value) => setPage(value)}
                      color="primary"
                      showFirstButton
                      showLastButton
                    />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
      
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductSearch; 