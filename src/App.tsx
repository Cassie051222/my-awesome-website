import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Software from './pages/Software';
import Products from './pages/Products';
import ThirdPartyApps from './pages/ThirdPartyApps';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDetail from './pages/ProductDetail';
import { seedProducts } from './services/ProductService';

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<PaletteMode>('light');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Load saved theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedTheme) {
      setThemeMode(savedTheme);
    } else {
      // Check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(prefersDarkMode ? 'dark' : 'light');
    }

    // Seed products on initial load
    seedProducts().catch(console.error);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('themeMode')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#FF6B00',
        light: '#FF8533',
        dark: '#CC5500',
        contrastText: '#fff',
      },
      secondary: {
        main: '#2196F3',
        light: '#64B5F6',
        dark: '#1976D2',
        contrastText: '#fff',
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
      },
      warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      info: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
      },
      success: {
        main: '#4caf50',
        light: '#81c784',
        dark: '#388e3c',
      },
      background: {
        default: themeMode === 'dark' ? '#121212' : '#f5f5f5',
        paper: themeMode === 'dark' ? '#1E1E1E' : '#ffffff',
      },
      text: {
        primary: themeMode === 'dark' ? '#E0E0E0' : '#333333',
        secondary: themeMode === 'dark' ? '#AAAAAA' : '#666666',
      },
      divider: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            padding: '8px 16px',
            fontWeight: 500,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: themeMode === 'dark'
              ? '0 4px 12px rgba(0, 0, 0, 0.5)'
              : '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: themeMode === 'dark'
              ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
            boxShadow: 'none',
            borderBottom: `1px solid ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: themeMode === 'dark'
              ? 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '& fieldset': {
                borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF6B00',
              },
            },
            '& .MuiInputLabel-root': {
              color: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              '&.Mui-focused': {
                color: '#FF6B00',
              },
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar
              onAuthClick={() => setAuthModalOpen(true)}
            />
            <AuthModal
              open={authModalOpen}
              onClose={() => setAuthModalOpen(false)}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/software" element={<Software />} />
              <Route path="/smart-trade" element={<Navigate to="/software" replace />} />
              <Route path="/hardware" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<Products />} />
              <Route path="/third-party-apps" element={<ThirdPartyApps />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/search" element={<Navigate to="/products" replace />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
            <Footer toggleTheme={toggleThemeMode} />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
