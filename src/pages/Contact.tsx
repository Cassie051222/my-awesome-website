import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Message sent successfully! We will get back to you soon.',
      severity: 'success',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: '#FF6B00' }} />,
      title: 'Email',
      content: 'office@smart-trade.biz',
      link: 'mailto:office@smart-trade.biz',
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: '#FF6B00' }} />,
      title: 'Phone',
      content: '083 334 1547',
      link: 'tel:+27833341547',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40, color: '#FF6B00' }} />,
      title: 'Address',
      content: '35 Ellenberger Street, Wilgehof, Bloemfontein, Freestate, 9301',
      link: 'https://maps.google.com/?q=35+Ellenberger+Street,+Wilgehof,+Bloemfontein,+9301,+South+Africa',
    },
  ];

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
            background: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80)',
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
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.primary', maxWidth: '800px', mx: 'auto' }}
            >
              Get in touch with us for any questions or inquiries
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Card 
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0 12px 48px rgba(255, 107, 0, 0.2)',
            },
          }}
        >
          <Grid container>
            {/* Contact Information - Left sidebar */}
            <Grid 
              item 
              xs={12} 
              md={4} 
              sx={{ 
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 107, 0, 0.05)',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: theme.palette.text.primary,
              }}
            >
              <Box sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#FF6B00' }}>
                  Contact Information
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                  Reach out to us with any questions or inquiries. We're here to help!
                </Typography>
              </Box>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 4,
                    '&:hover a': {
                      color: '#FF6B00',
                    },
                  }}>
                    <Box sx={{ 
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 107, 0, 0.1)',
                    }}>
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                        {info.title}
                      </Typography>
                      <Typography
                        component="a"
                        href={info.link}
                        sx={{
                          color: 'text.secondary',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                      >
                        {info.content}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Grid>

            {/* Contact Form - Right side */}
            <Grid 
              item 
              xs={12} 
              md={8}
              sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.3)' : '#ffffff',
                color: theme.palette.text.primary,
              }}
            >
              <Box sx={{ p: 4 }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Send us a message
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#FF6B00',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'text.secondary',
                              '&.Mui-focused': {
                                color: '#FF6B00',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#FF6B00',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'text.secondary',
                              '&.Mui-focused': {
                                color: '#FF6B00',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#FF6B00',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'text.secondary',
                              '&.Mui-focused': {
                                color: '#FF6B00',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.3)',
                              },
                              '&:hover fieldset': {
                                borderColor: 'rgba(255, 107, 0, 0.5)',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#FF6B00',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: 'text.secondary',
                              '&.Mui-focused': {
                                color: '#FF6B00',
                              },
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{
                            px: 4,
                            py: 1.5,
                            background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 