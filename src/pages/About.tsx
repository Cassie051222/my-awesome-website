import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FactoryIcon from '@mui/icons-material/Factory';
import SettingsIcon from '@mui/icons-material/Settings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const About = () => {
  const theme = useTheme();
  const [count, setCount] = useState(0);
  const [viewportEntered, setViewportEntered] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Counter animation effect
  useEffect(() => {
    if (!viewportEntered) return;
    
    const timer = setTimeout(() => {
      if (count < 25) {
        setCount(prevCount => prevCount + 1);
      }
    }, 80); // Speed of counting animation
    
    return () => clearTimeout(timer);
  }, [count, viewportEntered]);

  const solutions = [
    {
      title: 'Inventory & Supply Chain',
      icon: <InventoryIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      description: 'Gain real‐time insights into your stock levels, manage suppliers and products easily, and streamline replenishment processes. Stay ahead with detailed analytics and Simple interface.'
    },
    {
      title: 'Customer & Sales',
      icon: <PeopleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      description: 'Enhance customer relationships with detailed tracking and personalized service, while managing quotations, sales orders, and promotions seamlessly.'
    },
    {
      title: 'Accounting & Finance',
      icon: <AccountBalanceIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      description: 'With a fully featured general ledger, cashbooks, and journals, our system takes your business up to the "Trial Balance" level, ensuring robust financial oversight.'
    },
    {
      title: 'Manufacturing',
      icon: <FactoryIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      description: 'Tailored for companies of all sizes, our solution simplifies the management of production processes, ensuring quality control and efficiency at every step.'
    },
  ];

  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section with Particle Effect Background */}
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
            background: 'url(https://images.unsplash.com/photo-1510906594845-bc082582c8cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2044&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: theme.palette.mode === 'dark' ? 0.15 : 0.07,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
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
              About Us
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ 
                color: 'text.primary',
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
                textShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(255,107,0,0.3)' : 'none',
              }}
            >
              At Smart-Trade Management Systems, we believe that efficient business management is the key to thriving in today's competitive market. Founded in 1997 by C.I. Systems, our company has built a legacy of delivering innovative, customizable software solutions designed to streamline operations across retail, wholesale, manufacturing, and service industries.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Our Story Section with Animated Timeline */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 4,
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
            }}
          >
            Our Story & Expertise
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card 
            sx={{ 
              mb: 5,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(30, 30, 30, 0.8)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 107, 0, 0.2)'
                : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 8px 32px rgba(255, 107, 0, 0.1)'
                : '0 8px 32px rgba(0, 0, 0, 0.05)',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: 'linear-gradient(90deg, #FF6B00, #FF8533)',
              }
            }}
          >
            <CardContent sx={{ px: 4, py: 5 }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box 
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    onViewportEnter={() => setViewportEntered(true)}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8 }}
                    sx={{ 
                      textAlign: 'center',
                      p: 2, 
                      backgroundColor: 'rgba(255, 107, 0, 0.1)',
                      borderRadius: 4,
                      border: '1px solid rgba(255, 107, 0, 0.2)'
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={count === 25 ? {
                        scale: [1, 1.2, 1],
                        textShadow: ['0px 0px 0px rgba(255,107,0,0)', '0px 0px 20px rgba(255,107,0,0.5)', '0px 0px 0px rgba(255,107,0,0)'],
                        transition: { duration: 0.8, repeat: 0 }
                      } : {}}
                    >
                      <Typography variant="h1" sx={{ color: theme.palette.primary.main, opacity: 0.9 }}>
                        {count}+
                      </Typography>
                    </motion.div>
                    <Typography variant="h6">Years of Excellence</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    Since opening our doors over two decades ago, we have been dedicated to understanding the unique challenges faced by businesses—from restaurants and coffee shops to supermarkets, hardware stores, and automotive workshops.
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                    Our longevity is a testament to our commitment to excellence and our ability to adapt our offerings to meet evolving customer needs. What sets us apart is not just our cutting‐edge technology, but also our team of industry specialists whose expertise drives our solutions forward.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Core Solutions Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 600,
                mb: 6,
                background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Our Solutions
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {solutions.map((solution, index) => (
              <Grid item xs={12} md={6} key={solution.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    p: 3, 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(255, 107, 0, 0.15)',
                    },
                  }}>
                    <Box sx={{ display: 'flex', mb: 2 }}>
                      {solution.icon}
                      <Typography variant="h5" sx={{ ml: 2, fontWeight: 600 }}>
                        {solution.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {solution.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Key Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 600,
              mb: 2,
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Key Features
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ 
              color: 'text.primary', 
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Discover what makes our software solution stand out from the competition
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card sx={{ 
                height: '100%',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SettingsIcon sx={{ fontSize: 36, color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Tailor Your Solution
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Our platform adapts to your specific needs, providing exactly what your business requires to thrive.
                </Typography>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                }}
              >
                Our Commitment to Customization
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                At Smart-Trade, we understand that no two businesses are alike. That's why our software is fully customizable, allowing you to tailor our tools to your specific operational needs. Whether you're a small local business or a large enterprise, our scalable solutions grow with you, ensuring long-term success.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Vision & Mission Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
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
            opacity: 0.05,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <RocketLaunchIcon
                    sx={{
                      fontSize: 200,
                      color: theme.palette.primary.main,
                      display: 'block',
                      mx: 'auto',
                    }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [0, -100],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    left: '47%',
                    width: 20,
                    height: 150,
                    background: 'linear-gradient(to top, transparent, #FF6B00)',
                    borderRadius: 10,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }}
                >
                  Our Vision & Mission
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  We are on a mission to empower businesses with cost-effective, state-of-the-art management tools that drive operational excellence. Our vision is to be the trusted partner for companies seeking to optimize their processes, reduce overheads, and ultimately, achieve sustainable growth in an ever-changing marketplace.
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                  Join the many businesses that rely on Smart-Trade Management Systems to transform their operations and stay ahead of the competition. Discover a partner committed to your success—today and into the future.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        sx={{
          py: 10,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(245, 245, 245, 0.95) 0%, rgba(250, 250, 250, 0.95) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
                background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ready to Transform Your Business?
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 6, mx: 'auto', maxWidth: '800px' }}>
              Experience the Smart-Trade difference with a customized solution designed to meet your unique business needs.
            </Typography>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 