import React, { useState, useEffect, useCallback } from 'react';
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
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
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
  const [isUsingFallbackData, setIsUsingFallbackData] = useState(false);

  // Use News API
  const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || '496ac9196f36477fbd1e73cae4d4ecdc';

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setIsUsingFallbackData(false);

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=${NEWS_API_KEY}`
      );

      if (!response.ok) {
        console.error('News API error:', response.status, response.statusText);
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 'ok' || !data.articles || data.articles.length === 0) {
        throw new Error('No articles returned from the API');
      }
      
      // Map the articles to match our NewsArticle interface
      // Assign random categories for demonstration
      const categories = ['Computers', 'Mobile', 'Internet', 'AI', 'Gadgets'];
      
      const articles = data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
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
      
      // Use fallback data instead of showing error
      // Define fallback data inside the callback to avoid dependency changes
      const fallbackNews: NewsArticle[] = [
        {
          title: "The Future of Artificial Intelligence in Healthcare",
          description: "How AI is revolutionizing diagnostics, treatment plans, and patient care across the healthcare industry.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          publishedAt: new Date().toISOString(),
          source: { name: "Tech Insights" },
          category: "AI"
        },
        {
          title: "New MacBook Pro Features Revolutionary Chip Architecture",
          description: "Apple's latest MacBook Pro models showcase incredible performance gains with the newest generation of silicon.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", 
          publishedAt: new Date().toISOString(),
          source: { name: "Apple Insider" },
          category: "Computers"
        },
        {
          title: "5G Deployment Accelerates Globally",
          description: "Telecom companies are rapidly expanding 5G coverage, promising faster speeds and lower latency for mobile users.",
          url: "#",
          urlToImage: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          publishedAt: new Date().toISOString(),
          source: { name: "Mobile World" },
          category: "Mobile"
        }
      ];
      
      setNewsArticles(fallbackNews);
      setIsUsingFallbackData(true);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, [NEWS_API_KEY]); // Remove fallbackNews from dependencies

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount, not when fetchNews changes

  // Set up auto-refresh every 3 hours
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refreshing news...');
      fetchNews();
    }, 3 * 60 * 60 * 1000); // 3 hours in milliseconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only set up the interval once on mount

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
        {/* Last Updated Info */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {isUsingFallbackData && (
              <Chip 
                label="Using demo content" 
                size="small" 
                color="warning" 
                sx={{ mr: 2 }} 
              />
            )}
          </Typography>
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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <ErrorOutlineIcon color="error" fontSize="large" />
            <Typography variant="h6" color="error">
              {error}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip
                label="Try Again"
                clickable
                color="primary"
                onClick={() => fetchNews()}
                sx={{
                  borderRadius: '16px',
                  px: 2,
                  py: 0.5,
                  '&.MuiChip-colorPrimary': {
                    background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                  },
                }}
              />
            </Box>
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
      </Container>
    </Box>
  );
};

export default Blog; 