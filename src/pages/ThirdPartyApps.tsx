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
  Dialog,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Add dialogStyle constant for future Dialog components
const dialogStyle = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    paddingTop: 5
  }
};

const ThirdPartyApps = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const thirdPartyApps = [
    {
      title: 'SQL Server Express',
      description: 'Latest free edition of Microsoft SQL Server with enhanced features',
      image: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['Up to 10GB per database', 'Advanced security features', 'JSON support'],
      downloadLink: 'https://go.microsoft.com/fwlink/p/?linkid=2216019&clcid=0x409&culture=en-us&country=us',
    },
    {
      title: 'SQL Server Management Studio',
      description: 'Complete database management solution for SQL Server',
      image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['Enhanced Query Editor', 'Database Diagrams', 'Performance Dashboards'],
      downloadLink: 'https://aka.ms/ssmsfullsetup',
    },
    {
      title: 'TeamViewer',
      description: 'Next-generation remote access and support platform',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['Augmented Reality Support', 'End-to-End Encryption', 'Cross-Platform Remote Access'],
      downloadLink: 'https://download.teamviewer.com/download/TeamViewer_Setup_x64.exe',
    },
    {
      title: 'AnyDesk',
      description: 'Fast and secure remote desktop software for seamless remote access',
      image: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['Ultra-low latency', 'Banking-standard TLS 1.2 encryption', 'Remote printing support'],
      downloadLink: 'https://anydesk.com/en/downloads/thank-you?dv=win_exe',
    },
    {
      title: 'WinRAR',
      description: 'Powerful archive manager for compression, encryption, and backup',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      features: ['Robust file compression', 'Password protection with AES-256', 'Recovery record feature'],
      downloadLink: 'https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-711.exe',
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
            background: 'url(https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
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
              Essential Third Party Apps
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{ color: 'text.primary', maxWidth: '800px', mx: 'auto' }}
            >
              Complete your toolkit with these powerful software solutions
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Solutions Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {thirdPartyApps.map((app, index) => (
            <Grid item xs={12} sm={6} lg={4} key={app.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <CardMedia
                    component="img"
                    height="200"
                    image={app.image}
                    alt={app.title}
                    sx={{
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                      {app.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 2 }}>
                      {app.description}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {app.features.map((feature) => (
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
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        component="a"
                        href={app.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #21CBF3, #2196F3)',
                          },
                        }}
                      >
                        Download Now
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                          },
                        }}
                        onClick={() => navigate('/contact')}
                      >
                        Get Support
                      </Button>
                    </Box>
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

export default ThirdPartyApps; 