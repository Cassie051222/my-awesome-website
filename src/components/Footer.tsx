import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface FooterProps {
  toggleTheme: () => void;
}

const Footer: React.FC<FooterProps> = ({ toggleTheme }) => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Smart-Trade
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your one-stop shop for all tech hardware and accessories.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                component="a"
                href="https://www.facebook.com/CISystemsZA/"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                aria-label="Visit our Facebook page"
                sx={{
                  transition: 'all 0.2s',
                  '&:hover': { color: '#FF6B00', transform: 'translateY(-3px)' },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com/cisystemsza?s=11&t=r3w5cYcbeKSMXnwPK7XSUA"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                aria-label="Visit our Twitter page"
                sx={{
                  transition: 'all 0.2s',
                  '&:hover': { color: '#FF6B00', transform: 'translateY(-3px)' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                aria-label="Visit our Instagram page (coming soon)"
                sx={{
                  transition: 'all 0.2s',
                  '&:hover': { color: '#FF6B00', transform: 'translateY(-3px)' },
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                aria-label="Visit our LinkedIn page (coming soon)"
                sx={{
                  transition: 'all 0.2s',
                  '&:hover': { color: '#FF6B00', transform: 'translateY(-3px)' },
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                aria-label={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}
                sx={{
                  ml: 1,
                  transition: 'all 0.2s',
                  '&:hover': { color: '#FF6B00', transform: 'translateY(-3px)' },
                }}
              >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Products
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                component={RouterLink}
                to="/products?category=Laptops"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Laptops
              </Link>
              <Link
                component={RouterLink}
                to="/products?category=Desktops"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Desktops
              </Link>
              <Link
                component={RouterLink}
                to="/products?category=Accessories"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Accessories
              </Link>
              <Link
                component={RouterLink}
                to="/products?category=Monitors"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Monitors
              </Link>
              <Link
                component={RouterLink}
                to="/products?category=Storage"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Storage
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                component={RouterLink}
                to="/contact"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Contact Us
              </Link>
              <Link
                component={RouterLink}
                to="/faq"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                FAQ
              </Link>
              <Link
                component={RouterLink}
                to="/shipping"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Shipping
              </Link>
              <Link
                component={RouterLink}
                to="/returns"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Returns
              </Link>
              <Link
                component={RouterLink}
                to="/warranty"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Warranty
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                component={RouterLink}
                to="/about"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/privacy-policy"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Privacy Policy
              </Link>
              <Link
                component={RouterLink}
                to="/terms-of-service"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Terms of Service
              </Link>
              <Link
                component={RouterLink}
                to="/blog"
                color="text.secondary"
                sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
              >
                Blog
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Smart-Trade. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 