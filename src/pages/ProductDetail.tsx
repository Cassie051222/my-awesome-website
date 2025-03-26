import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Rating,
  Divider,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  Skeleton,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getProductById, Product } from '../services/ProductService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  
  // State
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(id);
        if (!productData) {
          setError('Product not found');
        } else {
          setProduct(productData);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id]);
  
  // Handle quantity change
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue) || newValue < 1) {
      setQuantity(1);
    } else if (product && newValue > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(newValue);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    if (!user) {
      setNotification({
        open: true,
        message: 'Please log in to add items to your cart',
        severity: 'error',
      });
      return;
    }
    
    // Apply the conversion rate for the cart item price
    const adjustedPrice = product.price * 18.5;
    
    addItem({
      id: product.id,
      name: product.name,
      price: adjustedPrice,
      imageUrl: product.imageUrl,
      quantity,
    });
    
    setNotification({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success',
    });
  };
  
  const renderLoadingSkeleton = () => (
    <Box sx={{ pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={100} height={40} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={60} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="60%" height={30} sx={{ mb: 3 }} />
            <Skeleton variant="text" width={120} height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1, mb: 3 }} />
            <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 1, mb: 3 }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
  
  if (loading) {
    return renderLoadingSkeleton();
  }
  
  if (error || !product) {
    return (
      <Box sx={{ pt: 4, pb: 8, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            {error || 'Product not found'}
          </Typography>
          <Button 
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/hardware')}
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Container>
      </Box>
    );
  }
  
  // Update the price calculations
  // Calculate final price with discount
  const priceInZAR = product.price * 18.5;
  const finalPrice = product.discount
    ? priceInZAR * (1 - product.discount / 100)
    : priceInZAR;
  
  return (
    <Box sx={{ pt: 4, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: 'text.secondary' }}
          >
            Back to Products
          </Button>
        </Box>
        
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ 
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {product.discount && (
                  <Chip
                    label={`${product.discount}% OFF`}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 'bold',
                    }}
                  />
                )}
                <Box 
                  component="img"
                  src={product.imageUrl}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    p: 2
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
          
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box>
                <Typography variant="subtitle1" color="primary">
                  {product.category}
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, mb: 2, fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={product.rating} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({product.rating})
                  </Typography>
                  {product.brand && (
                    <Chip
                      label={product.brand}
                      variant="outlined"
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  )}
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  {product.discount ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="h4" fontWeight="bold">
                        R{finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        R{priceInZAR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="h4" fontWeight="bold">
                      R{priceInZAR.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                  )}
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {product.description}
                </Typography>
                
                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Specifications
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2" color="text.secondary">
                              {key}
                            </Typography>
                            <Typography variant="body1">
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                
                {/* Add to Cart */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Availability: <span style={{ color: product.stock > 0 ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                    </span>
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <TextField
                      type="number"
                      label="Quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      InputProps={{ inputProps: { min: 1, max: product.stock } }}
                      disabled={product.stock <= 0}
                      sx={{ width: 100 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<AddShoppingCartIcon />}
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                      sx={{
                        py: 1.5,
                        px: 3,
                        background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
                
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    color="primary"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                    }}
                  >
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail; 