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
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

const FAQ = () => {
  const theme = useTheme();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQ[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch FAQs from Firebase
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const faqQuery = query(collection(db, 'faqs'), orderBy('order', 'asc'));
        const snapshot = await getDocs(faqQuery);
        
        if (snapshot.empty) {
          setFaqs([]);
          setFilteredFaqs([]);
          setCategories([]);
        } else {
          const fetchedFaqs = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() } as FAQ;
          });
          
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
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(faq => faq.category === selectedCategory);
    }
    
    setFilteredFaqs(result);
  }, [searchTerm, selectedCategory, faqs]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ 
                mb: 4,
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Find answers to common questions about our products, services, and support options
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Search */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' 
              : 'white'
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for questions or keywords..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Categories */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => handleCategoryClick(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                sx={{ 
                  borderRadius: '16px',
                  '&.MuiChip-colorPrimary': {
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                  }
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* FAQ Content */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: 'center', my: 4 }}>
            {error}
          </Typography>
        ) : filteredFaqs.length === 0 ? (
          <Typography sx={{ textAlign: 'center', my: 4 }}>
            No FAQs found matching your search criteria.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredFaqs.map((faq) => (
              <Grid item xs={12} key={faq.id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${faq.id}-content`}
                    id={`panel-${faq.id}-header`}
                  >
                    <Typography variant="subtitle1" fontWeight="medium">
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                    <Chip 
                      label={faq.category} 
                      size="small" 
                      variant="outlined"
                      sx={{ mt: 2 }}
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FAQ; 