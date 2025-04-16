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
  Divider,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Alert,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Dialog,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import { createOrder, Order } from '../services/OrderService';

const steps = ['Shipping Information', 'Payment Details', 'Review Order'];

// Add dialogStyle constant for future Dialog components
const dialogStyle = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    paddingTop: 5
  }
};

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
    method: 'credit',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    reference: '', // For EFT reference
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

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentData({
      ...paymentData,
      method: e.target.value,
    });
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        if (!user) {
          setError('Please log in to complete your purchase');
          return;
        }

        // Create order in Firebase
        const orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
          userId: user.uid,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: orderTotal,
          status: 'Processing' as const,
          paymentMethod: paymentData.method,
          paymentStatus: 'Pending' as const,
          shippingAddress: shippingData,
        };

        await createOrder(orderData);
        navigate('/order-confirmation');
      } catch (error) {
        console.error('Error creating order:', error);
        setError('Failed to create order. Please try again.');
      }
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
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Payment Method
            </Typography>
            <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
              <RadioGroup
                name="method"
                value={paymentData.method}
                onChange={handlePaymentMethodChange}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={paymentData.method === 'credit' ? 4 : 1}
                      sx={{ 
                        p: 2, 
                        border: paymentData.method === 'credit' ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                        }
                      }}
                      onClick={() => setPaymentData({...paymentData, method: 'credit'})}
                    >
                      <FormControlLabel 
                        value="credit" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <CreditCardIcon fontSize="large" color={paymentData.method === 'credit' ? 'primary' : 'action'} />
                            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                              Credit/Debit Card
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                              Pay securely with your bank card
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={paymentData.method === 'ozow' ? 4 : 1}
                      sx={{ 
                        p: 2, 
                        border: paymentData.method === 'ozow' ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                        }
                      }}
                      onClick={() => setPaymentData({...paymentData, method: 'ozow'})}
                    >
                      <FormControlLabel 
                        value="ozow" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <PaymentIcon fontSize="large" color={paymentData.method === 'ozow' ? 'primary' : 'action'} />
                            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                              Ozow
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                              Pay instantly with Ozow
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper 
                      elevation={paymentData.method === 'eft' ? 4 : 1}
                      sx={{ 
                        p: 2, 
                        border: paymentData.method === 'eft' ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                        }
                      }}
                      onClick={() => setPaymentData({...paymentData, method: 'eft'})}
                    >
                      <FormControlLabel 
                        value="eft" 
                        control={<Radio />} 
                        label={
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <AccountBalanceIcon fontSize="large" color={paymentData.method === 'eft' ? 'primary' : 'action'} />
                            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                              EFT
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center">
                              Pay via bank transfer
                            </Typography>
                          </Box>
                        }
                        sx={{ width: '100%', m: 0 }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>

            <Divider sx={{ my: 3 }} />

            {paymentData.method === 'credit' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
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
            )}

            {paymentData.method === 'ozow' && (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" paragraph>
                  You will be redirected to Ozow to complete your payment after you place your order.
                </Typography>
                <Box 
                  component="img" 
                  src="https://ozow.com/wp-content/uploads/2022/04/svg-ozow-logo-blue.svg" 
                  alt="Ozow" 
                  sx={{ 
                    maxWidth: '120px', 
                    my: 2 
                  }} 
                />
                <Typography variant="body2" color="text.secondary">
                  Secure, instant EFT payments with Ozow
                </Typography>
              </Box>
            )}

            {paymentData.method === 'eft' && (
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Please use the following bank details to make your payment. Your order will be processed once payment is confirmed.
                </Alert>
                <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, mb: 3 }}>
                  <Typography variant="body2">Bank: FNB</Typography>
                  <Typography variant="body2">Account Name: Smart-Trade</Typography>
                  <Typography variant="body2">Account Number: 12345678910</Typography>
                  <Typography variant="body2">Branch Code: 250655</Typography>
                  <Typography variant="body2">Reference: ST-{Math.floor(Math.random() * 100000)}</Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Your Payment Reference"
                  name="reference"
                  value={paymentData.reference}
                  onChange={handlePaymentChange}
                  helperText="Enter the reference you used when making the payment"
                  sx={{ mt: 2 }}
                />
              </Box>
            )}
          </Box>
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
              Payment Method
            </Typography>
            <Typography variant="body1" paragraph>
              {paymentData.method === 'credit' && 'Credit/Debit Card'}
              {paymentData.method === 'ozow' && 'Ozow Instant EFT'}
              {paymentData.method === 'eft' && 'Electronic Funds Transfer (EFT)'}
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