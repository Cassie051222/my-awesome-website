import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  TextField,
  useTheme,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import VerifiedIcon from '@mui/icons-material/Verified';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

// Sample job listings
const jobListings = [
  {
    id: 1,
    title: 'Technical Support Specialist',
    department: 'Support',
    location: 'Bloemfontein',
    type: 'Full-time',
    description: 'We are looking for a Technical Support Specialist to provide excellent customer service and technical assistance to our clients. The ideal candidate will have strong problem-solving skills and experience with computer hardware, software, and networking.',
    responsibilities: [
      'Respond to customer inquiries via phone, email, and in person',
      'Troubleshoot hardware and software issues',
      'Perform basic computer repairs and maintenance',
      'Install and configure operating systems and applications',
      'Document support interactions and maintain knowledge base',
      'Escalate complex issues to senior technical staff when needed'
    ],
    qualifications: [
      'Diploma or degree in IT, Computer Science, or related field',
      'At least 1 year of experience in technical support or IT helpdesk',
      'Strong knowledge of Windows and Linux operating systems',
      'Excellent communication and customer service skills',
      'Ability to explain technical concepts in easy-to-understand terms',
      'A+ Certification preferred'
    ]
  },
  {
    id: 2,
    title: 'Sales Consultant',
    department: 'Sales',
    location: 'Bloemfontein',
    type: 'Full-time',
    description: 'We are seeking a motivated Sales Consultant to join our retail team. The successful candidate will be responsible for driving sales by providing exceptional customer service and product knowledge to clients visiting our store.',
    responsibilities: [
      'Engage with customers to understand their needs and recommend appropriate products',
      'Demonstrate products and explain features and benefits',
      'Process sales transactions and maintain accurate records',
      'Stay up-to-date with product knowledge and industry trends',
      'Meet sales targets and contribute to team goals',
      'Assist with inventory management and store displays'
    ],
    qualifications: [
      'Matric certificate required; tertiary qualification advantageous',
      'Previous retail or sales experience, preferably in technology or electronics',
      'Strong communication and interpersonal skills',
      'Basic knowledge of computers and technology products',
      'Results-driven with a customer-first mindset',
      'Ability to work flexible hours including weekends'
    ]
  },
  {
    id: 3,
    title: 'Network Technician',
    department: 'Technical',
    location: 'Bloemfontein',
    type: 'Full-time',
    description: 'We are looking for a skilled Network Technician to install, configure, and maintain network systems for our business clients. The ideal candidate will have strong technical knowledge and excellent problem-solving abilities.',
    responsibilities: [
      'Install and configure networking equipment (routers, switches, firewalls)',
      'Set up and maintain local area networks (LANs) and wide area networks (WANs)',
      'Troubleshoot and resolve network connectivity issues',
      'Implement security measures and monitor network performance',
      'Perform regular network maintenance and upgrades',
      'Provide technical support to clients and document network configurations'
    ],
    qualifications: [
      'Diploma or degree in IT, Computer Science, or related field',
      'Minimum 2 years experience in network administration or support',
      'Cisco CCNA certification or equivalent',
      'Strong knowledge of networking protocols and technologies',
      'Experience with VPNs, VLAN configuration, and network security',
      'Valid driver\'s license and willingness to travel to client sites'
    ]
  },
];

const Careers = () => {
  const theme = useTheme();
  const [openJobId, setOpenJobId] = useState<number | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    heardFrom: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    resume: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleAccordionChange = (jobId: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setOpenJobId(isExpanded ? jobId : null);
  };

  const handleApplyClick = (jobId: number) => {
    setCurrentJobId(jobId);
    setApplyDialogOpen(true);
  };

  const handleCloseApplyDialog = () => {
    setApplyDialogOpen(false);
    setCurrentJobId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        resume: e.target.files[0],
      });
    }
  };

  const validateForm = () => {
    const errors = {
      firstName: formData.firstName.trim() === '',
      lastName: formData.lastName.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: formData.phone.trim() === '',
      resume: !formData.resume,
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would submit the form data to a server here
      console.log('Form submitted:', formData);
      
      setSnackbar({
        open: true,
        message: 'Your application has been submitted successfully!',
        severity: 'success',
      });
      
      handleCloseApplyDialog();
      
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        heardFrom: '',
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const currentJob = jobListings.find(job => job.id === currentJobId);

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
              Join Our Team
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
              Build your career with Smart-Trade, where innovation meets opportunity
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Working at Smart-Trade */}
          <Grid item xs={12}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                mb: 4, 
                borderRadius: 2,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' 
                  : 'white'
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Why Work With Us
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="body1" paragraph>
                      At Smart-Trade, we believe in empowering our team members to grow professionally and personally. We foster a culture of innovation, collaboration, and continuous learning. As a growing technology company in South Africa, we offer exciting opportunities to work with cutting-edge technologies and serve diverse customers across the country.
                    </Typography>
                    <Typography variant="body1">
                      Our team is made up of passionate professionals who are committed to excellence and customer satisfaction. We value diversity and create an inclusive environment where different perspectives are welcomed and respected.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box 
                    component="img" 
                    src="/images/team.jpg" 
                    alt="Smart-Trade Team" 
                    sx={{ 
                      width: '100%', 
                      borderRadius: 2,
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Grid>
              </Grid>

              <Typography variant="h5" gutterBottom sx={{ mt: 6, mb: 3 }}>
                Benefits & Perks
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AccountBalanceWalletIcon sx={{ color: '#FF6B00', fontSize: 28, mr: 1 }} />
                        <Typography variant="h6">Competitive Salary</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        We offer competitive compensation packages that recognize your skills, experience, and contributions to our success.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', bgcolor: 'rgba(255, 107, 0, 0.05)' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <SchoolIcon sx={{ color: '#FF6B00', fontSize: 28, mr: 1 }} />
                        <Typography variant="h6">Learning & Development</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        We support your growth with training opportunities, certification programs, and clear career advancement paths.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <HealthAndSafetyIcon sx={{ color: '#FF6B00', fontSize: 28, mr: 1 }} />
                        <Typography variant="h6">Health & Wellness</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Your wellbeing matters to us. We offer medical aid contributions and promote a healthy work-life balance.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <VerifiedIcon sx={{ color: '#FF6B00', fontSize: 28, mr: 1 }} />
                        <Typography variant="h6">Employee Discounts</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Enjoy special pricing on our products and services, keeping you equipped with the latest technology.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', bgcolor: 'rgba(255, 107, 0, 0.05)' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <PeopleIcon sx={{ color: '#FF6B00', fontSize: 28, mr: 1 }} />
                        <Typography variant="h6">Team Culture</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Join a collaborative team that celebrates successes together through team events, recognition programs, and a positive work environment.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <WorkIcon sx={{ color: '#FF6B00', fontSize: 28, mr: 1 }} />
                        <Typography variant="h6">Work Flexibility</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        We understand the importance of flexibility in today's world, with options for remote work where role appropriate.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Open Positions */}
          <Grid item xs={12}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                borderRadius: 2
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
                Open Positions
              </Typography>

              {jobListings.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                  There are currently no open positions. Please check back later or send your CV to careers@smart-trade.biz for future opportunities.
                </Typography>
              ) : (
                <Box>
                  {jobListings.map((job) => (
                    <Accordion 
                      key={job.id} 
                      expanded={openJobId === job.id}
                      onChange={handleAccordionChange(job.id)}
                      sx={{ 
                        mb: 2, 
                        border: '1px solid', 
                        borderColor: 'divider',
                        '&:before': {
                          display: 'none',
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${job.id}-content`}
                        id={`panel${job.id}-header`}
                      >
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, width: '100%' }}>
                          <Typography variant="h6" sx={{ flexGrow: 1 }}>{job.title}</Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
                            <Chip 
                              label={job.department} 
                              size="small" 
                              sx={{ 
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 107, 0, 0.1)', 
                                color: '#FF6B00' 
                              }} 
                            />
                            <Chip 
                              label={job.location} 
                              size="small" 
                              variant="outlined" 
                            />
                            <Chip 
                              label={job.type} 
                              size="small" 
                              variant="outlined" 
                            />
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body1" paragraph>
                          {job.description}
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                          Responsibilities:
                        </Typography>
                        <ul>
                          {job.responsibilities.map((responsibility, index) => (
                            <li key={index}>
                              <Typography variant="body2" paragraph>
                                {responsibility}
                              </Typography>
                            </li>
                          ))}
                        </ul>

                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                          Qualifications:
                        </Typography>
                        <ul>
                          {job.qualifications.map((qualification, index) => (
                            <li key={index}>
                              <Typography variant="body2" paragraph>
                                {qualification}
                              </Typography>
                            </li>
                          ))}
                        </ul>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                          <Button 
                            variant="contained" 
                            onClick={() => handleApplyClick(job.id)}
                            sx={{
                              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
                              '&:hover': {
                                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
                              },
                            }}
                          >
                            Apply Now
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom>
                  Don't see a position that matches your skills?
                </Typography>
                <Typography variant="body1" paragraph>
                  We're always looking for talented individuals to join our team. Send your CV to careers@smart-trade.biz and tell us how you can contribute to Smart-Trade.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Application Dialog */}
      <Dialog 
        open={applyDialogOpen} 
        onClose={handleCloseApplyDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Apply for {currentJob?.title}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={formErrors.firstName}
                  helperText={formErrors.firstName ? 'First name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={formErrors.lastName}
                  helperText={formErrors.lastName ? 'Last name is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={formErrors.email}
                  helperText={formErrors.email ? 'Valid email is required' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={formErrors.phone}
                  helperText={formErrors.phone ? 'Phone number is required' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Upload Resume/CV*
                  </Typography>
                  <input
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    id="resume-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="resume-file">
                    <Button
                      variant="outlined"
                      component="span"
                    >
                      Choose File
                    </Button>
                    <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                      {formData.resume ? formData.resume.name : 'No file chosen'}
                    </Typography>
                  </label>
                  {formErrors.resume && (
                    <FormHelperText error>Resume is required</FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cover Letter"
                  name="coverLetter"
                  multiline
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="heard-from-label">How did you hear about us?</InputLabel>
                  <Select
                    labelId="heard-from-label"
                    id="heard-from"
                    name="heardFrom"
                    value={formData.heardFrom}
                    label="How did you hear about us?"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="website">Company Website</MenuItem>
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="referral">Employee Referral</MenuItem>
                    <MenuItem value="jobboard">Job Board</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApplyDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #FF6B00, #FF8533)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8533, #FF6B00)',
              },
            }}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Careers; 