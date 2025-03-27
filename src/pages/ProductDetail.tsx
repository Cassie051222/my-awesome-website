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
  AlertColor,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProductById, Product, getProductReviews, addProductReview, Review, deleteProductReview, updateProductReview } from '../services/ProductService';
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
    severity: 'success' as AlertColor,
  });
  const [tabValue, setTabValue] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Add a safety timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          console.warn('Product loading timed out after 5 seconds');
          setLoading(false);
          setError('Loading timed out. Please try refreshing the page.');
        }, 5000);
        
        const productData = await getProductById(id);
        
        // Clear the timeout since we got a response
        clearTimeout(timeoutId);
        
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
      console.log('Fetching reviews for product ID:', productId);
      
      const reviewsData = await getProductReviews(productId);
      console.log('Reviews data received:', JSON.stringify(reviewsData));
      
      if (reviewsData && reviewsData.length > 0) {
        // Force convert all ratings to numbers to avoid type issues
        const normalizedReviews = reviewsData.map(review => ({
          ...review,
          rating: typeof review.rating === 'number' ? review.rating : Number(review.rating || 0),
          // Ensure date is a proper Date object
          date: review.date instanceof Date ? review.date : new Date(review.date)
        }));
        
        console.log('Normalized reviews:', normalizedReviews);
        setReviews(normalizedReviews);
        setReviewsLoading(false);
      } else {
        console.log('No reviews found for product ID:', productId);
        
        // If product has reviews count but none were loaded, try a direct Firestore query
        if (product?.reviewCount && product.reviewCount > 0) {
          console.log('Product has reviews but none were loaded, trying again with delay...');
          
          // Set a delay before trying again
          setTimeout(() => {
            console.log('Retrying review fetch for product ID:', productId);
            // Force a direct query to Firestore instead of using the service
            import('firebase/firestore').then(({ collection, query, where, getDocs }) => {
              import('../firebase/config').then(async ({ db }) => {
                try {
                  const reviewsQuery = query(
                    collection(db, 'reviews'),
                    where('productId', '==', productId)
                  );
                  
                  const querySnapshot = await getDocs(reviewsQuery);
                  console.log(`Direct query found ${querySnapshot.docs.length} reviews`);
                  
                  if (querySnapshot.docs.length > 0) {
                    const reviews = querySnapshot.docs.map(doc => {
                      const data = doc.data();
                      return {
                        id: doc.id,
                        productId: data.productId,
                        userId: data.userId,
                        userName: data.userName || 'Anonymous',
                        rating: Number(data.rating || 0),
                        comment: data.comment || '',
                        date: data.date?.toDate() || new Date(),
                        verified: data.verified || false
                      } as Review;
                    });
                    
                    console.log('Reviews from direct query:', reviews);
                    setReviews(reviews);
                    setReviewsLoading(false);
                  } else {
                    // Make sure we set loading to false even if no reviews are found
                    console.log('No reviews found in direct query either');
                    setReviewsLoading(false);
                  }
                } catch (err) {
                  console.error('Error in direct Firestore query:', err);
                  setReviewsLoading(false);
                }
              }).catch(err => {
                console.error('Error importing firebase config:', err);
                setReviewsLoading(false);
              });
            }).catch(err => {
              console.error('Error importing firebase/firestore:', err);
              setReviewsLoading(false);
            });
          }, 1500);
        } else {
          setReviewsLoading(false);
        }
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
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
    
    // Use direct price without conversion
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
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
    setEditingReview(null);
    setNewReview({ rating: 0, comment: '' });
  };

  // Handle review form changes
  const handleReviewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview({
      ...newReview,
      comment: event.target.value,
    });
  };

  // Handle review edit
  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setNewReview({
      rating: review.rating,
      comment: review.comment,
    });
    setReviewDialogOpen(true);
  };

  // Handle review delete
  const handleDeleteReview = async (reviewId: string) => {
    if (!product || !reviewId) return;
    
    try {
      setNotification({
        open: true,
        message: 'Deleting review...',
        severity: 'info',
      });
      
      await deleteProductReview(reviewId);
      
      setNotification({
        open: true,
        message: 'Review deleted successfully!',
        severity: 'success',
      });
      
      // Refresh reviews after a short delay
      setTimeout(() => {
        fetchProductReviews(product.id);
      }, 1000);
    } catch (err) {
      console.error('Error deleting review:', err);
      setNotification({
        open: true,
        message: 'Failed to delete review. Please try again.',
        severity: 'error',
      });
    }
  };

  // Submit review (modified to handle both new and edited reviews)
  const handleReviewSubmit = async () => {
    if (!product || !user) return;

    try {
      setNotification({
        open: true,
        message: editingReview ? 'Updating your review...' : 'Submitting your review...',
        severity: 'info',
      });

      // First check if the review is valid
      if (newReview.rating === 0) {
        setNotification({
          open: true,
          message: 'Please select a rating before submitting',
          severity: 'error',
        });
        return;
      }

      if (newReview.comment.trim() === '') {
        setNotification({
          open: true,
          message: 'Please write a review comment before submitting',
          severity: 'error',
        });
        return;
      }

      if (editingReview) {
        // Update existing review
        const updatedReview: Review = {
          ...editingReview,
          rating: newReview.rating,
          comment: newReview.comment,
          date: new Date(), // Update the date to reflect the edit time
        };

        console.log('Updating review:', updatedReview);
        await updateProductReview(updatedReview);
        console.log('Review updated successfully');
      } else {
        // Create new review
        const reviewData: Review = {
          productId: product.id,
          userId: user.uid,
          userName: user.displayName || 'Anonymous',
          rating: newReview.rating,
          comment: newReview.comment,
          date: new Date(),
          verified: true, // Mark as verified if they purchased the product
        };

        console.log('Submitting review:', reviewData);
        const reviewId = await addProductReview(reviewData);
        console.log('Review submitted with ID:', reviewId);
      }
      
      // If we get here, the review was successfully added or updated
      
      // Refresh reviews after a short delay to allow Firestore to update
      setTimeout(() => {
        fetchProductReviews(product.id);
      }, 1000);
      
      setNotification({
        open: true,
        message: editingReview ? 'Review updated successfully!' : 'Review submitted successfully!',
        severity: 'success',
      });
      
      // Reset form and close dialog
      setNewReview({ rating: 0, comment: '' });
      setEditingReview(null);
      setReviewDialogOpen(false);
    } catch (err) {
      console.error(editingReview ? 'Error updating review:' : 'Error submitting review:', err);
      setNotification({
        open: true,
        message: editingReview ? 'Failed to update review. Please try again.' : 'Failed to submit review. Please try again.',
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
  
  // Calculate prices - no conversion necessary
  const finalPrice = product?.discount 
    ? product.price * (1 - (product.discount / 100)) 
    : product.price;
  
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
                        R{product.price.toLocaleString()}
                      </Typography>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        R{finalPrice.toLocaleString()}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      R{product.price.toLocaleString()}
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
            <Grid container spacing={4}>
              {/* Reviews Summary */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
                    <Typography variant="h3" fontWeight="bold">{(product.rating || 0).toFixed(1)}</Typography>
                    <Rating 
                      value={product.rating || 0} 
                      precision={0.5} 
                      readOnly 
                      size="large"
                      sx={{ mt: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Based on {product.reviewCount || reviews.length} reviews
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Rating Breakdown */}
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Rating Breakdown</Typography>
                    {[5, 4, 3, 2, 1].map((star) => {
                      // Calculate how many reviews have this star rating
                      const count = reviews.filter(review => {
                        // Convert to number to ensure proper comparison
                        const reviewRating = Number(review.rating);
                        const roundedRating = Math.round(reviewRating);
                        return roundedRating === star;
                      }).length;
                      
                      // For automatic rating breakdown when reviews array is empty but product has rating
                      let percentage = 0;
                      if (reviews.length > 0) {
                        percentage = (count / reviews.length) * 100;
                      } else if (product.reviewCount && product.reviewCount > 0) {
                        // If product has rating but reviews array is empty
                        const productRating = Math.round(product.rating || 0);
                        if (productRating === star) {
                          percentage = 100; // This is the only rating
                        }
                      }

                      return (
                        <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ minWidth: 25 }}>
                            {star}
                          </Typography>
                          <Rating value={star} max={1} readOnly size="small" sx={{ mx: 1 }} />
                          <Box
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              bgcolor: 'background.paper',
                              borderRadius: 1,
                              position: 'relative',
                              mr: 1,
                            }}
                          >
                            <Box
                              sx={{
                                height: '100%',
                                width: `${percentage}%`,
                                bgcolor: star > 3 ? 'success.main' : star > 1 ? 'warning.main' : 'error.main',
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {percentage > 0 ? `${percentage.toFixed(0)}%` : '0%'}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={handleReviewDialogOpen}
                  >
                    Write a Review
                  </Button>
                </Paper>
              </Grid>
              
              {/* Reviews List */}
              {reviewsLoading ? (
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                </Grid>
              ) : reviews.length > 0 ? (
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Recent Reviews</Typography>
                    <Button 
                      size="small"
                      onClick={() => product && fetchProductReviews(product.id)}
                      startIcon={<RefreshIcon />}
                    >
                      Refresh
                    </Button>
                  </Box>
                  <List sx={{ width: '100%' }}>
                    {reviews.map((review) => (
                      <ListItem key={review.id || Math.random().toString()} alignItems="flex-start" disableGutters>
                        <Paper sx={{ width: '100%', p: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: '#FF6B00', mr: 2 }}>
                                {(review.userName && review.userName.charAt(0)) || 'A'}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle1">
                                  {review.userName || 'Anonymous'}
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
                                  <Rating value={review.rating || 0} size="small" readOnly />
                                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                    {formatDate(review.date instanceof Date ? review.date : new Date(review.date))}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            
                            {/* Show edit/delete buttons only for the user's own reviews */}
                            {user && review.userId === user.uid && (
                              <Box>
                                <IconButton 
                                  size="small" 
                                  onClick={() => review.id && handleEditReview(review)}
                                  sx={{ mr: 1 }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton 
                                  size="small" 
                                  onClick={() => review.id && handleDeleteReview(review.id)}
                                  color="error"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            )}
                          </Box>
                          <Typography variant="body2">{review.comment}</Typography>
                        </Paper>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ) : (
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Reviews</Typography>
                    <Button 
                      size="small"
                      variant="contained"
                      onClick={() => product && fetchProductReviews(product.id)}
                      startIcon={<RefreshIcon />}
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                        },
                      }}
                    >
                      Load Reviews
                    </Button>
                  </Box>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {(product.reviewCount && product.reviewCount > 0) ? 
                      "Reviews exist but couldn't be loaded. Please try the button above." : 
                      "No reviews yet. Be the first to review this product!"}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
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
        <DialogTitle>{editingReview ? 'Edit Your Review' : 'Write a Review'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              How would you rate this product?
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating
                name="product-rating"
                value={newReview.rating}
                precision={1}
                size="large"
                onChange={(event, newValue) => {
                  setNewReview({
                    ...newReview,
                    rating: newValue || 0
                  });
                }}
                sx={{ 
                  fontSize: '2.2rem',
                  '& .MuiRating-iconEmpty': {
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                  },
                  '& .MuiRating-iconHover': {
                    color: '#FFD700',
                    transform: 'scale(1.2)',
                    transition: 'transform 0.2s ease-in-out, color 0.2s'
                  },
                  '& .MuiRating-iconFilled': {
                    color: '#FFD700'
                  }
                }}
              />
              <Typography variant="body1" sx={{ ml: 2 }}>
                {newReview.rating === 0 ? 'Select Rating' :
                 newReview.rating === 1 ? 'Poor' : 
                 newReview.rating === 2 ? 'Fair' : 
                 newReview.rating === 3 ? 'Good' : 
                 newReview.rating === 4 ? 'Very Good' : 'Excellent'}
              </Typography>
            </Box>
            
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
            disabled={newReview.rating === 0 || newReview.comment.trim().length === 0}
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            {editingReview ? 'Update Review' : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetail; 