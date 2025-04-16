import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, useTheme, Card, CardContent, Accordion, AccordionSummary, AccordionDetails, Dialog } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { motion } from 'framer-motion';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import HandymanIcon from '@mui/icons-material/Handyman';

// Add dialogStyle constant for future Dialog components
const dialogStyle = {
  "& .MuiDialog-container": {
    alignItems: "flex-start",
    paddingTop: 5
  }
};

const Warranty = () => {
  const theme = useTheme();

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
              Technical Support Information
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
              24/7 Technical Support and Repair Services
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Important Notice */}
          <Grid item xs={12}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                mb: 4, 
                borderRadius: 2,
                bgcolor: 'error.light',
                border: '1px solid',
                borderColor: 'error.main'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <WarningIcon sx={{ fontSize: 40, color: 'error.dark', mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ color: 'error.dark', fontWeight: 'bold' }}>
                    Important Warranty Notice
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'error.dark' }}>
                    Smart-Trade does not provide warranty coverage on products. Any manufacturer warranties must be claimed directly from the product manufacturer. Instead, we offer flexible technical support and repair services to assist with any product issues you may encounter.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Support Services Overview */}
          <Grid item xs={12}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                mb: 4, 
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Our Support Services
              </Typography>

              <Typography variant="body1" paragraph>
                While we don't offer warranties, we provide comprehensive technical support and repair services to ensure your technology keeps running smoothly:
              </Typography>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    border: '1px solid', 
                    borderColor: 'divider', 
                    borderRadius: 2,
                    height: '100%',
                    background: 'rgba(255, 107, 0, 0.05)',
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SupportAgentIcon sx={{ fontSize: 40, color: '#FF6B00', mr: 2 }} />
                      <Typography variant="h5">24/7 Technical Support</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      Our technical support team is available around the clock to help with any issues:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body2">
                          <strong>Remote Diagnostics:</strong> Online troubleshooting
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Setup Assistance:</strong> Help with installation and configuration
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Software Issues:</strong> Assistance with software-related problems
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Emergency Support:</strong> Available even on holidays and weekends
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    border: '1px solid', 
                    borderColor: 'divider', 
                    borderRadius: 2,
                    height: '100%'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <HandymanIcon sx={{ fontSize: 40, color: '#FF6B00', mr: 2 }} />
                      <Typography variant="h5">Repair Services</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      We offer reliable repair services for products purchased from us:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body2">
                          <strong>Hardware Repairs:</strong> Fix physical damage or component failure
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Data Recovery:</strong> Assistance recovering important data
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>System Restoration:</strong> Get your device back to working condition
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Occasional Replacements:</strong> Case-by-case basis for unrepairable items
                        </Typography>
                      </li>
                    </ul>
                    <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                      All repair services are quoted separately based on the issue severity and parts required.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    border: '1px solid', 
                    borderColor: 'divider', 
                    borderRadius: 2,
                    height: '100%'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SettingsIcon sx={{ fontSize: 40, color: '#FF6B00', mr: 2 }} />
                      <Typography variant="h5">Returns Process</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      If your product requires repair:
                    </Typography>
                    <ul>
                      <li>
                        <Typography variant="body2">
                          <strong>Contact Us:</strong> Notify our support team about the issue
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Return for Repair:</strong> Ship or bring the item to our service center
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Diagnosis & Quote:</strong> We'll assess the problem and provide a repair quote
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body2">
                          <strong>Repair or Replace:</strong> Based on the assessment, we'll fix it or discuss replacement options
                        </Typography>
                      </li>
                    </ul>
                    <Typography variant="body2" sx={{ mt: 2, color: 'error.main' }}>
                      Note: Customer is responsible for all shipping costs.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Technical Support Process */}
          <Grid item xs={12}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                mb: 4, 
                borderRadius: 2 
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                How to Get Technical Support
              </Typography>

              <Typography variant="body1" paragraph>
                Our support process is designed to get you back up and running as quickly as possible:
              </Typography>

              <Timeline position="alternate" sx={{ mb: 4 }}>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: '#FF6B00' }}>
                      <InfoIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      Contact Support
                    </Typography>
                    <Typography>Reach out via phone, email, or live chat 24/7</Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: '#FF6B00' }}>
                      <SupportAgentIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      Remote Diagnostics
                    </Typography>
                    <Typography>Our technicians will attempt to resolve issues remotely</Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: '#FF6B00' }}>
                      <BuildIcon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      Return for Repair
                    </Typography>
                    <Typography>If needed, send the product in for repair service</Typography>
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot sx={{ bgcolor: '#FF6B00' }}>
                      <HandymanIcon />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      Resolution
                    </Typography>
                    <Typography>Get your repaired product back or explore replacement options</Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Technical Support Contact Information
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          24/7 Support Hotline
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Our technical experts are available anytime, day or night.
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          Phone: 083 334 1547
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', bgcolor: 'rgba(255, 107, 0, 0.05)' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Email Support
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Send us details about your issue for prompt assistance.
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          Email: office@smart-trade.biz
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Business Hours for In-Person Service:
                </Typography>
                <Typography variant="body2">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Sunday: Closed for in-person visits (remote support still available)
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Address: 35 Ellenberger Street, Wilgehof, Bloemfontein, 9301
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Warranty; 