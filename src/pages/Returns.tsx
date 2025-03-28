import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, useTheme, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Returns = () => {
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
              Returns & Repairs
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
              Our policy on returning items for repair and occasional replacements
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Return Policy Overview */}
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
                Return Policy Overview
              </Typography>

              <Typography variant="body1" paragraph>
                At Smart-Trade, we provide technical support for products that aren't functioning correctly. While we don't offer traditional money-back returns, we do accept items back for repair services and may offer replacements in certain circumstances.
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
                  <ErrorOutlineIcon sx={{ mr: 1 }} /> Important Notice
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'error.dark' }}>
                  All shipping costs associated with returning items for repair are the responsibility of the customer. This applies to both sending items to us and return shipping after repairs.
                </Typography>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 3, 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    }}>
                      <AssignmentReturnIcon sx={{ fontSize: 48, color: '#FF6B00', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Returns for Repair</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Return defective items within 14 days of delivery for diagnostic assessment and repair.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 3, 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'rgba(255, 107, 0, 0.05)',
                    }}>
                      <SwapHorizIcon sx={{ fontSize: 48, color: '#FF6B00', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Possible Replacements</Typography>
                      <Typography variant="body2" color="text.secondary">
                        In cases where repair isn't possible, we may offer a replacement at our discretion.
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 3, 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    }}>
                      <ScheduleIcon sx={{ fontSize: 48, color: '#FF6B00', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Repair Time</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Repairs are typically completed within 5-14 business days, depending on complexity and parts availability.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Return Process */}
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
                Return Process
              </Typography>

              <ol style={{ paddingLeft: '1.5rem' }}>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Contact Us</strong>: Initiate a return for repair by contacting our technical support team at <strong>083 334 1547</strong> or email us at <strong>office@smart-trade.biz</strong>. Please have your order number ready.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Get Return Authorization</strong>: Our team will provide you with a return authorization number and instructions for returning your item.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Package Your Return</strong>: Securely package the item in its original packaging if possible. Include all accessories, manuals, and any free gifts that came with your purchase.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Ship Your Return</strong>: Send your return to the address provided by our customer service team at your own expense. We recommend using a tracked shipping method.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Repair Assessment</strong>: Once we receive your item, our technicians will diagnose the issue and contact you with the repair options and any associated costs.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Repair or Replace</strong>: Upon your approval, we will proceed with the repair. In cases where repair isn't feasible, we may suggest replacement options.
                  </Typography>
                </li>
              </ol>

              <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <ErrorOutlineIcon sx={{ mr: 1, color: '#FF6B00' }} /> Important Note:
                </Typography>
                <Typography variant="body2">
                  For returns of electronic items, please ensure the product has not been registered or activated with the manufacturer. Software products cannot be returned once the seal has been broken or the product key has been revealed.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Eligible vs. Ineligible Items */}
          <Grid item xs={12}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                borderRadius: 2 
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Eligible & Ineligible Items
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleOutlineIcon sx={{ mr: 1, color: 'success.main' }} /> Eligible for Return
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Unopened items in original packaging" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Defective items (within warranty period)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Hardware that doesn't meet your needs" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Incorrect items shipped to you" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="success" />
                        </ListItemIcon>
                        <ListItemText primary="Items with manufacturing defects" />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                      <CancelOutlinedIcon sx={{ mr: 1, color: 'error.main' }} /> Not Eligible for Return
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CancelOutlinedIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Software with broken seals or revealed product keys" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CancelOutlinedIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Items damaged due to misuse" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CancelOutlinedIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Consumable products that have been used" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CancelOutlinedIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Items returned after 14 days (without prior approval)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CancelOutlinedIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Custom-built systems or custom-ordered products" />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'medium' }}>
                Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about our return policy or need assistance with a return, please contact our customer service team:
              </Typography>
              <Typography variant="body1">
                Phone: <strong>083 334 1547</strong><br />
                Email: <strong>office@smart-trade.biz</strong><br />
                Address: <strong>35 Ellenberger Street, Wilgehof, Bloemfontein, 9301</strong>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Returns; 