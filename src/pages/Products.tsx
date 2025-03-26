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
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  IconButton,
  Rating,
  Divider,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { getProducts, Product } from '../services/ProductService';

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000]);
  const [brandFilter, setBrandFilter] = useState<string>('all');

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      setSnackbar({
        open: true,
        message: 'Please log in to add items to your cart',
        severity: 'error',
      });
      return;
    }

    // Apply the conversion rate for the cart item price
    const adjustedPrice = product.price * 18.5;

    addItem({
      id: product.id.toString(),
      name: product.name,
      price: adjustedPrice,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success',
    });
  };

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCategory(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle price range change
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  // Handle brand filter change
  const handleBrandChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setBrandFilter(event.target.value as string);
  };

  // Get all unique brands from products
  const brands = ['all', ...Array.from(new Set(products.map(product => product.brand || 'Other')))];

  // Filter products based on all filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 0 || 
                           (product.category === ['All', 'Laptops', 'Desktops', 'Components', 'Accessories'][selectedCategory]);
    
    const price = product.price * 18.5;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    
    const matchesBrand = brandFilter === 'all' || product.brand === brandFilter;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
  });

  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: 8,
          mb: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(https://images.unsplash.com/photo-1623126464548-c858d3aec4d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: theme.palette.mode === 'dark' ? 0.3 : 0.1,
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
              variant="h1"
              align="center"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Products
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.primary', maxWidth: '800px', mx: 'auto', mb: 4 }}
            >
              Discover premium tech products for your computing needs
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Enhanced Search and Filter Bar */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ width: '100%' }}>
                <Typography gutterBottom>Price Range (ZAR)</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={50000}
                  step={1000}
                  sx={{
                    color: '#FF6B00',
                    '& .MuiSlider-thumb': {
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(255, 107, 0, 0.16)',
                      },
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">R{priceRange[0].toLocaleString()}</Typography>
                  <Typography variant="body2">R{priceRange[1].toLocaleString()}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="brand-select-label">Brand</InputLabel>
                <Select
                  labelId="brand-select-label"
                  value={brandFilter}
                  label="Brand"
                  onChange={handleBrandChange as any}
                  sx={{ borderRadius: 2 }}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand === 'all' ? 'All Brands' : brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Card>

        {/* Category Tabs */}
        <Box sx={{ width: '100%', mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 'medium',
                fontSize: '1rem',
                minWidth: 100,
              },
              '& .Mui-selected': {
                color: '#FF6B00 !important',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#FF6B00',
              },
            }}
          >
            <Tab label="All Products" />
            <Tab label="Laptops" />
            <Tab label="Desktops" />
            <Tab label="Components" />
            <Tab label="Accessories" />
          </Tabs>
        </Box>

        {/* Error and Loading States */}
        {error && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Typography color="error" variant="h6">
              {error}
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : (
          <>
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <Grid container spacing={4}>
                {filteredProducts.map((product) => {
                  // Apply the conversion rate for display
                  const displayPrice = product.price * 18.5;
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -10 }}
                      >
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              boxShadow: '0 8px 40px rgba(255, 107, 0, 0.2)',
                            },
                            cursor: 'pointer',
                            position: 'relative',
                          }}
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                            <IconButton
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                },
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Add to favorites');
                              }}
                            >
                              <FavoriteBorderIcon sx={{ color: '#FF6B00' }} />
                            </IconButton>
                          </Box>
                          <CardMedia
                            component="img"
                            height="200"
                            image={product.imageUrl}
                            alt={product.name}
                            sx={{ objectFit: 'contain', p: 2 }}
                          />
                          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                            <Typography gutterBottom variant="h6" noWrap>
                              {product.name}
                            </Typography>
                            <Rating value={product.rating || 4} precision={0.5} readOnly size="small" sx={{ mb: 1 }} />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mb: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              {product.description}
                            </Typography>
                            {product.category && (
                              <Chip
                                label={product.category}
                                size="small"
                                sx={{
                                  alignSelf: 'flex-start',
                                  mb: 1,
                                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 107, 0, 0.1)',
                                  color: theme.palette.mode === 'dark' ? '#FF8533' : '#FF6B00',
                                }}
                              />
                            )}
                            <Box sx={{ mt: 'auto' }}>
                              <Typography variant="h6" color="primary" fontWeight="bold" sx={{ mb: 1 }}>
                                R{displayPrice.toLocaleString()}
                              </Typography>
                              <Button
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                fullWidth
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
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
                  );
                })}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', my: 8 }}>
                <Typography variant="h5">No products found matching your criteria</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  Try adjusting your filters or search term
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
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

export default Products; 