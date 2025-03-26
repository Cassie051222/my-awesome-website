import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

const Checkout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { items, total } = useCart();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState('');

  // Calculate shipping and tax
  const shipping = total > 1500 ? 0 : 150; // Free shipping for orders over R1500, otherwise R150
  const tax = total * 0.15; // 15% VAT for South Africa
  const orderTotal = total + shipping + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({
      ...shippingData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Handle order submission
      console.log('Order submitted:', { shippingData, paymentData, items, total });
      navigate('/order-confirmation');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={shippingData.firstName}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={shippingData.lastName}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={shippingData.email}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={shippingData.address}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={shippingData.city}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="State"
                name="state"
                value={shippingData.state}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={shippingData.zipCode}
                onChange={handleShippingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Country"
                name="country"
                value={shippingData.country}
                onChange={handleShippingChange}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Card Number"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handlePaymentChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Cardholder Name"
                name="cardName"
                value={paymentData.cardName}
                onChange={handlePaymentChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handlePaymentChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                value={paymentData.cvv}
                onChange={handlePaymentChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Typography variant="body1" paragraph>
              {shippingData.firstName} {shippingData.lastName}
              <br />
              {shippingData.address}
              <br />
              {shippingData.city}, {shippingData.state} {shippingData.zipCode}
              <br />
              {shippingData.country}
              <br />
              {shippingData.email}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {items.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography>R{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
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
            <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span>R{orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </Typography>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
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
              Checkout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.primary', maxWidth: '800px', mx: 'auto' }}
            >
              Complete your purchase in a few simple steps
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {!user ? (
          <Card sx={{ mb: 4, p: 3 }}>
            <CardContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please log in to proceed with checkout
              </Alert>
              <Button 
                variant="contained" 
                onClick={() => navigate('/')}
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
            <CardContent>
              <Alert severity="info" sx={{ mb: 2 }}>
                Your cart is empty. Add some items before proceeding to checkout.
              </Alert>
              <Button 
                variant="contained" 
                onClick={() => navigate('/hardware')}
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
          <Card>
            <CardContent>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {getStepContent(activeStep)}
              </motion.div>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                    },
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default Checkout; 