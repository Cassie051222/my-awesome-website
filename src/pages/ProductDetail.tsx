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
  Avatar,
  List,
  ListItem,
  Paper,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getProductById, Product, getProductReviews, addProductReview, Review } from '../services/ProductService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

// TabPanel component for product tabs
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
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Function to format date
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

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
  const [tabValue, setTabValue] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
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
          fetchProductReviews(productData.id);
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

  // Fetch product reviews
  const fetchProductReviews = async (productId: string) => {
    try {
      setReviewsLoading(true);
      const reviewsData = await getProductReviews(productId);
      setReviews(reviewsData);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setReviewsLoading(false);
    }
  };

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

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle review dialog open/close
  const handleReviewDialogOpen = () => {
    if (!user) {
      setNotification({
        open: true,
        message: 'Please log in to write a review',
        severity: 'error',
      });
      return;
    }
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
  };

  // Handle review form changes
  const handleReviewRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview({
      ...newReview,
      rating: parseInt(event.target.value),
    });
  };

  const handleReviewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview({
      ...newReview,
      comment: event.target.value,
    });
  };

  // Submit review
  const handleReviewSubmit = async () => {
    if (!product || !user) return;

    try {
      const reviewData: Review = {
        productId: product.id,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date(),
        verified: true, // Mark as verified if they purchased the product
      };

      await addProductReview(reviewData);
      
      // Refresh reviews
      fetchProductReviews(product.id);
      
      setNotification({
        open: true,
        message: 'Review submitted successfully!',
        severity: 'success',
      });
      
      // Reset form and close dialog
      setNewReview({ rating: 5, comment: '' });
      setReviewDialogOpen(false);
    } catch (err) {
      console.error('Error submitting review:', err);
      setNotification({
        open: true,
        message: 'Failed to submit review. Please try again.',
        severity: 'error',
      });
    }
  };

  const renderLoadingSkeleton = () => (
    <Box sx={{ pb: 8, textAlign: 'center' }}>
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
      <Box sx={{ pb: 8 }}>
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
  
  // Calculate prices
  const priceInZAR = product?.price || 0;
  const finalPrice = product?.discount 
    ? priceInZAR * (1 - (product.discount / 100)) 
    : priceInZAR;
  
  return (
    <Box sx={{ pb: 8 }}>
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
                    size="small"
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
                    maxHeight: '500px',
                    objectFit: 'contain',
                    p: 4,
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
                {/* Product Title and Rating */}
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={product.rating} precision={0.5} readOnly />
                  <Typography 
                    variant="body2" 
                    sx={{ ml: 1, color: 'text.secondary', cursor: 'pointer' }}
                    onClick={() => setTabValue(1)}
                  >
                    ({product.reviewCount || reviews.length} reviews)
                  </Typography>
                </Box>
                
                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  {product.discount ? (
                    <>
                      <Typography
                        variant="body1"
                        sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                      >
                        R{priceInZAR.toLocaleString()}
                      </Typography>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        R{finalPrice.toLocaleString()}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      R{priceInZAR.toLocaleString()}
                    </Typography>
                  )}
                </Box>

                {/* Stock Status */}
                <Box sx={{ mb: 3 }}>
                  {product.stock > 0 ? (
                    <Chip
                      label={`In Stock (${product.stock} available)`}
                      color="success"
                      size="small"
                    />
                  ) : (
                    <Chip label="Out of Stock" color="error" size="small" />
                  )}
                </Box>
                
                {/* Description */}
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {product.description}
                </Typography>
                
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    InputProps={{ inputProps: { min: 1, max: product.stock } }}
                    sx={{ width: 100 }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    fullWidth
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
                
                {/* Additional Actions */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Product Tabs */}
        <Box sx={{ width: '100%', mt: 5 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="product tabs">
              <Tab label="Specifications" />
              <Tab label={`Reviews (${product.reviewCount || reviews.length})`} />
            </Tabs>
          </Box>
          
          {/* Specifications Tab */}
          <TabPanel value={tabValue} index={0}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Product Specifications
                </Typography>
                <Grid container spacing={2}>
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle2" color="text.secondary">
                          {key}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={9}>
                        <Typography variant="body2">
                          {value}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>
          
          {/* Reviews Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Customer Reviews</Typography>
                <Button 
                  variant="contained" 
                  onClick={handleReviewDialogOpen}
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                    },
                  }}
                >
                  Write a Review
                </Button>
              </Box>
              
              {/* Reviews Summary */}
              <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h3" fontWeight="bold">{product.rating.toFixed(1)}</Typography>
                  <Rating value={product.rating} precision={0.5} readOnly size="large" />
                  <Typography variant="body2" color="text.secondary">
                    {product.reviewCount || reviews.length} reviews
                  </Typography>
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(review => Math.round(review.rating) === star).length;
                    const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
                    
                    return (
                      <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" sx={{ width: 30 }}>
                          {star}★
                        </Typography>
                        <Box sx={{ flexGrow: 1, ml: 1, mr: 2 }}>
                          <Box
                            sx={{
                              width: '100%',
                              height: 10,
                              bgcolor: 'background.paper',
                              borderRadius: 5,
                              position: 'relative',
                            }}
                          >
                            <Box
                              sx={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: `${percentage}%`,
                                bgcolor: '#FF6B00',
                                borderRadius: 5,
                              }}
                            />
                          </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ width: 40 }}>
                          {percentage.toFixed(0)}%
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              
              {/* Reviews List */}
              {reviewsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : reviews.length > 0 ? (
                <List sx={{ width: '100%' }}>
                  {reviews.map((review) => (
                    <ListItem key={review.id} alignItems="flex-start" disableGutters>
                      <Paper sx={{ width: '100%', p: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar sx={{ bgcolor: '#FF6B00', mr: 2 }}>
                            {review.userName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1">
                              {review.userName}
                              {review.verified && (
                                <Chip 
                                  label="Verified Purchase" 
                                  size="small" 
                                  color="success" 
                                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                                />
                              )}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={review.rating} size="small" readOnly />
                              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                {formatDate(new Date(review.date))}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body2">{review.comment}</Typography>
                      </Paper>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No reviews yet. Be the first to review this product!
                  </Typography>
                </Box>
              )}
            </Box>
          </TabPanel>
        </Box>
      </Container>
      
      {/* Snackbar Notifications */}
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
      
      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onClose={handleReviewDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              How would you rate this product?
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                name="rating"
                value={newReview.rating}
                onChange={handleReviewRatingChange}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={value} readOnly size="small" sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          {value === 1 ? 'Poor' : 
                           value === 2 ? 'Fair' : 
                           value === 3 ? 'Good' : 
                           value === 4 ? 'Very Good' : 'Excellent'}
                        </Typography>
                      </Box>
                    }
                    sx={{ mr: 2 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            
            <TextField
              margin="dense"
              label="Your Review"
              fullWidth
              multiline
              rows={4}
              value={newReview.comment}
              onChange={handleReviewCommentChange}
              helperText="Share your experience with this product"
              sx={{ mt: 3 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose}>Cancel</Button>
          <Button 
            onClick={handleReviewSubmit} 
            variant="contained"
            disabled={newReview.comment.trim().length === 0}
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetail; 