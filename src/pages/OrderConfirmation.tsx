import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
              Order Confirmed!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.primary', maxWidth: '800px', mx: 'auto' }}
            >
              Thank you for your purchase. We'll send you an email with your order details shortly.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircleIcon
                sx={{
                  fontSize: 80,
                  color: '#4CAF50',
                  mb: 3,
                }}
              />
              <Typography variant="h4" gutterBottom>
                Your order has been placed successfully
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We've received your order and will process it right away. You'll receive a confirmation email with your order details and tracking information.
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" gutterBottom>
                What's Next?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                • Check your email for order confirmation and tracking details
                <br />
                • Follow your order status in your account dashboard
                <br />
                • Contact our support team if you have any questions
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/hardware')}
                  sx={{
                    mr: 2,
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                    },
                  }}
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/profile')}
                >
                  View Order History
                </Button>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OrderConfirmation; 