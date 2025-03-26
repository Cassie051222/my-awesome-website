import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  CircularProgress,
  Divider,
  useTheme,
  Link
} from '@mui/material';
import { motion } from 'framer-motion';
import TechIcon from '@mui/icons-material/Memory';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LanguageIcon from '@mui/icons-material/Language';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
}

const Blog: React.FC = () => {
  const theme = useTheme();
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Use Gnews API instead (free tier)
  const GNEWS_API_KEY = '9f20c31a8fc16488e21c9d47a81d7d39';

  // Categories for tech news
  const categories = [
    { name: 'All', icon: <TechIcon /> },
    { name: 'Computers', icon: <ComputerIcon /> },
    { name: 'Mobile', icon: <PhoneAndroidIcon /> },
    { name: 'Internet', icon: <LanguageIcon /> }
  ];

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&max=10&apikey=${GNEWS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      
      // Map the articles to match our NewsArticle interface
      // Assign random categories for demonstration
      const categories = ['Computers', 'Mobile', 'Internet', 'AI', 'Gadgets'];
      
      const articles = data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        publishedAt: article.publishedAt,
        source: {
          name: article.source.name
        },
        category: categories[Math.floor(Math.random() * categories.length)]
      }));

      setNewsArticles(articles);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error fetching news:", err);
      setError('Failed to load latest tech news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to format date in a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Set up auto-refresh every 3 hours
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing news...');
      fetchNews();
    }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

    return () => clearInterval(interval);
  }, []);

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
              Latest Tech News
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
              Stay updated with the latest news and trends in technology
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Category Filters */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {categories.map((category) => (
              <Chip
                key={category.name}
                icon={category.icon}
                label={category.name}
                clickable
                color={category.name === 'All' ? 'primary' : 'default'}
                variant={category.name === 'All' ? 'filled' : 'outlined'}
                sx={{
                  borderRadius: '16px',
                  '&.MuiChip-colorPrimary': {
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                  },
                  px: 2,
                  py: 0.5
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Last Updated Info */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {lastUpdated.toLocaleString()}
          </Typography>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
            <CircularProgress sx={{ color: '#FF6B00' }} />
          </Box>
        )}

        {/* Error State */}
        {error && (
          <Box sx={{ 
            textAlign: 'center', 
            py: 6,
            px: 3,
            border: '1px solid',
            borderColor: 'error.main',
            borderRadius: 2,
            bgcolor: 'error.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <ErrorOutlineIcon color="error" fontSize="large" />
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        )}

        {/* News Articles */}
        {!loading && !error && (
          <>
            {/* Featured Article (first article) */}
            {newsArticles.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Card 
                  sx={{ 
                    borderRadius: 4,
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardActionArea component="a" href={newsArticles[0].url} target="_blank" rel="noopener noreferrer">
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="400"
                        image={newsArticles[0].urlToImage}
                        alt={newsArticles[0].title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <Box 
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                          p: 3,
                          pt: 8
                        }}
                      >
                        <Chip 
                          label="Featured" 
                          size="small" 
                          sx={{ 
                            bgcolor: '#FF6B00', 
                            color: 'white',
                            mb: 2,
                            fontWeight: 'bold'
                          }} 
                        />
                        <Typography variant="h4" component="div" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                          {newsArticles[0].title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ color: 'white' }}>
                            {newsArticles[0].source.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'white' }}>
                            {formatDate(newsArticles[0].publishedAt)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Box>
            )}

            {/* Rest of the Articles */}
            <Grid container spacing={4}>
              {newsArticles.slice(1).map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,
                      },
                      borderRadius: 3
                    }}
                  >
                    <CardActionArea 
                      component="a" 
                      href={article.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        image={article.urlToImage}
                        alt={article.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Chip 
                            label={article.category} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(255, 107, 0, 0.1)', 
                              color: '#FF6B00',
                              fontSize: '0.75rem',
                            }} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(article.publishedAt)}
                          </Typography>
                        </Box>
                        <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 'medium', lineHeight: 1.3 }}>
                          {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {article.description?.substring(0, 120)}
                          {article.description?.length > 120 ? '...' : ''}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="caption" color="text.secondary" fontWeight="medium">
                          Source: {article.source.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Empty State */}
            {newsArticles.length === 0 && !loading && !error && (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6">
                  No articles available at the moment. Please check back later.
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* API Attribution */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            News provided by various sources via News API
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Auto-updating every 3 hours
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Blog; 