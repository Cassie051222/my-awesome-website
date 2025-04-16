import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Divider,
  useTheme,
  Alert,
  Dialog,
} from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Add dialogStyle constant for future Dialog components
const dialogStyle = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    paddingTop: 5
  }
};

const Cart = () => {
  const theme = useTheme();
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate shipping and tax
  const shipping = total > 1500 ? 0 : 150; // Free shipping for orders over R1500, otherwise R150
  const tax = total * 0.15; // 15% VAT for South Africa

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  // Add "Proceed to Checkout" button functionality
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

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
          py: 8,
          mb: 8,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
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
              variant="h1"
              align="center"
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : '#121212',
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Cart
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.primary', maxWidth: '800px', mx: 'auto' }}
            >
              Review your items and proceed to checkout
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {!user ? (
          <Card sx={{ mb: 4, p: 3 }}>
            <CardContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please log in to view your cart
              </Alert>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/"
                sx={{
                  background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                  },
                }}
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        ) : items.length === 0 ? (
          <Card sx={{ mb: 4, p: 3 }}>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <ShoppingCartIcon sx={{ fontSize: 60, color: '#FF6B00', mb: 2, opacity: 0.7 }} />
              <Typography variant="h5" gutterBottom>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Looks like you haven't added any products to your cart yet.
              </Typography>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/hardware"
                sx={{
                  background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                  },
                }}
              >
                Browse Hardware
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Cart Items ({items.length})
                  </Typography>
                  
                  {items.map((item) => (
                    <Grid item xs={12} key={item.id}>
                      <Card>
                        <CardContent>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={3}>
                              <Box
                                sx={{
                                  width: '100%',
                                  height: 120,
                                  overflow: 'hidden',
                                  borderRadius: 1,
                                }}
                              >
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                  <Typography variant="h6">{item.name}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    R{item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </Typography>
                                </Box>
                                <IconButton
                                  onClick={() => removeFromCart(item.id)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                <Button
                                  size="small"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  sx={{ minWidth: 30, p: 0 }}
                                >
                                  -
                                </Button>
                                <TextField
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (!isNaN(val)) {
                                      handleQuantityChange(item.id, val);
                                    }
                                  }}
                                  size="small"
                                  sx={{ width: 60, mx: 1 }}
                                  InputProps={{ inputProps: { min: 1, style: { textAlign: 'center' } } }}
                                />
                                <Button
                                  size="small"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  sx={{ minWidth: 30, p: 0 }}
                                >
                                  +
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Cart Summary */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    Order Summary
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <span>Subtotal:</span>
                    <span>R{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <span>Shipping:</span>
                    <span>R{shipping.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <span>Tax (15% VAT):</span>
                    <span>R{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>R{(total + shipping + tax).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleProceedToCheckout}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart; 