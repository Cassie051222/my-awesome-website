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

const Profile = ({ initialTab }: ProfileProps) => {
  const theme = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(() => {
    if (initialTab !== undefined) return initialTab;
    
    // Set tab based on URL path if no initialTab provided
    if (location.pathname.includes('/orders')) return 1;
    if (location.pathname.includes('/settings')) return 2;
    return 0;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          setError(null); // Clear previous errors
          console.log('[Profile] Fetching orders for user:', user.uid);
          
          // Add additional debugging
          console.log('[Profile] Current user:', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          }));
          
          const userOrders = await getOrdersByUserId(user.uid);
          console.log('[Profile] Orders fetched successfully:', userOrders.length);
          setOrders(userOrders);
        } catch (err) {
          console.error('[Profile] Error fetching orders:', err);
          setError('Failed to load orders. Please try again later.');
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
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
                              Items: {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
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
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile; 