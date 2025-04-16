import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Tab,
  Tabs,
  useTheme,
  Alert,
  CircularProgress,
  Link,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

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
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const { signIn, signUp, resetPassword } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signIn(loginData.email, loginData.password);
      onClose();
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      await signUp(signupData.email, signupData.password, signupData.username);
      onClose();
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setError('Please enter your email address');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      await resetPassword(resetEmail);
      setSuccess('Password reset email sent! Check your inbox.');
      setResetEmail('');
      // We'll leave the dialog open so they can see the success message
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'Failed to send password reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleResetEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(e.target.value);
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 450,
            borderRadius: 2,
          }
        }}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
            paddingTop: 5
          }
        }}
      >
        <DialogTitle sx={{ 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          textAlign: 'center',
          pt: 3 
        }}>
          <Typography variant="h5" fontWeight="bold">
            Welcome to Smart-Trade
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ 
          pt: 2,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#FF6B00',
              },
              '& .MuiTab-root': {
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  color: '#FF6B00',
                  fontWeight: 'bold',
                },
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {success}
            </Alert>
          )}
          
          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  sx: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  sx: { color: theme.palette.text.secondary }
                }}
              />
              <Box sx={{ mt: 3, mb: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                    },
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    setForgotPasswordOpen(true);
                  }}
                  sx={{
                    color: '#FF6B00',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
            </form>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <form onSubmit={handleSignup}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  sx: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  sx: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  sx: { color: theme.palette.text.secondary }
                }}
              />
              <TextField
                label="Username"
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  sx: { color: theme.palette.text.secondary }
                }}
              />
              <Box sx={{ mt: 3, mb: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                    },
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </Box>
            </form>
          </TabPanel>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          justifyContent: 'center'
        }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 450,
            borderRadius: 2,
          }
        }}
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
            paddingTop: 5
          }
        }}
      >
        <DialogTitle sx={{ 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          textAlign: 'center',
          pt: 3 
        }}>
          <Typography variant="h5" fontWeight="bold">
            Reset Password
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ 
          pt: 2,
          pb: 3,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        }}>
          <Typography variant="body1" sx={{ mb: 2, mt: 1 }}>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          
          <form onSubmit={handleForgotPassword}>
            <TextField
              label="Email"
              type="email"
              value={resetEmail}
              onChange={handleResetEmailChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{
                sx: { color: theme.palette.text.secondary }
              }}
            />
            
            <Box sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                  },
                }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </Box>
          </form>
        </DialogContent>
        
        <DialogActions sx={{ 
          p: 3, 
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          justifyContent: 'center'
        }}>
          <Button 
            onClick={() => {
              setForgotPasswordOpen(false);
              setError('');
              setSuccess('');
              setResetEmail('');
            }}
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AuthModal; 