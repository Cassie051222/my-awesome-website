import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  InputAdornment,
  Chip,
  Grid,
  Paper,
  CircularProgress,
  useTheme,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  alpha,
  Dialog
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
}

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`faq-tabpanel-${index}`}
      aria-labelledby={`faq-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Add dialogStyle constant for future Dialog components
const dialogStyle = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    paddingTop: 5
  }
};

const FAQ = () => {
  const theme = useTheme();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | false>(false);
  const [tabValue, setTabValue] = useState(0);

  // Fetch FAQs from Firebase
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const faqQuery = query(collection(db, 'faqs'));
        const snapshot = await getDocs(faqQuery);
        
        if (snapshot.empty) {
          setFaqs([]);
          setFilteredFaqs([]);
          setCategories([]);
        } else {
          const fetchedFaqs = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() } as FAQ;
          });
          
          // Debug log
          console.log('Fetched FAQs:', fetchedFaqs);
          
          // Extract unique categories
          const uniqueCategories = Array.from(new Set(fetchedFaqs.map(faq => faq.category)));
          
          setFaqs(fetchedFaqs);
          setFilteredFaqs(fetchedFaqs);
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Filter FAQs based on search term and selected category
  useEffect(() => {
    let result = faqs;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        faq => 
          faq.question.toLowerCase().includes(term) || 
          faq.answer.toLowerCase().includes(term)
      );
    }
    
    // Filter by category if we're not using the tab interface
    if (selectedCategory && tabValue === 0) {
      result = result.filter(faq => faq.category === selectedCategory);
    }
    
    setFilteredFaqs(result);
  }, [searchTerm, selectedCategory, faqs, tabValue]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFaq(isExpanded ? panel : false);
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSelectedCategory(null);
  };

  // Group FAQs by category
  const getFaqsByCategory = (category: string) => {
    return faqs.filter(faq => faq.category === category);
  };

  // Get category-specific FAQs when tab changes
  useEffect(() => {
    if (tabValue > 0 && categories.length > 0) {
      const categoryFaqs = getFaqsByCategory(categories[tabValue - 1]);
      setFilteredFaqs(categoryFaqs);
    } else if (tabValue === 0) {
      setFilteredFaqs(faqs);
    }
  }, [tabValue, categories, faqs]);

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a237e 0%, #283593 100%)'
            : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: 10,
          mb: 6,
          borderRadius: { xs: 0, md: 2 },
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 10px 40px rgba(0,0,0,0.3)' 
            : '0 10px 40px rgba(0,0,0,0.1)'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: {xs: 'column', md: 'row'},
              alignItems: 'center',
              gap: 4
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Frequently Asked Questions
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ 
                    mb: 4,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Find answers to common questions about our products, services, and support options
                </Typography>
              </Box>
              <Box sx={{ 
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <HelpOutlineIcon sx={{ fontSize: 180, opacity: 0.15 }} />
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1E1E1E, #2D2D2D)' 
              : 'white',
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 4px 20px rgba(0,0,0,0.3)' 
              : '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
            Looking for something specific?
          </Typography>
          <TextField
            fullWidth
            placeholder="Search for questions or keywords..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ width: '100%', mb: 2 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 500,
                  minWidth: 100,
                  fontSize: '0.95rem'
                },
                '& .Mui-selected': {
                  color: theme.palette.primary.main,
                }
              }}
            >
              <Tab label="All Categories" />
              {categories.map(category => (
                <Tab key={category} label={category} />
              ))}
            </Tabs>
          </Box>
        </Paper>

        {/* FAQ Content */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8, flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={60} thickness={4} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>Loading FAQs...</Typography>
          </Box>
        ) : error ? (
          <Card sx={{ 
            textAlign: 'center', 
            my: 4, 
            p: 4, 
            borderRadius: 3,
            borderLeft: `4px solid ${theme.palette.error.main}`
          }}>
            <Typography color="error" variant="h6">
              {error}
            </Typography>
          </Card>
        ) : filteredFaqs.length === 0 ? (
          <Card sx={{ 
            textAlign: 'center', 
            my: 4, 
            p: 4, 
            borderRadius: 3,
            background: alpha(theme.palette.primary.main, 0.05),
            border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
                No FAQs found matching your search criteria.
              </Typography>
              <Typography color="text.secondary">
                Try adjusting your search terms or selecting a different category.
              </Typography>
            </motion.div>
          </Card>
        ) : (
          <TabPanel value={tabValue} index={tabValue}>
            <Grid container spacing={3}>
              {filteredFaqs.map((faq, index) => (
                <Grid item xs={12} key={faq.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      elevation={expandedFaq === faq.id ? 4 : 1}
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        border: '1px solid',
                        borderColor: expandedFaq === faq.id 
                          ? theme.palette.primary.main 
                          : theme.palette.mode === 'dark'
                            ? 'transparent'
                            : theme.palette.grey[200],
                        '&:hover': {
                          boxShadow: expandedFaq !== faq.id ? '0 4px 12px rgba(0,0,0,0.08)' : ''
                        }
                      }}
                    >
                      <Accordion
                        expanded={expandedFaq === faq.id}
                        onChange={handleAccordionChange(faq.id)}
                        disableGutters
                        elevation={0}
                        sx={{
                          '&.MuiAccordion-root:before': {
                            display: 'none',
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon 
                              sx={{ 
                                transition: 'transform 0.3s',
                                transform: expandedFaq === faq.id ? 'rotate(180deg)' : 'rotate(0)',
                              }} 
                            />
                          }
                          aria-controls={`panel-${faq.id}-content`}
                          id={`panel-${faq.id}-header`}
                          sx={{
                            px: 3,
                            py: 2,
                            background: expandedFaq === faq.id 
                              ? alpha(theme.palette.primary.main, 0.05)
                              : 'transparent',
                            '&:hover': {
                              background: expandedFaq !== faq.id 
                                ? theme.palette.mode === 'dark'
                                  ? alpha(theme.palette.primary.main, 0.03)
                                  : alpha(theme.palette.primary.main, 0.03)
                                : alpha(theme.palette.primary.main, 0.05)
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                fontWeight: expandedFaq === faq.id ? 'bold' : 'medium',
                                color: expandedFaq === faq.id ? theme.palette.primary.main : 'text.primary',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              {faq.question}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <Divider sx={{ mx: 3 }} />
                        <AccordionDetails sx={{ p: 3 }}>
                          <CardContent sx={{ px: 1, pt: 1, pb: '16px !important' }}>
                            <Typography 
                              variant="body1" 
                              color="text.secondary"
                              sx={{ lineHeight: 1.7 }}
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                              <Chip 
                                label={faq.category} 
                                size="small" 
                                color="primary"
                                variant="outlined"
                                sx={{ 
                                  fontWeight: 'medium',
                                  borderRadius: '16px',
                                  py: 0.5
                                }}
                              />
                              <Typography variant="caption" color="text.disabled">
                                FAQ #{index + 1}
                              </Typography>
                            </Box>
                          </CardContent>
                        </AccordionDetails>
                      </Accordion>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        )}
      </Container>
    </Box>
  );
};

export default FAQ; 