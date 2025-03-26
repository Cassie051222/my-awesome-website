import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  Logout,
  Home,
  Computer,
  ContactMail,
  FavoriteBorder,
  PersonOutline as PersonOutlineIcon,
  ReceiptLong as ReceiptLongIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Search,
  Brightness4,
  Brightness7,
  Close,
  Login,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  onAuthClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const { items: cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleProfileMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Smart-Trade', path: '/smart-trade' },
    { text: 'Products', path: '/products' },
    { text: 'Third Party Apps', path: '/third-party-apps' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: {
          width: 240,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={user.photoURL || undefined}
              alt={user.displayName || 'User'}
              sx={{ mr: 2 }}
            />
            <Box>
              <Typography variant="subtitle1">{user.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setMobileMenuOpen(false);
              onAuthClick();
            }}
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            Login / Sign Up
          </Button>
        )}
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {user && (
        <>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <ListItemIcon><PersonOutlineIcon /></ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/profile/wishlist" onClick={() => setMobileMenuOpen(false)}>
                <ListItemIcon><FavoriteBorder /></ListItemIcon>
                <ListItemText primary="Wishlist" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><Logout /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
    </Drawer>
  );

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {menuItems.map((item) => (
        <Button
          key={item.text}
          component={RouterLink}
          to={item.path}
          sx={{
            fontWeight: 'medium',
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
            '&:hover': {
              color: '#FF6B00',
            },
          }}
        >
          {item.text}
        </Button>
      ))}
      <IconButton
        component={RouterLink}
        to="/cart"
        aria-label={`View shopping cart with ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}`}
        sx={{ 
          ml: 1,
          color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333',
          '&:hover': {
            color: '#FF6B00',
          },
        }}
      >
        <Badge badgeContent={cartItems.length} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleProfileMenuOpen}
          sx={{
            ml: 1,
            width: 40,
            height: 40,
            ...(Boolean(profileAnchorEl) && {
              bgcolor: alpha(theme.palette.primary.main, 0.1)
            })
          }}
        >
          {user ? (
            <Avatar 
              src={user?.photoURL || undefined} 
              alt={user?.displayName || 'User'} 
              sx={{ 
                width: 32, 
                height: 32,
                border: `2px solid ${theme.palette.primary.main}`
              }} 
            />
          ) : (
            <Person />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          },
        }}
      >
        {user ? (
          <>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1">{user?.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => { 
              handleProfileMenuClose();
              navigate('/profile');
            }}>
              <PersonOutlineIcon sx={{ mr: 2, fontSize: 20 }} />
              My Profile
            </MenuItem>
            <MenuItem onClick={() => {
              handleProfileMenuClose();
              navigate('/profile/orders');
            }}>
              <ReceiptLongIcon sx={{ mr: 2, fontSize: 20 }} />
              My Orders
            </MenuItem>
            <MenuItem onClick={() => {
              handleProfileMenuClose();
              navigate('/profile/wishlist');
            }}>
              <FavoriteBorder sx={{ mr: 2, fontSize: 20 }} />
              Wishlist
            </MenuItem>
            {isAdmin() && (
              <MenuItem onClick={() => {
                handleProfileMenuClose();
                navigate('/admin');
              }}>
                <AdminPanelSettingsIcon sx={{ mr: 2, fontSize: 20 }} />
                Admin
              </MenuItem>
            )}
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 2, fontSize: 20 }} />
              Logout
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => {
            handleProfileMenuClose();
            onAuthClick();
          }}>
            <Login sx={{ mr: 2, fontSize: 20 }} />
            Login / Sign Up
          </MenuItem>
        )}
      </Menu>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{
            mr: 2,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Smart-Trade
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#333333' }}
            >
              <MenuIcon />
            </IconButton>
            {renderMobileMenu()}
          </>
        ) : (
          renderDesktopMenu()
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 