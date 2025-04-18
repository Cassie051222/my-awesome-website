import React, { useState, useEffect, useRef } from 'react';
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
  Tooltip,
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';

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
  const [activeTab, setActiveTab] = useState('Information'); // Bottom tabs
  const [activeTopTab, setActiveTopTab] = useState('Invoice Items'); // Top tabs
  
  // States for product selection functionality
  const [productSelectionOpen, setProductSelectionOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    code: string;
    description: string;
    quantity: number;
    qtyToDeliver: number;
    listPrice: number;
    discount: number;
    discountedPrice: number;
    lineTotal: number;
    volumeCalc: string;
  }>>([]);
  const [totalDue, setTotalDue] = useState(0);
  const [vatAmount, setVatAmount] = useState(0);
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(null);

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

  // Product catalog for selection
  const productCatalog = [
    { code: 'PJ010', description: 'Pizza Jumbo - Real Rib', listPrice: 105.94, stockOnHand: 5.00 },
    { code: 'PL010', description: 'Pizza Large - Real Rib', listPrice: 53.15, stockOnHand: 8.00 },
    { code: 'PP003', description: 'Garlic & Cheese Pizza Pie', listPrice: 33.00, stockOnHand: 12.00 },
    { code: 'PP001', description: 'Cheese Pizza Pie', listPrice: 28.00, stockOnHand: 15.00 },
    { code: '84121470T1283', description: 'Sweets 200g', listPrice: 39.00, stockOnHand: 25.00 },
    { code: 'Z-045015-1', description: 'TYO (4.0) x 60 Steel Wood Screws loose', listPrice: 29.00, stockOnHand: 150.00 },
    { code: 'RF-NIA6035-15', description: 'Nylon Nail In Anchor 5 x 35mm (15) - Rawplug', listPrice: 18.50, stockOnHand: 4.00 },
    { code: 'RF-NIA6035-100', description: 'Nylon Nail In Anchor 5 x 35mm (100) - Rawplug', listPrice: 65.00, stockOnHand: 2.00 },
    { code: 'GENPORT1000W', description: 'Gen 100w Portable Floodlight', listPrice: 450.00, stockOnHand: 3.00 },
  ];

  // Function to calculate totals
  const calculateTotals = (products: Array<{
    code: string;
    description: string;
    quantity: number;
    qtyToDeliver: number;
    listPrice: number;
    discount: number;
    discountedPrice: number;
    lineTotal: number;
    volumeCalc: string;
  }>) => {
    // Calculate line totals
    const productsWithTotals = products.map(product => {
      const lineTotal = product.quantity * product.listPrice * (1 - product.discount / 100);
      return {
        ...product,
        discountedPrice: product.listPrice * (1 - product.discount / 100),
        lineTotal
      };
    });
    
    // Calculate invoice total
    const total = productsWithTotals.reduce((sum, product) => sum + product.lineTotal, 0);
    
    // Calculate VAT (assuming 15% VAT)
    const vat = total * 0.15;
    
    setSelectedProducts(productsWithTotals);
    setTotalDue(total);
    setVatAmount(vat);
    
    return productsWithTotals;
  };

  // Function to handle product selection
  const handleProductSelect = (product: any) => {
    // Check if product already exists in the list
    const existingIndex = selectedProducts.findIndex(p => p.code === product.code);
    
    if (existingIndex >= 0) {
      // Update quantity if product already exists
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingIndex].quantity += 1;
      calculateTotals(updatedProducts);
    } else {
      // Add new product to the list
      const newProduct = {
        code: product.code,
        description: product.description,
        quantity: 1.00,
        qtyToDeliver: 0.00,
        listPrice: product.listPrice,
        discount: 0.00,
        discountedPrice: product.listPrice,
        lineTotal: product.listPrice,
        volumeCalc: 'No'
      };
      calculateTotals([...selectedProducts, newProduct]);
    }
    
    setProductSelectionOpen(false);
  };

  // Function to update product quantity
  const updateProductQuantity = (index: number, quantity: number) => {
    if (quantity >= 0) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index].quantity = quantity;
      calculateTotals(updatedProducts);
    }
  };

  // Function to update product discount
  const updateProductDiscount = (index: number, discount: number) => {
    if (discount >= 0 && discount <= 100) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index].discount = discount;
      calculateTotals(updatedProducts);
    }
  };

  // Function to handle "..." click to open product selection
  const handleProductCodeClick = () => {
    setProductSelectionOpen(true);
  };

  // Function to render the invoicing interface
  const renderInvoicingInterface = () => {
    return (
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}>
        {/* This is an empty implementation - we no longer use this function directly */}
        {/* The actual implementation is inside the main component */}
      </Box>
    );
  };

  // Add this function to handle item deletion
  const handleDeleteLastItem = () => {
    if (selectedProducts.length > 0) {
      const updatedProducts = [...selectedProducts];
      updatedProducts.pop(); // Remove the last item
      calculateTotals(updatedProducts);
    }
  };

  // Add this useEffect to handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F9') {
        event.preventDefault();
        handleDeleteLastItem();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProducts]); // Re-create listener when selectedProducts changes

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
                  Smart-Trade Retail Management - Version 1.2.0.0.181 | SmartTrade | Main Location | Terminal 2
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
                height: '28px', // Add fixed height
                '& > *': { 
                  padding: '4px 8px', 
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: 500,
                  height: '100%', // Ensure all items have same height
                  display: 'flex',
                  alignItems: 'center',
                    '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }
              }}>
                <Box>File</Box>
                <Box>Edit</Box>
                <Box sx={{ 
                  color: showInvoicingScreen ? '#000000' : '#888888', 
                  cursor: showInvoicingScreen ? 'pointer' : 'default', 
                  '&:hover': { backgroundColor: 'transparent' } 
                }}>ActiveTask</Box>
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
                {showInvoicingScreen && (
                  <Box 
                    sx={{ 
                      marginLeft: 'auto',
                      width: '24px', 
                      height: '100%', // Make sure this is 100% to match parent
                      backgroundColor: '#00bcd4',
                    display: 'flex',
                    alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#008ba3'
                      }
                    }}
                    onClick={() => setShowInvoicingScreen(false)}
                  >
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>×</Typography>
                  </Box>
                )}
              </Box>
              
              {/* Toolbar */}
              <Box sx={{ 
                display: showInvoicingScreen ? 'none' : 'flex', // Hide when invoicing screen is active
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
                padding: 0,
                backgroundColor: '#ffffff'
              }}>
                {showInvoicingScreen ? (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#ffffff'
                  }}>
                    {/* Invoicing screen content without duplicating menu and chrome */}
                    <Box sx={{ 
                      width: '100%', 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}>
                      {/* Total Due Header */}
                      <Box sx={{ 
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        padding: '0px 15px 15px 0px',
                        borderBottom: '1px solid #ccc',
                        height: 'auto'
                      }}>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#000000' }}>
                            Total Due
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: '#000000',
                            lineHeight: 1,
                          }}>
                            {totalDue.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Item Description */}
                      <Box sx={{ 
                        display: 'flex',
                        borderBottom: '1px solid #2196f3',
                        padding: '5px 10px',
                        backgroundColor: '#ffffff'
                      }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#000000' }}>
                          Item Description
                        </Typography>
                      </Box>
                      
                      {/* Tabs */}
                      <Box sx={{ 
                        display: 'flex',
                        borderBottom: '1px solid #ccc',
                        backgroundColor: 'transparent',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        <Box 
                          sx={{ 
                            padding: '5px 10px', 
                            backgroundColor: activeTopTab === 'Invoice Items' ? '#1976d2' : '#ffffff', 
                            cursor: 'pointer', 
                            borderRight: '1px solid #ccc',
                            borderTop: '1px solid #ccc',
                            borderLeft: '1px solid #ccc',
                            fontSize: '0.8rem', 
                            color: activeTopTab === 'Invoice Items' ? '#ffffff' : '#000000',
                            fontWeight: activeTopTab === 'Invoice Items' ? 'bold' : 'normal',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            position: 'relative',
                            top: '1px',
                            marginLeft: '4px'
                          }}
                          onClick={() => setActiveTopTab('Invoice Items')}
                        >
                          Invoice Items
                        </Box>
                        <Box 
                          sx={{ 
                            padding: '5px 10px', 
                            backgroundColor: activeTopTab === 'Document Summary' ? '#1976d2' : '#ffffff', 
                            cursor: 'pointer', 
                            borderRight: '1px solid #ccc',
                            borderTop: '1px solid #ccc',
                            borderLeft: '1px solid #ccc',
                            fontSize: '0.8rem', 
                            color: activeTopTab === 'Document Summary' ? '#ffffff' : '#000000',
                            fontWeight: activeTopTab === 'Document Summary' ? 'bold' : 'normal',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            position: 'relative',
                            top: '1px'
                          }}
                          onClick={() => setActiveTopTab('Document Summary')}
                        >
                          Document Summary
                        </Box>
                      </Box>
                      
                      {/* Table Header */}
                      <Box sx={{ 
                        display: 'flex',
                        borderBottom: '1px solid #ccc',
                        backgroundColor: '#ffffff'
                      }}>
                        <Box sx={{ width: '120px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          Product Code
                        </Box>
                        <Box sx={{ flex: 1, padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          Description
                        </Box>
                        <Box sx={{ width: '120px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          Stock On Hand
                        </Box>
                        <Box sx={{ width: '120px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          Quantity
                        </Box>
                        <Box sx={{ width: '120px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          List Price Inclusive
                        </Box>
                        <Box sx={{ width: '80px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          Discount %
                        </Box>
                        <Box sx={{ width: '130px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          Discounted Price Inclusive
                        </Box>
                        <Box sx={{ width: '120px', padding: '5px', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                          Line Total Inclusive
                        </Box>
                      </Box>
                      
                      {/* Table Content - Selected Products */}
                      <Box sx={{ 
                        flex: 1,
                        backgroundColor: '#ffffff',
                        overflowY: 'auto'
                      }}>
                        {selectedProducts.map((product, index) => (
                          <Box 
                            key={`${product.code}-${index}`}
                            sx={{ 
                              display: 'flex',
                              borderBottom: '1px solid #ccc',
                              backgroundColor: index % 2 === 0 ? '#fffde7' : '#ffffff',
                              height: '25px',
                              alignItems: 'center'
                            }}
                          >
                            <Box sx={{ width: '120px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'left', color: '#000000' }}>
                              {product.code}
                            </Box>
                            <Box sx={{ flex: 1, padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'left', color: '#000000' }}>
                              {product.description}
                            </Box>
                            <Box sx={{ width: '120px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                              <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => updateProductQuantity(index, parseFloat(e.target.value) || 0)}
                                style={{
                                  width: '100%',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  fontSize: '0.75rem',
                                  textAlign: 'center',
                                  padding: 0
                                }}
                                min="0"
                                step="0.01"
                              />
                            </Box>
                            <Box sx={{ width: '120px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'right', color: '#000000' }}>
                              {product.listPrice.toFixed(2)}
                            </Box>
                            <Box sx={{ width: '80px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'center', color: '#000000' }}>
                              <input
                                type="number"
                                value={product.discount}
                                onChange={(e) => updateProductDiscount(index, parseFloat(e.target.value) || 0)}
                                style={{
                                  width: '100%',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  fontSize: '0.75rem',
                                  textAlign: 'center',
                                  padding: 0
                                }}
                                min="0"
                                max="100"
                                step="0.01"
                              />
                            </Box>
                            <Box sx={{ width: '130px', padding: '5px', borderRight: '1px solid #ccc', fontSize: '0.75rem', textAlign: 'right', color: '#000000' }}>
                              {product.discountedPrice.toFixed(2)}
                            </Box>
                            <Box sx={{ width: '120px', padding: '5px', fontSize: '0.75rem', textAlign: 'right', color: '#000000' }}>
                              {product.lineTotal.toFixed(2)}
                            </Box>
                          </Box>
                        ))}
                        
                        {/* Add Item row (always appears after all selected products) */}
                        <Box sx={{ 
                          display: 'flex',
                          borderBottom: '1px solid #ccc',
                          backgroundColor: '#ffffff',
                          height: '25px',
                          alignItems: 'center'
                        }}>
                          <Box 
                            sx={{ 
                              width: '120px', 
                              padding: '5px', 
                              borderRight: '1px solid #ccc', 
                              fontSize: '0.75rem', 
                              textAlign: 'center', 
                              color: '#000000',
                              cursor: 'pointer',
                              '&:hover': {
                                backgroundColor: '#f5f5f5'
                              }
                            }}
                            onClick={handleProductCodeClick}
                          >
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'flex-end', 
                              alignItems: 'center', 
                              height: '100%'
                            }}>
                              <Box sx={{ 
                                border: '1px solid #ccc', 
                                width: '20px', 
                                height: '20px', 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderRadius: '2px'
                              }}>
                                ...
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ flex: 1, padding: '5px' }}></Box>
                        </Box>
                      </Box>
                      
                      {/* Product Selection Modal - Moved inside the demo UI */}
                      {productSelectionOpen && (
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 1000
                        }} onClick={() => setProductSelectionOpen(false)}>
                          <Box 
                            sx={{ 
                              width: '80%',
                              maxWidth: '900px',
                              maxHeight: '80%',
                              backgroundColor: 'white',
                              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                              borderRadius: '4px',
                              overflow: 'hidden',
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Modal Header */}
                            <Box sx={{ 
                              backgroundColor: '#e9e9e9',
                              padding: '10px 15px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              borderBottom: '1px solid #ccc'
                            }}>
                              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#000000' }}>
                                Products Select List
                              </Typography>
                              <Box 
                                sx={{ 
                                  width: '20px', 
                                  height: '20px', 
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  '&:hover': { backgroundColor: '#d0d0d0', borderRadius: '50%' }
                                }}
                                onClick={() => setProductSelectionOpen(false)}
                              >
                                ×
                              </Box>
                            </Box>
                            
                            {/* Column Headers */}
                            <Box sx={{ 
                              display: 'flex',
                              backgroundColor: '#f0f0f0',
                              borderBottom: '1px solid #ccc',
                              padding: '5px 0'
                            }}>
                              <Box sx={{ width: '120px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold', color: '#000000' }}>
                                Product Code
                              </Box>
                              <Box sx={{ flex: 1, padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold', color: '#000000' }}>
                                Description
                              </Box>
                              <Box sx={{ width: '120px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: 'bold', color: '#000000' }}>
                                Stock On Hand
                              </Box>
                            </Box>
                            
                            {/* Search Filters */}
                            <Box sx={{ 
                              display: 'flex', 
                              padding: '10px',
                              backgroundColor: '#f9f9f9',
                              borderBottom: '1px solid #ccc'
                            }}>
                              <Box 
                                component="input"
                                placeholder="Search products..."
                                sx={{ 
                                  flex: 1,
                                  padding: '5px 10px',
                                  border: '1px solid #ccc',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem'
                                }}
                              />
                              <Box sx={{ 
                                marginLeft: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#f0ad4e',
                                color: 'white',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': { backgroundColor: '#ec971f' }
                              }}>
                                Search
                              </Box>
                            </Box>
                            
                            {/* Product List */}
                            <Box sx={{ 
                              flex: 1,
                              overflow: 'auto',
                              padding: '10px'
                            }}>
                              <Box sx={{ width: '100%' }}>
                                {productCatalog.map((product, index) => (
                                  <Box 
                                    key={product.code}
                                    sx={{ 
                                      display: 'flex',
                                      borderBottom: '1px solid #eee',
                                      padding: '5px 0',
                                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                                      cursor: 'pointer',
                                      '&:hover': { backgroundColor: '#e9f5ff' }
                                    }}
                                    onClick={() => handleProductSelect(product)}
                                  >
                                    <Box sx={{ width: '120px', padding: '5px 10px', fontSize: '0.75rem', color: '#000000' }}>
                                      {product.code}
                                    </Box>
                                    <Box sx={{ flex: 1, padding: '5px 10px', fontSize: '0.75rem', color: '#000000' }}>
                                      {product.description}
                                    </Box>
                                    <Box sx={{ width: '120px', padding: '5px 10px', fontSize: '0.75rem', color: '#000000', textAlign: 'right' }}>
                                      {product.stockOnHand.toFixed(2)}
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            </Box>
                            
                            {/* Bottom Buttons */}
                            <Box sx={{ 
                              padding: '10px',
                              backgroundColor: '#f9f9f9',
                              borderTop: '1px solid #ccc',
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}>
                              <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Box sx={{ 
                                  padding: '5px 15px',
                                  backgroundColor: '#5cb85c',
                                  color: 'white',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  '&:hover': { backgroundColor: '#449d44' }
                                }}>
                                  Show Complete List (Ctrl+Shift+F11)
                                </Box>
                                <Box sx={{ 
                                  padding: '5px 15px',
                                  backgroundColor: '#5bc0de',
                                  color: 'white',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  '&:hover': { backgroundColor: '#31b0d5' }
                                }}>
                                  Advanced Search (Ctrl+F11)
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', gap: '10px' }}>
                                <Box sx={{ 
                                  padding: '5px 15px',
                                  backgroundColor: '#f0ad4e',
                                  color: 'white',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  '&:hover': { backgroundColor: '#ec971f' }
                                }}>
                                  Clear Selections (Ctrl+F2)
                                </Box>
                                <Box sx={{ 
                                  padding: '5px 15px',
                                  backgroundColor: '#5cb85c',
                                  color: 'white',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                  '&:hover': { backgroundColor: '#449d44' }
                                }}>
                                  Show Selected Items Only (Ctrl+Shift+F12)
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      
                      {/* Bottom Tabs */}
                      <Box sx={{ 
                        display: 'flex',
                        backgroundColor: 'transparent',
                        position: 'relative',
                        zIndex: 2
                      }}>
                        <Box 
                          sx={{ 
                            padding: '5px 10px', 
                            backgroundColor: activeTab === 'Information' ? '#1976d2' : '#ffffff', 
                            cursor: 'pointer', 
                            borderRight: '1px solid #ccc',
                            borderTop: activeTab === 'Information' ? '1px solid #1976d2' : '1px solid #ccc',
                            borderLeft: '1px solid #ccc',
                            fontSize: '0.8rem', 
                            color: activeTab === 'Information' ? '#ffffff' : '#000000',
                            fontWeight: activeTab === 'Information' ? 'bold' : 'normal',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            position: 'relative',
                            bottom: '-1px',
                            marginLeft: '4px'
                          }}
                          onClick={() => setActiveTab('Information')}
                        >
                          Information
                        </Box>
                        <Box 
                          sx={{ 
                            padding: '5px 10px', 
                            backgroundColor: activeTab === 'Additional Information' ? '#1976d2' : '#ffffff', 
                            cursor: 'pointer', 
                            borderRight: '1px solid #ccc',
                            borderTop: activeTab === 'Additional Information' ? '1px solid #1976d2' : '1px solid #ccc',
                            borderLeft: activeTab === 'Additional Information' ? '1px solid #1976d2' : '1px solid #ccc',
                            fontSize: '0.8rem', 
                            color: activeTab === 'Additional Information' ? '#ffffff' : '#000000',
                            fontWeight: activeTab === 'Additional Information' ? 'bold' : 'normal',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            position: 'relative',
                            bottom: '-1px'
                          }}
                          onClick={() => setActiveTab('Additional Information')}
                        >
                          Additional Information
                        </Box>
                        <Box 
                          sx={{ 
                            padding: '5px 10px', 
                            backgroundColor: activeTab === 'Line Information' ? '#1976d2' : '#ffffff', 
                            cursor: 'pointer', 
                            borderRight: '1px solid #ccc',
                            borderTop: activeTab === 'Line Information' ? '1px solid #1976d2' : '1px solid #ccc',
                            borderLeft: activeTab === 'Line Information' ? '1px solid #1976d2' : '1px solid #ccc',
                            fontSize: '0.8rem', 
                            color: activeTab === 'Line Information' ? '#ffffff' : '#000000',
                            fontWeight: activeTab === 'Line Information' ? 'bold' : 'normal',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            position: 'relative',
                            bottom: '-1px'
                          }}
                          onClick={() => setActiveTab('Line Information')}
                        >
                          Line Information
                        </Box>
                        <Box 
                          sx={{ 
                            padding: '5px 10px', 
                            backgroundColor: activeTab === 'Item Characteristics' ? '#1976d2' : '#ffffff', 
                            cursor: 'pointer', 
                            borderRight: '1px solid #ccc',
                            borderTop: activeTab === 'Item Characteristics' ? '1px solid #1976d2' : '1px solid #ccc',
                            borderLeft: activeTab === 'Item Characteristics' ? '1px solid #1976d2' : '1px solid #ccc',
                            fontSize: '0.8rem', 
                            color: activeTab === 'Item Characteristics' ? '#ffffff' : '#000000',
                            fontWeight: activeTab === 'Item Characteristics' ? 'bold' : 'normal',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            position: 'relative',
                            bottom: '-1px'
                          }}
                          onClick={() => setActiveTab('Item Characteristics')}
                        >
                          Item Characteristics
                        </Box>
                        <Box 
                          sx={{ 
                            padding: '5px 10px', 
                            backgroundColor: activeTab === 'Options' ? '#1976d2' : '#ffffff', 
                            cursor: 'pointer',
                            borderRight: '1px solid #ccc',
                            borderTop: activeTab === 'Options' ? '1px solid #1976d2' : '1px solid #ccc',
                            borderLeft: activeTab === 'Options' ? '1px solid #1976d2' : '1px solid #ccc',
                            fontSize: '0.8rem', 
                            color: activeTab === 'Options' ? '#ffffff' : '#000000',
                            fontWeight: activeTab === 'Options' ? 'bold' : 'normal',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            position: 'relative',
                            bottom: '-1px'
                          }}
                          onClick={() => setActiveTab('Options')}
                        >
                          Options
                        </Box>
                      </Box>
                      
                      {/* Horizontal ribbon line */}
                      <Box sx={{ 
                        height: '3px', 
                        backgroundColor: '#1976d2', 
                        width: '100%', 
                        position: 'relative',
                        zIndex: 3,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}></Box>
                      
                      {/* Payment Options and Details Container */}
                      <Box sx={{ 
                        display: 'flex', 
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        backgroundColor: '#ffffff',
                        marginBottom: '40px', // Add margin to prevent overlap with footer
                        position: 'relative',
                        zIndex: 1
                      }}>
                        {activeTab === 'Information' && (
                          <Box sx={{ 
                            display: 'flex',
                            backgroundColor: '#ffffff',
                            flex: 1
                          }}>
                            {/* Main Information Tab Content - Left side */}
                            <Box sx={{ 
                              display: 'flex',
                              flexDirection: 'column',
                              padding: '5px',
                              width: '500px', // Increased width for the main area
                              height: '175px', // Set fixed height to match other tabs
                              overflow: 'hidden'
                            }}>
                              {/* First row of buttons */}
                              <Box sx={{ display: 'flex', marginBottom: '5px' }}>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #c8e6c9)', // Green gradient for Cash
                                  border: '1px solid #4caf50',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #a5d6a7)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Cash</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(F4)</Typography>
                                </Box>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #c8e6c9)', // Green gradient for Split Tender
                                  border: '1px solid #4caf50',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #a5d6a7)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Split Tender</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(Shift+F4)</Typography>
                                </Box>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Gratuity
                                  border: '1px solid #e91e63',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Gratuity</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(Ctrl+Shift+G)</Typography>
                                </Box>
                              </Box>
                              
                              {/* Second row of buttons */}
                              <Box sx={{ display: 'flex', marginBottom: '5px' }}>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #c8e6c9)', // Green gradient for Card
                                  border: '1px solid #4caf50',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #a5d6a7)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Card</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(F3)</Typography>
                                </Box>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #c8e6c9)', // Green gradient for Account
                                  border: '1px solid #4caf50',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #a5d6a7)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Account</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(F9)</Typography>
                                </Box>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #ffcdd2)', // Red gradient for Void Sale
                                  border: '1px solid #f44336',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #ef9a9a)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Void Sale</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(Ctrl+F9)</Typography>
                                </Box>
                              </Box>
                              
                              {/* Third row of buttons */}
                              <Box sx={{ display: 'flex' }}>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #c8e6c9)', // Green gradient for Pro-Forma
                                  border: '1px solid #4caf50',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #a5d6a7)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Pro-Forma</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(Ctrl+F2)</Typography>
                                </Box>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Customer
                                  border: '1px solid #e91e63',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Customer</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(Ctrl+Shift+C)</Typography>
                                </Box>
                                <Box sx={{ 
                                  width: '100px', 
                                  marginRight: '5px', 
                                  textAlign: 'center', 
                                  padding: '5px',
                                  borderRadius: '4px',
                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                  background: 'linear-gradient(to bottom, #ffffff, #d7ccc8)', // Brown gradient for Options
                                  border: '1px solid #795548',
                                  cursor: 'pointer',
                                  '&:hover': {
                                    background: 'linear-gradient(to bottom, #ffffff, #bcaaa4)'
                                  }
                                }}>
                                  <Typography sx={{ fontSize: '0.7rem', color: '#000000', fontWeight: 'bold' }}>Options</Typography>
                                  <Typography sx={{ fontSize: '0.6rem', color: '#000000' }}>(Shift+F1)</Typography>
                                </Box>
                              </Box>
                            </Box>
                            
                            {/* Item Details and Document Totals - Right side */}
                            <Box sx={{ 
                              display: 'flex',
                              flexDirection: 'column',
                              flex: 'none', // Change from flex:1 to flex:none to stop growing
                              width: '500px', // Fixed width for the details panel
                              height: '175px',
                              borderLeft: '1px solid #ccc',
                              marginLeft: 'auto' // Push to the right
                            }}>
                              <Box sx={{ 
                                display: 'flex', 
                                height: '100%'
                              }}>
                                {/* Item Details Section */}
                                <Box sx={{ 
                                  width: '250px', // Fixed width instead of flex:1
                                  borderRight: '1px solid #ccc',
                                  padding: '5px 10px',
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}>
                                  <Typography sx={{ 
                                    fontSize: '0.75rem', 
                                    fontWeight: 'bold', 
                                    color: '#FF0000', 
                                    borderBottom: '1px solid #ccc',
                                    textAlign: 'center',
                                    marginBottom: '8px'
                                  }}>
                                    Item Details
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Stock On Hand
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      {selectedProducts.length > 0 ? 
                                        productCatalog.find(p => p.code === selectedProducts[selectedProducts.length - 1].code)?.stockOnHand.toFixed(2) || '0.00' 
                                        : '0.00'}
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Bin Location
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      -
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Shelf Location
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      -
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Unit Cost Excl.
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      -
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Charge Quantity
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      -
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Dimensions
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      -
                                    </Typography>
                                  </Box>
                                </Box>
                                
                                {/* Document Totals Section */}
                                <Box sx={{ 
                                  width: '250px', // Fixed width instead of flex:1
                                  padding: '5px 10px',
                                  display: 'flex',
                                  flexDirection: 'column'
                                }}>
                                  <Typography sx={{ 
                                    fontSize: '0.75rem', 
                                    fontWeight: 'bold', 
                                    color: '#FF0000',
                                    borderBottom: '1px solid #ccc',
                                    textAlign: 'center',
                                    marginBottom: '8px'
                                  }}>
                                    Document Totals
                                  </Typography>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      V.A.T Amount
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      {vatAmount.toFixed(2)}
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Sub Total
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      {totalDue.toFixed(2)}
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Rounding
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      0.00
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Vouchers
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      0.00
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Deposit Collected
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      0.00
                                    </Typography>
                                  </Box>
                                  
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                      Total Due
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#000000' }}>
                                      {totalDue.toFixed(2)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                        
                        {activeTab === 'Additional Information' && (
                          <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffffff',
                            padding: '5px',
                            flex: 1,
                            height: '175px', // Set fixed height to match Information tab
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              display: 'grid', 
                              gridTemplateColumns: '1fr 1fr 1fr',
                              gap: '4px',
                              width: '100%'
                            }}>
                              {/* Left Column */}
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(to right, #e0e0e0, #ffffff)'
                              }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Customer Type</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}></Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>E-Mail Address</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}></Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Credit Limit</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0.00</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Document Date</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>N/A</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Total Items Selling</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Total Items Refunding</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Total Shipping Volume</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0m³</Box>
                            </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Total Shipping Weight</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0kg</Box>
                          </Box>
                              </Box>
                        
                              {/* Middle Column */}
                          <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                                background: 'linear-gradient(to right, #e0e0e0, #ffffff)'
                              }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Postal Address</Box>
                              </Box>
                                <Box sx={{ display: 'flex', height: '55px' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000' }}></Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Delivery Address</Box>
                              </Box>
                                <Box sx={{ display: 'flex', height: '55px' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000' }}></Box>
                                </Box>
                              </Box>

                              {/* Right Column */}
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(to right, #e0e0e0, #ffffff)'
                              }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Now Due</Box>
                                  <Box sx={{ flex: 1, padding: '4px', fontSize: '0.75rem', color: '#000000', textAlign: 'right' }}>0.00</Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Balance</Box>
                                  <Box sx={{ flex: 1, padding: '4px', fontSize: '0.75rem', color: '#000000', textAlign: 'right' }}>0.00</Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Arrears</Box>
                                  <Box sx={{ flex: 1, padding: '4px', fontSize: '0.75rem', color: '#000000', textAlign: 'right' }}>0.00</Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Deposit Available</Box>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Line Nett Exclusive</Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Line Total VAT</Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Line Total Exclusive</Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                        
                        {activeTab === 'Item Characteristics' && (
                          <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffffff',
                            padding: '5px',
                            flex: 1,
                            height: '175px', // Set fixed height to match other tabs
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%',
                              height: '100%'
                            }}>
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(to right, #e0e0e0, #ffffff)'
                              }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Pack Size</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Pack Description</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Allow Fractions</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Serial Item</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Carcass Item</Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ padding: '4px', fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>Meter Read Item</Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                        
                        {activeTab === 'Options' && (
                          <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffffff',
                            padding: '5px',
                            flex: 1,
                            height: '175px', // Set fixed height to match other tabs
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              display: 'grid',
                              gridTemplateColumns: 'repeat(5, auto)', // 5 columns for the grid
                              gridTemplateRows: 'auto',
                              gap: '2px',
                              justifyContent: 'start'
                            }}>
                              {/* Row 1 - 3 buttons on the left side, staircase on right */}
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Loyalty
                                border: '1px solid #e91e63',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                  Loyalty
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+U)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #d7ccc8)', // Brown gradient for Pay Out
                                border: '1px solid #795548',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #bcaaa4)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                  Pay Out
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+M)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Re-Print
                                border: '1px solid #e91e63',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                  Re-Print
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+P)
                                </Typography>
                              </Box>
                              <Box sx={{ width: '100px', height: '48px' }} /> {/* Empty space */}
                              <Box sx={{ width: '100px', height: '48px' }} /> {/* Empty space */}

                              {/* Row 2 - 4 buttons on the left, staircase on right */}
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Prepaid
                                border: '1px solid #e91e63',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                  Prepaid
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+B)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #d7ccc8)', // Brown gradient for Pay In
                                border: '1px solid #795548',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #bcaaa4)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                  Pay In
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+I)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Cash Drop
                                border: '1px solid #e91e63',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                  Cash Drop
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+F6)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #d7ccc8)', // Brown gradient for Query Branches
                                border: '1px solid #795548',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #bcaaa4)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold', textAlign: 'center' }}>
                                  Query Branches
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000', textAlign: 'center' }}>
                                  Stock Levels
                                </Typography>
                              </Box>
                              <Box sx={{ width: '100px', height: '48px' }} /> {/* Empty space */}
                        
                              {/* Row 3 - All 5 buttons (full row) */}
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Refund
                                border: '1px solid #e91e63',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold' }}>
                                  Refund
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Alt+Shift+R)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px',
                                background: 'linear-gradient(to bottom, #ffffff, #d7ccc8)', // Brown gradient for Receive Payments
                                border: '1px solid #795548',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #bcaaa4)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold', textAlign: 'center' }}>
                                  Receive Payments
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+F7)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Pay Supplier
                                border: '1px solid #e91e63',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold', textAlign: 'center' }}>
                                  Pay Supplier
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Ctrl+Shift+F5)
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #d7ccc8)', // Brown gradient for Manage OL Service
                                border: '1px solid #795548',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #bcaaa4)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold', textAlign: 'center' }}>
                                  Manage OL Service
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                padding: '5px', 
                                background: 'linear-gradient(to bottom, #ffffff, #f8bbd0)', // Pink gradient for Selling History
                                border: '1px solid #e91e63',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: '100px',
                                height: '48px',
                                margin: '1px',
                                '&:hover': {
                                  background: 'linear-gradient(to bottom, #ffffff, #f48fb1)'
                                }
                              }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#000000', fontWeight: 'bold', textAlign: 'center' }}>
                                  Selling History
                                </Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#000000' }}>
                                  (Alt+Shift+I)
                                </Typography>
                              </Box>
                            </Box>
                            
                            {/* Hidden row 4 */}
                            <Box sx={{ 
                              display: 'none', /* Keep this hidden */
                              gridTemplateColumns: 'repeat(4, auto)',
                              gridTemplateRows: 'auto',
                              gap: '2px',
                              justifyContent: 'start',
                              marginTop: '2px'
                            }}>
                            {/* Hidden content */}
                            </Box>
                          </Box>
                        )}
                        
                        {activeTab === 'Line Information' && (
                          <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: '#ffffff',
                            padding: '5px',
                            flex: 1,
                            height: '175px', // Set fixed height to match other tabs
                            overflow: 'hidden'
                          }}>
                            <Box sx={{ 
                              display: 'grid', 
                              gridTemplateColumns: '1fr 1fr 1fr',
                              gap: '4px',
                              width: '100%'
                            }}>
                              {/* Left Column */}
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(to right, #e0e0e0, #ffffff)'
                              }}>
                              <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Quantity Weight</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0.00</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Stock On Hand Total</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0.00</Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Line Total VAT</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>
                                    {selectedProducts.length > 0 ? 
                                     (selectedProducts[selectedProducts.length - 1].lineTotal * 0.15).toFixed(2) 
                                     : '0.00'}
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Line Total Incl. VAT</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>
                                    {selectedProducts.length > 0 ? 
                                     selectedProducts[selectedProducts.length - 1].lineTotal.toFixed(2) 
                                     : '0.00'}
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Line Nett V.A.T</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>
                                    {selectedProducts.length > 0 ? 
                                     (selectedProducts[selectedProducts.length - 1].lineTotal * 0.15).toFixed(2) 
                                     : '0.00'}
                                  </Box>
                            </Box>
                          </Box>
                          
                              {/* Middle Column */}
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(to right, #e0e0e0, #ffffff)'
                              }}>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Pack Size</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>0.00</Box>
                            </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Pack Description</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Current Shelf Location</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Offer Started On</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Offer Ending On</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                              </Box>
                              </Box>
                              
                              {/* Right Column */}
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(to right, #e0e0e0, #ffffff)'
                              }}>
                              <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Measurement Unit</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                              </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Purchase Unit</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                            </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Selling Unit</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                          </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Base Unit</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                        </Box>
                                <Box sx={{ display: 'flex' }}>
                                  <Box sx={{ width: '140px', padding: '2px 4px', fontSize: '0.65rem', color: '#000000', fontWeight: 'bold' }}>Volume Unit</Box>
                                  <Box sx={{ flex: 1, padding: '2px 4px', fontSize: '0.65rem', color: '#000000' }}>-</Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>

                      {/* Footer Status Bar for invoicing screen */}
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
                        color: '#000000',
                        fontSize: '0.75rem',
                        borderTop: '1px solid #ccc',
                        zIndex: 1
                      }}>
                        <Box sx={{ fontWeight: 600 }}>User logged on is : Smart Trade (Administrators)</Box>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Box sx={{ fontWeight: 600 }}>License will expire within 308 days...</Box>
                        <Box sx={{ width: 20 }}></Box>
                        <Box sx={{ fontWeight: 600 }}>Location: Main Location</Box>
                        <Box sx={{ width: 20 }}></Box>
                        <Box sx={{ fontWeight: 600 }}>Support Number: <Box component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>C9001-60076</Box></Box>
                      </Box>
                    </Box>
                  </Box>
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
                    
                    {/* Help Tooltip */}
                    <Box sx={{ position: 'absolute', top: 100, right: 50, zIndex: 1200 }}>
                      <Tooltip
                        title="Click Documents menu > Invoicing to begin. Add products with '...' button. Press F9 to remove products. Click on Quantity or Discount % fields to modify them."
                        arrow
                        placement="left"
                      >
                        <IconButton
                          sx={{
                            backgroundColor: 'rgba(0, 119, 190, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(0, 119, 190, 0.2)' },
                          }}
                        >
                          <HelpOutlineIcon sx={{ color: '#0077be' }} />
                        </IconButton>
                      </Tooltip>
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
                    
                    {/* Footer Status Bar for demo home screen */}
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
                      color: '#000000',
                      fontSize: '0.75rem',
                      borderTop: '1px solid #ccc',
                      zIndex: 1
                    }}>
                      <Box sx={{ fontWeight: 600 }}>User logged on is : Smart Trade (Administrators)</Box>
                      <Box sx={{ flexGrow: 1 }}></Box>
                      <Box sx={{ fontWeight: 600 }}>License will expire within 308 days...</Box>
                      <Box sx={{ width: 20 }}></Box>
                      <Box sx={{ fontWeight: 600 }}>Location: Main Location</Box>
                      <Box sx={{ width: 20 }}></Box>
                      <Box sx={{ fontWeight: 600 }}>Support Number: <Box component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>C9001-60076</Box></Box>
                    </Box>
                  </>
                )}
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
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
            paddingTop: 5
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
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
            paddingTop: 5
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

      {/* Lightbox for images */}
      {lightboxOpen && (
        <Box sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }} onClick={closeLightbox}>
          <Box 
            component="img" 
            src={lightboxImage} 
            sx={{ 
              maxWidth: '90%', 
              maxHeight: '90%',
              boxShadow: '0 0 24px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </Box>
      )}
    </Box>
  );
};

export default Software;
