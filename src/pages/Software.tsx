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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import AddIcon from '@mui/icons-material/Add';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

const Software = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openInvoicing, setOpenInvoicing] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [showInvoicingScreen, setShowInvoicingScreen] = useState(false);

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

  // Function to handle menu hover
  const handleMenuHover = (menu: string | null) => {
    setHoveredMenu(menu);
  };

  // Function to handle menu item click
  const handleMenuItemClick = (item: string) => {
    if (item === 'Invoicing') {
      setShowInvoicingScreen(true);
      setHoveredMenu(null);
    }
  };

  // Sample invoicing data
  const invoiceItems = [
    { code: 'PJ010', description: 'Pizza Jumbo - Real Rib', quantity: 1.00, qtyToDeliver: 0.00, listPrice: 105.94, discount: 0.00, discountedPrice: 105.94, lineTotal: 105.94, volumeCalc: 'No' },
    { code: 'PL010', description: 'Pizza Large - Real Rib', quantity: 1.00, qtyToDeliver: 0.00, listPrice: 53.15, discount: 0.00, discountedPrice: 53.15, lineTotal: 53.15, volumeCalc: 'No' },
    { code: 'PP003', description: 'Garlic & Cheese Pizza Pie', quantity: 1.00, qtyToDeliver: 0.00, listPrice: 33.00, discount: 0.00, discountedPrice: 33.00, lineTotal: 33.00, volumeCalc: 'No' },
    { code: 'PP001', description: 'Cheese Pizza Pie', quantity: 1.00, qtyToDeliver: 0.00, listPrice: 28.00, discount: 0.00, discountedPrice: 28.00, lineTotal: 28.00, volumeCalc: 'No' },
    { code: '', description: 'Strong', quantity: 0.00, qtyToDeliver: 0.00, listPrice: 0.00, discount: 0.00, discountedPrice: 0.00, lineTotal: 0.00, volumeCalc: 'No' },
  ];

  // Function to render the invoicing interface
  const renderInvoicingInterface = () => {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#f5f5f5'
      }}>
        {/* Invoicing Header */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd'
        }}>
          {/* Left side - Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img" 
              src="/images/logo/SmartTradeBackgroundLogo.jpg"
              sx={{ 
                height: '40px',
                width: 'auto',
                marginRight: '10px'
              }}
            />
            <Box>
              <Typography sx={{ fontSize: '0.75rem', color: '#000', lineHeight: 1.2 }}>
                www.smart-trade.biz
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#000', lineHeight: 1.2 }}>
                info@smart-trade.biz
              </Typography>
            </Box>
          </Box>
          
          {/* Right side - Invoicing Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#000', fontWeight: 'normal' }}>
              Invoicing (Touch Mode)
            </Typography>
          </Box>
        </Box>
        
        {/* Table Content */}
        <TableContainer component={Paper} sx={{ flex: 1, boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                <TableCell sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Product Code</TableCell>
                <TableCell sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Description</TableCell>
                <TableCell align="right" sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Quantity</TableCell>
                <TableCell align="right" sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Quantity To Deliver</TableCell>
                <TableCell align="right" sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>List Price Inclusive</TableCell>
                <TableCell align="right" sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Discount %</TableCell>
                <TableCell align="right" sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Discounted Price Inclusive</TableCell>
                <TableCell align="right" sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Line Total Inclusive</TableCell>
                <TableCell align="right" sx={{ color: '#000', fontWeight: 500, fontSize: '0.8rem' }}>Volume Calculation Item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceItems.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ color: '#000', fontSize: '0.8rem' }}>{row.code}</TableCell>
                  <TableCell sx={{ color: '#000', fontSize: '0.8rem' }}>{row.description}</TableCell>
                  <TableCell align="right" sx={{ color: '#000', fontSize: '0.8rem' }}>{row.quantity.toFixed(2)}</TableCell>
                  <TableCell align="right" sx={{ color: '#000', fontSize: '0.8rem' }}>{row.qtyToDeliver.toFixed(2)}</TableCell>
                  <TableCell align="right" sx={{ color: '#000', fontSize: '0.8rem' }}>{row.listPrice.toFixed(2)}</TableCell>
                  <TableCell align="right" sx={{ color: '#000', fontSize: '0.8rem' }}>{row.discount.toFixed(2)}</TableCell>
                  <TableCell align="right" sx={{ color: '#000', fontSize: '0.8rem' }}>{row.discountedPrice.toFixed(2)}</TableCell>
                  <TableCell align="right" sx={{ color: '#000', fontSize: '0.8rem' }}>{row.lineTotal.toFixed(2)}</TableCell>
                  <TableCell align="right" sx={{ color: '#000', fontSize: '0.8rem' }}>{row.volumeCalc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Bottom Section */}
        <Box sx={{ backgroundColor: '#e6f2ff', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
          {/* Current Item */}
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#000' }}>
              Cheese Pizza Pie
            </Typography>
          </Box>
          
          {/* Totals */}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#000' }}>Sub Total:</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#000' }}>191.39</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#000' }}>VAT:</Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#000' }}>28.70</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'red' }}>Total:</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'red' }}>220.09</Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Button Pads */}
        <Box sx={{ 
          display: 'flex', 
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderTop: '1px solid #ddd'
        }}>
          {/* Product Category Buttons */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', flex: 3 }}>
            {['Old School Pizza\'s', 'Gourmet Pizza\'s', 'Create Own - Any 2 / 4 Pizza', 'Burgers', 'Vetkoek', 'Ciabatta', 'Toasties', 'Pizza Pies', 'Pizza Rolls', 'Pasta', 'Chicken', 'Salad\'s', 'Chips', 'Beverages', 'Wood Fired Bread', 'Other', 'Toets', 'Drank'].map((category) => (
              <Button 
                key={category}
                variant="contained"
                sx={{ 
                  backgroundColor: '#f5f5f5', 
                  color: '#000', 
                  fontSize: '0.75rem',
                  height: '50px',
                  flex: '1 0 15%',
                  border: '1px solid #ddd',
                  '&:hover': { backgroundColor: '#e0e0e0' }
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
          
          {/* Navigation and Keypad */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: '#0077be', 
                  color: 'white', 
                  fontSize: '0.8rem',
                  '&:hover': { backgroundColor: '#005fa3' } 
                }}
              >
                Page Up
              </Button>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: '#0077be', 
                  color: 'white', 
                  fontSize: '0.8rem',
                  '&:hover': { backgroundColor: '#005fa3' } 
                }}
              >
                Page Down
              </Button>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: '#0077be', 
                  color: 'white', 
                  fontSize: '0.8rem',
                  '&:hover': { backgroundColor: '#005fa3' } 
                }}
              >
                Back
              </Button>
            </Box>
            
            {/* Numeric Keypad */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '5px',
              marginTop: 'auto'
            }}>
              {['7', '8', '9', '4', '5', '6', '1', '2', '3', 'Clr', '0', '.', 'X', 'Enter'].map((key, index) => (
                <Button 
                  key={key}
                  variant="contained"
                  sx={{ 
                    backgroundColor: key === 'Enter' ? '#4caf50' : key === 'X' ? '#f44336' : '#f5f5f5', 
                    color: key === 'Enter' || key === 'X' ? 'white' : '#000', 
                    fontSize: '0.8rem',
                    gridColumn: key === 'Enter' ? 'span 2' : 'span 1',
                    '&:hover': { 
                      backgroundColor: key === 'Enter' ? '#388e3c' : key === 'X' ? '#d32f2f' : '#e0e0e0'
                    } 
                  }}
                >
                  {key}
                </Button>
              ))}
            </Box>
          </Box>
          
          {/* Function Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#4caf50', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#388e3c' } 
              }}
            >
              Cash
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#2196f3', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#1976d2' } 
              }}
            >
              Card
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#9c27b0', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#7b1fa2' } 
              }}
            >
              Customer
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#ff9800', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#f57c00' } 
              }}
            >
              E.F.T.
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#607d8b', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#455a64' } 
              }}
            >
              Account
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#3f51b5', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#303f9f' } 
              }}
            >
              Lookup
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#009688', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#00796b' } 
              }}
            >
              Split Tender
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#cddc39', 
                color: 'black', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#afb42b' } 
              }}
            >
              Lay-By
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#8bc34a', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#689f38' } 
              }}
            >
              Options
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#ffc107', 
                color: 'black', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#ffa000' } 
              }}
            >
              Other
            </Button>
            <Button 
              variant="contained"
              sx={{ 
                backgroundColor: '#f44336', 
                color: 'white', 
                fontSize: '0.8rem',
                '&:hover': { backgroundColor: '#d32f2f' } 
              }}
              onClick={() => setShowInvoicingScreen(false)}
            >
              Log-Out
            </Button>
          </Box>
        </Box>
      </Box>
    );
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
              backgroundColor: '#ffffff',
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
                backgroundColor: '#ffffff',
              }}
            >
              {/* Smart-Trade Window Title Bar */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '4px 10px',
                backgroundColor: '#e9e9e9',
                borderBottom: '1px solid #ccc'
              }}>
                <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 500, color: '#000000' }}>
                  Smart-Trade Retail Management - Version 1.2.0.0.181 | SmartTrade_Tests | Main Location | Terminal 2
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000000', fontWeight: 'bold' }}>−</Box>
                  <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000000', fontWeight: 'bold' }}>□</Box>
                  <Box sx={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000000', fontWeight: 'bold' }}>×</Box>
                </Box>
              </Box>
              
              {/* Menu Bar */}
              <Box sx={{ 
                display: 'flex', 
                backgroundColor: '#00bcd4', 
                color: '#000000',
                position: 'relative',
                '& > *': { 
                  padding: '4px 8px', 
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }
              }}>
                <Box>File</Box>
                <Box>Edit</Box>
                <Box sx={{ color: '#888888', cursor: 'default', '&:hover': { backgroundColor: 'transparent' } }}>ActiveTask</Box>
                <Box sx={{ color: '#888888', cursor: 'default', '&:hover': { backgroundColor: 'transparent' } }}>Tender</Box>
                <Box 
                  onMouseEnter={() => handleMenuHover('documents')}
                  onMouseLeave={() => handleMenuHover(null)}
                  sx={{ position: 'relative' }}
                >
                  Documents
                  {hoveredMenu === 'documents' && (
                    <Box sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: 250,
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      zIndex: 100,
                      border: '1px solid #cccccc'
                    }}>
                      {/* Group 1 */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' },
                          cursor: 'pointer'
                        }}
                        onClick={() => handleMenuItemClick('Invoicing')}
                      >
                        Invoicing
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Quotations
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Quotations Management
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Sales Refunds
                      </Box>
                      
                      {/* Sales Orders Group */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Sales Orders
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Sales Orders Management
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Sales Orders Process
                      </Box>
                      
                      {/* Delivery Notes Group */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Delivery Notes
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Delivery Notes Management
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Delivery Notes Process
                      </Box>
                      
                      {/* Lay-by's Group */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Lay-by's
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Lay-by's Management
                      </Box>
                      
                      {/* Divider */}
                      <Box sx={{ height: '1px', backgroundColor: '#888888', mx: 1 }} />
                      
                      {/* Other items */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Meter Readings
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Parking Process
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Picking Slips
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Recurring Invoices Process
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Weigh Bridge
                      </Box>
                      
                      {/* Divider */}
                      <Box sx={{ height: '1px', backgroundColor: '#888888', mx: 1 }} />
                      
                      {/* Purchase Orders Group */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Purchase Orders
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Purchase Orders Management
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Supplier Invoices
                      </Box>
                      
                      {/* Stock Group */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Stock Returns
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Stock Adjustments
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Supplier Claims
                      </Box>
                      
                      {/* Divider */}
                      <Box sx={{ height: '1px', backgroundColor: '#888888', mx: 1 }} />
                      
                      {/* Payment Options Group */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          display: 'flex',
                          justifyContent: 'space-between',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Jobcards
                        <span>►</span>
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          display: 'flex',
                          justifyContent: 'space-between',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Customer Payments
                        <span>►</span>
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          display: 'flex',
                          justifyContent: 'space-between',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Supplier Payments
                        <span>►</span>
                      </Box>
                      
                      {/* Divider */}
                      <Box sx={{ height: '1px', backgroundColor: '#888888', mx: 1 }} />
                      
                      {/* Remaining items */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        IBR's (Inter Branch Receives)
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        IBT's (Inter Branch Transfers)
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Location Receives
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Location Transfers
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Stock Request
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Stock Requests Management
                      </Box>
                      
                      {/* Divider */}
                      <Box sx={{ height: '1px', backgroundColor: '#888888', mx: 1 }} />
                      
                      {/* Manufacturing Group */}
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Batch Processing
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Manufacture a Product
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Manufacturing Management
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Portion a Product
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Stock Requisition
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Process Cutting Schedule
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Process Product Conversion
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Inventory Value Adjustments
                      </Box>
                      <Box 
                        sx={{ 
                          padding: '4px 10px', 
                          fontSize: '0.65rem', 
                          color: '#000000',
                          textAlign: 'left',
                          fontWeight: 'normal',
                          '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                      >
                        Redeem Points
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box>Products</Box>
                <Box>Suppliers</Box>
                <Box>Customers</Box>
                <Box>Staff</Box>
                <Box>General Ledger</Box>
                <Box>Procedures</Box>
                <Box>Reports</Box>
                <Box>Settings</Box>
                <Box>Window</Box>
                <Box>Help</Box>
              </Box>
              
              {/* Toolbar */}
              <Box sx={{ 
                display: 'flex', 
                backgroundColor: '#e0e0e0', 
                borderBottom: '1px solid #ddd',
                padding: '4px 0'
              }}>
                {[
                  { name: 'New', icon: <AddIcon fontSize="small" /> },
                  { name: 'Open', icon: <FolderOpenIcon fontSize="small" /> },
                  { name: 'Save', icon: <SaveIcon fontSize="small" /> },
                  { name: 'Delete', icon: <DeleteIcon fontSize="small" /> },
                  { name: 'Print', icon: <PrintIcon fontSize="small" /> },
                  { name: 'Cut', icon: <ContentCutIcon fontSize="small" /> },
                  { name: 'Copy', icon: <ContentCopyIcon fontSize="small" /> },
                  { name: 'Paste', icon: <ContentPasteIcon fontSize="small" /> },
                  { name: 'Undo', icon: <UndoIcon fontSize="small" /> },
                  { name: 'Redo', icon: <RedoIcon fontSize="small" /> },
                  { name: 'Help', icon: <HelpOutlineIcon fontSize="small" /> },
                  { name: 'Refresh', icon: <RefreshIcon fontSize="small" /> }
                ].map((item) => (
                  <Box key={item.name} sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 50,
                    fontSize: '0.65rem',
                    cursor: 'pointer',
                    color: '#777777',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(0,0,0,0.05)'
                    }
                  }}>
                    <Box 
                      sx={{ 
                        width: 20, 
                        height: 20, 
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 0.5,
                        color: '#000000'
                      }}
                    >
                      {item.icon}
                    </Box>
                    {item.name}
                  </Box>
                ))}
                <Box sx={{ flexGrow: 1 }}></Box>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0 10px' 
                }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem', mr: 1, color: '#000000', fontWeight: 500 }}>Quick Search</Typography>
                  <Box 
                    component="input"
                    placeholder="Search..."
                    sx={{ 
                      width: 150, 
                      height: 24, 
                      border: '1px solid #ccc',
                      borderRadius: '2px',
                      backgroundColor: 'white',
                      fontSize: '0.7rem',
                      padding: '0 8px',
                      outline: 'none',
                      '&:focus': {
                        borderColor: '#00bcd4'
                      }
                    }}
                  />
                </Box>
              </Box>
              
              {/* Main Content Area */}
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                padding: 2,
                backgroundColor: '#ffffff'
              }}>
                {showInvoicingScreen ? (
                  renderInvoicingInterface()
                ) : (
                  <>
                    {/* SmartTrade Logo */}
                    <Box sx={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mb: 2, 
                      mt: -12
                    }}>
                      <Box 
                        component="img"
                        src="/images/logo/SmartTradeBackgroundLogo.jpg"
                        alt="Smart Trade Logo"
                        sx={{
                          maxWidth: '65%',
                          height: 'auto',
                          mb: 1
                        }}
                      />
                    </Box>
                    
                    {/* System Information */}
                    <Box sx={{ 
                      position: 'absolute',
                      bottom: 50,
                      left: 50,
                      maxWidth: 350
                    }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: '#0077be',
                        mb: 0.5,
                        fontWeight: 'bold',
                        fontSize: '0.85rem'
                      }}>
                        System Information...
                      </Typography>
                      <Grid container spacing={0.25} sx={{ fontSize: '0.7rem' }}>
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Location</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>Main Location</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Terminal Number</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>2</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Machine Name</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>CIS_DPC_01</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Server Name</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>CIS_DPC_01</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Local Path</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>C:\SmtDB\SmtDB_Test</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Database Name</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>SmartTrade</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Database Type</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>Microsoft SQL Server 2022 (RTM-GDR) (KB5046861) - 16.0.1135.2 (X64)</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Build Version</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>1.2.0.0</Grid>
                        
                        <Grid item xs={4} sx={{ color: '#000000', fontWeight: 500 }}>Patch Number</Grid>
                        <Grid item xs={8} sx={{ color: '#000000' }}>181</Grid>
                      </Grid>
                    </Box>
                    
                    {/* Copyright */}
                    <Box sx={{ 
                      position: 'absolute',
                      bottom: 20,
                      right: 20,
                      textAlign: 'right',
                      fontSize: '0.8rem'
                    }}>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 500 }}>
                        © 1996-2025 Computer Information Systems.
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 500 }}>
                        All Rights reserved.
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#0077be', fontWeight: 600 }}>
                        www.smart-trade.biz
                      </Typography>
                    </Box>
                  </>
                )}
                
                {/* Footer Status Bar */}
                <Box sx={{ 
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: 24,
                  backgroundColor: '#00bcd4',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px',
                  color: 'white',
                  fontSize: '0.75rem'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundColor: '#008ba3',
                    height: '100%',
                    padding: '0 10px',
                    fontWeight: 600
                  }}>
                    User logged on is : Smart Trade (Administrators)
                  </Box>
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box sx={{ fontWeight: 600 }}>License will expire within 308 days...</Box>
                  <Box sx={{ width: 20 }}></Box>
                  <Box sx={{ fontWeight: 600 }}>Location: Main Location</Box>
                  <Box sx={{ width: 20 }}></Box>
                  <Box sx={{ fontWeight: 600 }}>Support Number: <span style={{ textDecoration: 'underline' }}>Contact Us</span></Box>
                </Box>
              </Box>
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