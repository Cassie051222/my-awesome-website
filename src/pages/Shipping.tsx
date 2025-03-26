import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentIcon from '@mui/icons-material/Payment';
import InfoIcon from '@mui/icons-material/Info';

const Shipping = () => {
  const theme = useTheme();

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
              Shipping Information
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
              All shipping costs are covered by the customer
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Shipping Policy Overview */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Our Shipping Policy
              </Typography>

              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                At Smart-Trade, we're committed to delivering your technology products efficiently and securely. Please review our shipping policy below.
              </Typography>

              <Box sx={{ 
                p: 3, 
                bgcolor: 'error.light',  
                borderRadius: 2, 
                mb: 4, 
                border: '1px solid', 
                borderColor: 'error.main' 
              }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', color: 'error.dark' }}>
                  <InfoIcon sx={{ mr: 1 }} /> Important Shipping Notice
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'error.dark' }}>
                  All shipping costs are the responsibility of the customer. We do not offer free shipping on any orders, regardless of order value or destination.
                </Typography>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    height: '100%', 
                    border: '1px solid', 
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <LocalShippingIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>Shipping Methods</Typography>
                    <Typography variant="body2">
                      We use reliable courier services to ensure your items arrive safely and on time. Available shipping methods include:
                    </Typography>
                    <Box sx={{ mt: 2, width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Standard Delivery:</Typography>
                        <Typography variant="body2" fontWeight="bold">R80 - R150</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Express Delivery:</Typography>
                        <Typography variant="body2" fontWeight="bold">R150 - R250</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Same-Day Delivery:</Typography>
                        <Typography variant="body2" fontWeight="bold">R300 - R500</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    height: '100%', 
                    border: '1px solid', 
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <AccessTimeIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>Delivery Timeframes</Typography>
                    <Typography variant="body2">
                      Estimated delivery times after order processing:
                    </Typography>
                    <Box sx={{ mt: 2, width: '100%' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Major Cities:</Typography>
                        <Typography variant="body2" fontWeight="bold">1-3 business days</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Regional Areas:</Typography>
                        <Typography variant="body2" fontWeight="bold">3-5 business days</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Remote Locations:</Typography>
                        <Typography variant="body2" fontWeight="bold">5-7 business days</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                      Note: Delivery times are estimates and may vary due to factors beyond our control.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    bgcolor: 'background.paper', 
                    borderRadius: 2, 
                    height: '100%', 
                    border: '1px solid', 
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <PaymentIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>Shipping Costs</Typography>
                    <Typography variant="body2">
                      Shipping fees are calculated based on:
                    </Typography>
                    <Box sx={{ mt: 2, width: '100%' }}>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ textAlign: 'left', mb: 0.5 }}>• Delivery destination</Typography>
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ textAlign: 'left', mb: 0.5 }}>• Package weight and dimensions</Typography>
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ textAlign: 'left', mb: 0.5 }}>• Selected shipping method</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ textAlign: 'left', mb: 0.5 }}>• Delivery timeline requirements</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 2, color: 'error.main', fontWeight: 'bold' }}>
                      All shipping costs are non-refundable
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Order Tracking */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Order Tracking
              </Typography>

              <Typography variant="body1" paragraph>
                Once your order is shipped, you'll receive a confirmation email with tracking information. You can track your delivery using:
              </Typography>

              <Box sx={{ mb: 4 }}>
                <ul>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      The tracking link provided in your shipping confirmation email
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Your order history in your account dashboard
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Contacting our customer service team with your order number
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Paper>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Additional Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Collection Option
                  </Typography>
                  <Typography variant="body1" paragraph>
                    You may collect your order from our store in Bloemfontein to avoid shipping costs. Please select this option during checkout and wait for our confirmation email before collecting.
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    International Shipping
                  </Typography>
                  <Typography variant="body1" paragraph>
                    We currently only ship within South Africa. For international inquiries, please contact our customer service team.
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" gutterBottom>
                Contact Our Shipping Department
              </Typography>
              <Typography variant="body1">
                For any shipping-related questions, please contact us:
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Phone: <strong>083 334 1547</strong><br />
                Email: <strong>shipping@smart-trade.biz</strong>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Shipping; 