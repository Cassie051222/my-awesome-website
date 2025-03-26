import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  CardMedia,
  Backdrop,
  Fade,
  Modal,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';

const Software = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openInvoicing, setOpenInvoicing] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const invoicingSteps = [
    {
      title: 'General Store Mode',
      description: 'This layout is great for general stores, superstores etc.',
      image: '/images/invoicing_screen/Sub/General Store.png'
    },
    {
      title: 'Touch Screen Mode',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/invoicing_screen/Sub/Touch Screen ST.png'
    },
    {
      title: 'Supermarket Mode',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/invoicing_screen/Sub/Supermarket mode.png'
    },
    {
      title: 'Vehicle Bookings',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/invoicing_screen/Sub/Vehicle Bookings.png'
    },
    {
      title: 'Batching Plants',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/invoicing_screen/Sub/Batching Plant.png'
    }
  ];

  const productSteps = [
    {
      title: 'Creating Products',
      description: 'This layout is great for general stores, superstores etc.',
      image: '/images/products/Sub/CreateProduct.jpg'
    },
    {
      title: 'Editing Products',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/products/Sub/EditingProducts.jpg'
    },
    {
      title: 'Setting up of Manufacturing',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/products/Sub/Manufacturing.png'
    },
    {
      title: 'Setting up of Promotions',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/products/Sub/Promotions.png'
    },
    {
      title: 'Printing Price Labels',
      description: 'This layout works well in Restaurants or when you have a ordering station with a touch screen that doesn\'t have a keyboard.',
      image: '/images/products/Sub/LabelPrinting.png'
    }
  ];

  const softwareSolutions = [
    {
      title: 'Invoicing Screen',
      description: 'Here you can see all the invoicing screens',
      features: ['Create and manage invoices', 'Track payments', 'Generate reports'],
      image: '/images/invoicing_screen/Invoice.jpg',
      hasSubImages: true
    },
    {
      title: 'Products',
      description: 'Here you will see all the screen involved in products',
      features: ['Product management', 'Category organization', 'Price tracking'],
      image: '/images/products/Products.jpg',
      hasSubImages: true
    },
    {
      title: 'Stock Control',
      description: 'Get a accurate stock level of your store',
      features: ['Real-time inventory tracking', 'Stock alerts', 'Stock movement history'],
      image: '/images/stock_control/StockControl.jpg',
      hasSubImages: false
    },
    {
      title: 'General Ledger',
      description: 'Built in General Ledger System',
      features: ['Financial tracking', 'Transaction history', 'Balance sheets'],
      image: '/images/general_ledger/GeneralLedger.jpg',
      hasSubImages: false
    },
    {
      title: 'Sales Orders',
      description: 'You can create Sales Orders',
      features: ['Order management', 'Customer tracking', 'Order history'],
      image: '/images/sales_orders/SalesOrders.jpg',
      hasSubImages: false
    },
    {
      title: 'Jobcards',
      description: 'You can create Jobcards and Invoice clients from the the Jobcard',
      features: ['Job tracking', 'Client billing', 'Service history'],
      image: '/images/jobcards/Jobcards.jpg',
      hasSubImages: false
    },
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setOpenInvoicing(false);
    setOpenProducts(false);
    setActiveStep(0);
  };

  // Function to open the lightbox with a specific image
  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
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
            background: 'url(https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: theme.palette.mode === 'dark' ? 0.2 : 0.15,
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
              Smart-Trade Solutions
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}
            >
              Experience our powerful business management solutions with live demos
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Live Demo Section */}
      <Container maxWidth="xl" sx={{ mb: 8, px: { xs: 2, sm: 4, md: 6, lg: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            Try Our POS System
          </Typography>
          <Box
            sx={{
              width: '100%',
              paddingTop: '56.25%', // 16:9 aspect ratio (9/16 = 0.5625)
              backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#ffffff',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 107, 0, 0.3)'
                : '1px solid rgba(255, 107, 0, 0.2)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.secondary',
                backgroundColor: theme.palette.mode === 'dark' ? '#1A1A1A' : '#f8f8f8',
                padding: 4,
              }}
            >
              <Typography variant="h5" sx={{ color: theme.palette.mode === 'dark' ? 'white' : '#121212', mb: 3, textAlign: 'center' }}>
                Experience Our Software Firsthand
              </Typography>
              <Typography sx={{ fontSize: '1.1rem', mb: 4, textAlign: 'center', maxWidth: '700px' }}>
                We provide remote access to our point of sale system so you can explore all features in a real-world environment. Choose one of the following options to get started:
              </Typography>
              
              <Grid container spacing={4} sx={{ maxWidth: '900px' }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 3, 
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255,107,0,0.1)' 
                      : 'rgba(255,107,0,0.05)',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255,107,0,0.2)' 
                        : 'rgba(255,107,0,0.1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => window.open('https://anydesk.com/en/downloads', '_blank')}
                  >
                    <Box sx={{ fontSize: '3rem', color: '#FF6B00', mb: 2 }}>🖥️</Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Remote Access</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      Connect to our demo system using AnyDesk for a guided tour with one of our experts.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                        },
                        mt: 'auto'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/contact');
                      }}
                    >
                      Schedule Session
                    </Button>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 3, 
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255,107,0,0.1)' 
                      : 'rgba(255,107,0,0.05)',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255,107,0,0.2)' 
                        : 'rgba(255,107,0,0.1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    },
                    cursor: 'pointer'
                  }}
                  onClick={() => window.open('https://teamviewer.com', '_blank')}
                  >
                    <Box sx={{ fontSize: '3rem', color: '#FF6B00', mb: 2 }}>💻</Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Test Environment</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      Access our virtual test environment with TeamViewer to explore the software on your own.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                        },
                        mt: 'auto'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/contact');
                      }}
                    >
                      Get Access
                    </Button>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    p: 3, 
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255,107,0,0.1)' 
                      : 'rgba(255,107,0,0.05)',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255,107,0,0.2)' 
                        : 'rgba(255,107,0,0.1)',
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <Box sx={{ fontSize: '3rem', color: '#FF6B00', mb: 2 }}>🚀</Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>On-site Installation</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      We'll set up a temporary installation at your location to test with your actual business data.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                        },
                        mt: 'auto'
                      }}
                      onClick={() => navigate('/contact')}
                    >
                      Request Install
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                },
                py: 1.5,
                px: 6,
                fontSize: '1.1rem'
              }}
              onClick={() => navigate('/contact')}
            >
              Schedule a Demo
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Demos
        </Typography>
        <Grid container spacing={6}>
          {softwareSolutions.map((solution, index) => (
            <Grid item xs={12} sm={12} md={6} key={solution.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 32px rgba(255, 107, 0, 0.2)',
                      border: '1px solid rgba(255, 107, 0, 0.3)',
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'relative',
                      '&:hover .image-overlay': {
                        opacity: 1,
                      },
                      cursor: 'pointer'
                    }}
                    onClick={() => openLightbox(solution.image)}
                >
                  <CardMedia
                    component="img"
                      height="280px"
                    image={solution.image}
                    alt={solution.title}
                    sx={{
                        objectFit: 'contain',
                        backgroundColor: theme.palette.mode === 'dark' ? '#f5f5f5' : '#f0f0f0',
                        padding: '10px'
                      }}
                    />
                    <Box 
                      className="image-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <ZoomOutMapIcon /> Click to enlarge
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                      {solution.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                      {solution.description}
                    </Typography>
                    <Box sx={{ mb: 2, flexGrow: 1 }}>
                      {solution.features.map((feature) => (
                        <Typography
                          key={feature}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'text.secondary',
                          }}
                        >
                          • {feature}
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ marginTop: 'auto' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                        onClick={() => {
                          if (solution.hasSubImages) {
                            if (solution.title === 'Invoicing Screen') {
                              setOpenInvoicing(true);
                            } else if (solution.title === 'Products') {
                              setOpenProducts(true);
                            }
                          } else {
                            navigate('/contact');
                          }
                        }}
                      sx={{
                        background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                        },
                      }}
                    >
                        {solution.hasSubImages ? 'See More' : 'Learn More'}
                    </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Invoicing Modal */}
      <Dialog
        open={openInvoicing}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#ffffff',
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Invoicing Screen Layouts</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 4 }}>
            Here you can see the different types of invoicing layouts. Select the one that matches your preferences. See layout info to see which businesses are best suited for that layout.
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {invoicingSteps.map((step, index) => (
              <Step key={step.title}>
                <StepLabel>{`0${index + 1}`}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {`0${activeStep + 1}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {invoicingSteps[activeStep].title}
              </Typography>
              <Typography color="text.secondary">
                {invoicingSteps[activeStep].description}
              </Typography>
            </Box>
            <Box sx={{ flex: 2, position: 'relative' }}>
              <Box 
                sx={{ 
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '&:hover .image-overlay': {
                    opacity: 1,
                  },
                  cursor: 'pointer' 
                }}
                onClick={() => openLightbox(invoicingSteps[activeStep].image)}
              >
                <img
                  src={invoicingSteps[activeStep].image}
                  alt={invoicingSteps[activeStep].title}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'block'
                  }}
                />
                <Box 
                  className="image-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '8px',
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <ZoomOutMapIcon /> Click to enlarge
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === invoicingSteps.length - 1}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Products Modal */}
      <Dialog
        open={openProducts}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.mode === 'dark' ? '#1E1E1E' : '#ffffff',
            backgroundImage: 'none',
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Product Management</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 4 }}>
            Here you can see the different types of product management features. Select the one that matches your needs.
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {productSteps.map((step, index) => (
              <Step key={step.title}>
                <StepLabel>{`0${index + 1}`}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                {`0${activeStep + 1}`}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {productSteps[activeStep].title}
              </Typography>
              <Typography color="text.secondary">
                {productSteps[activeStep].description}
              </Typography>
            </Box>
            <Box sx={{ flex: 2, position: 'relative' }}>
              <Box 
                sx={{ 
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '&:hover .image-overlay': {
                    opacity: 1,
                  },
                  cursor: 'pointer' 
                }}
                onClick={() => openLightbox(productSteps[activeStep].image)}
              >
                <img
                  src={productSteps[activeStep].image}
                  alt={productSteps[activeStep].title}
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'block'
                  }}
                />
                <Box 
                  className="image-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '8px',
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <ZoomOutMapIcon /> Click to enlarge
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === productSteps.length - 1}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lightbox Modal */}
      <Modal
        open={lightboxOpen}
        onClose={closeLightbox}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={lightboxOpen}>
          <Box
            sx={{
              position: 'relative',
              width: '90%',
              maxWidth: '1200px',
              maxHeight: '90vh',
              overflow: 'hidden',
              outline: 'none',
            }}
          >
            <IconButton
              onClick={closeLightbox}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                zIndex: 1
              }}
            >
              <CloseIcon />
            </IconButton>
            <img
              src={lightboxImage}
              alt="Enlarged view"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(0, 0, 0, 0.9)'
                  : 'rgba(240, 240, 240, 0.95)',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 0 30px rgba(0, 0, 0, 0.8)'
                  : '0 0 30px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Software; 