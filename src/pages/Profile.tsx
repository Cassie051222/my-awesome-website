import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Tabs,
  Tab,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { getOrdersByUserId, Order } from '../services/OrderService';
import { useLocation } from 'react-router-dom';
import { useWishlist, WishlistItem } from '../contexts/WishlistContext';
import { formatCurrency, formatDate } from '../utils/formatters';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface ProfileProps {
  initialTab?: number;
}

const Profile = ({ initialTab = 0 }: ProfileProps) => {
  const theme = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items: wishlistItems, removeItem } = useWishlist();

  useEffect(() => {
    const fetchOrders = async () => {
      console.log('[Profile] Component mounted, checking for user:', user ? 'User exists' : 'No user');
      
      if (user) {
        try {
          setLoading(true);
          setError(null); // Clear previous errors
          
          console.log('[Profile] Fetching orders for user:', user.uid);
          console.log('[Profile] Current user details:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
            emailVerified: user.emailVerified
          });
          
          // Check if we're connected to Firestore
          console.log('[Profile] Checking Firestore connection before fetching orders');
          
          const userOrders = await getOrdersByUserId(user.uid);
          console.log('[Profile] Orders fetched successfully:', userOrders.length);
          
          if (userOrders.length === 0) {
            console.log('[Profile] No orders found for user');
          } else {
            console.log('[Profile] First order:', JSON.stringify(userOrders[0], null, 2));
          }
          
          setOrders(userOrders);
        } catch (err: any) {
          console.error('[Profile] Error fetching orders:', err);
          setError(`Failed to load orders: ${err.message || 'Unknown error'}`);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('[Profile] No user logged in, cannot fetch orders');
        setLoading(false);
        setError('Please log in to view your orders');
      }
    };

    fetchOrders();
  }, [user]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileUpdate = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
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
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Avatar
                src={user?.photoURL || undefined}
                alt={user?.displayName || 'User'}
                sx={{ width: 120, height: 120 }}
              />
              <Box>
                <Typography variant="h3" gutterBottom>
                  {user?.displayName || 'User Profile'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Paper sx={{ borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Profile" />
            <Tab label="Orders" />
            <Tab label="Settings" />
            <Tab label="Wishlist" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                      <Typography variant="h6">Personal Information</Typography>
                      <IconButton onClick={handleEditToggle}>
                        {isEditing ? <CancelIcon /> : <EditIcon />}
                      </IconButton>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Display Name"
                          name="displayName"
                          value={profileData.displayName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={profileData.email}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          multiline
                          rows={3}
                        />
                      </Grid>
                    </Grid>
                    {isEditing && (
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleProfileUpdate}
                          sx={{
                            background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                            },
                          }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
            ) : orders.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No orders found. Start shopping to see your orders here!
                </Typography>
              </Box>
            ) : (
              <List>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            Order #{order.id}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Date: {formatDate(order.createdAt)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Items: {order.items.map((item: {name: string, quantity: number}) => `${item.name} (x${item.quantity})`).join(', ')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Payment Method: {order.paymentMethod}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Payment Status: {order.paymentStatus}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle2">{formatCurrency(order.total)}</Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: order.status === 'Delivered' 
                                ? 'success.main' 
                                : order.status === 'Cancelled'
                                ? 'error.main'
                                : order.status === 'Shipped'
                                ? 'warning.main'
                                : 'info.main',
                            }}
                          >
                            {order.status}
                          </Typography>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Receive updates about your orders and account"
                    />
                    <ListItemSecondaryAction>
                      {/* Add toggle switch here */}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Two-Factor Authentication"
                      secondary="Add an extra layer of security to your account"
                    />
                    <ListItemSecondaryAction>
                      {/* Add toggle switch here */}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Change Password"
                      secondary="Update your account password"
                    />
                    <ListItemSecondaryAction>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {/* TODO: Implement password change */}}
                      >
                        Change
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            {wishlistItems.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Your wishlist is empty. Start adding products you love!
                </Typography>
              </Box>
            ) : (
              <List>
                {wishlistItems.map((item: WishlistItem) => (
                  <React.Fragment key={item.id}>
                    <ListItem alignItems="flex-start">
                      <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box sx={{ width: 80, height: 80, mr: 2 }}>
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} 
                          />
                        </Box>
                        <ListItemText
                          primary={<Typography variant="subtitle1">{item.name}</Typography>}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {item.description?.substring(0, 120)}...
                              </Typography>
                              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                                {formatCurrency(item.price)}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Button 
                            variant="outlined" 
                            color="error" 
                            size="small"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </ListItemSecondaryAction>
                      </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            )}
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile; 