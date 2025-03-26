import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// Placeholder for local image imports (user will provide these)
// Import them like this when the images are available
// import restaurant from '../assets/images/business/restaurant.jpg';
// import butchery from '../assets/images/business/butchery.jpg';
// etc.

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Using the images from the public directory instead of Unsplash
  // If images are not yet uploaded, it will use a placeholder
  const imagePlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjYWFhYWFhIj5JbWFnZSBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';

  const getImagePath = (directory: string, filename: string): string => {
    // This function tries to use the local image if available, otherwise falls back to the placeholder
    return `/images/${directory}/${filename}`;
  };

  const businessTypes = [
    {
      title: 'Restaurants and Pub & Grills',
      image: getImagePath('business', 'restaurant.jpg'),
    },
    {
      title: 'Butcheries',
      image: getImagePath('business', 'butchery.jpg'),
    },
    {
      title: 'Cafe\' & supermarkets',
      image: getImagePath('business', 'cafe.jpg'),
    },
    {
      title: 'Liquor Stores',
      image: getImagePath('business', 'liquor.jpg'),
    },
    {
      title: 'Hardware Stores',
      image: getImagePath('business', 'hardware.jpg'),
    },
    {
      title: 'Gas & Appliance Stores',
      image: getImagePath('business', 'gas.jpg'),
    },
    {
      title: 'Farm Stalls & Coffee Shops',
      image: getImagePath('business', 'farm.jpg'),
    },
    {
      title: 'Automotive Workshops',
      image: getImagePath('business', 'automotive.jpg'),
    },
  ];

  const services = [
    {
      title: 'Smart-Trade Solutions',
      description: 'Innovative software solutions tailored to your business needs',
      image: getImagePath('services', 'software.jpg'),
      path: '/software'
    },
    {
      title: 'Hardware Solutions',
      description: 'State-of-the-art hardware solutions for optimal performance',
      image: getImagePath('services', 'hardware.jpg'),
      path: '/products'
    },
    {
      title: 'Support',
      description: 'Dedicated support team ready to assist you',
      image: getImagePath('services', 'support.jpg'),
      path: '/contact'
    }
  ];

  const productCategories = [
    {
      title: 'Hardware',
      description: 'Explore our selection of high-performance hardware for all your tech needs.',
      image: getImagePath('services', 'hardware.jpg'),
      path: '/products'
    },
    {
      title: 'Smart-Trade',
      description: 'Discover premium software solutions to enhance your productivity.',
      image: getImagePath('services', 'software.jpg'),
      path: '/smart-trade'
    },
    {
      title: 'Accessories',
      description: 'Find the perfect accessories to complement your tech setup.',
      image: getImagePath('business', 'hardware.jpg'),
      path: '/products?category=accessories'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: 12,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
              SMART-TRADE MANAGEMENT SYSTEMS
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.primary', maxWidth: '800px', mx: 'auto' }}
            >
              Your Complete Business Management Solution
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Services
        </Typography>
        <Typography variant="body1" paragraph>
          In today's competitive markets and with the ever-increasing need for cost effective solutions, Smart-Trade Management Software is the tool you need for your business whatever the size of your company. Smart-Trade Management Software allows you to take effective control of your inventory, customers, suppliers, and manufacturing processes.
        </Typography>
        <Typography variant="body1" paragraph>
          It has a general ledger that includes all necessary functions for accounting purposes, such as cashbooks, journals, recording income and expenses, and can take your business up to "Trial Balance" level. Smart-Trade Management Software is suitable to be used in almost all retail, wholesale and manufacturing companies, or any entity supplying services.
        </Typography>
        <Typography variant="body1" paragraph>
          Smart-Trade Management Software is used daily by many businesses such as: restaurants, canteens, pubs, coffee shops, butcheries, supermarkets, hardware stores, liquor stores, wholesalers, automotive spares shops, batching plants, repair or manufacturing workshops and many more.
        </Typography>
      </Container>

      {/* Business Types Grid */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {businessTypes.map((business, index) => (
              <Grid item xs={12} sm={6} md={3} key={business.title}>
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
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={business.image}
                      alt={business.title}
                      sx={{ objectFit: 'cover' }}
                      onError={(event) => {
                        event.currentTarget.src = imagePlaceholder;
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h6" align="center">
                        {business.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            ABOUT SMART-TRADE MANAGEMENT SYSTEMS
          </Typography>
          <Typography variant="body1" paragraph>
            C.I. Systems opened it's doors in 1997, and has been providing great products and services ever since. What sets us apart from the rest is our ability to customize our offering to customers' needs, as well as our fantastic team of specialists.
          </Typography>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 'bold',
            mb: 4,
            background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={service.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 32px rgba(255, 107, 0, 0.2)',
                    },
                  }}
                  onClick={() => navigate(service.path)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                    sx={{ objectFit: 'cover' }}
                    onError={(event) => {
                      event.currentTarget.src = imagePlaceholder;
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 