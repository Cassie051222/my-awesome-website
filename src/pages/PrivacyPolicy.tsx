import React from 'react';
import { Container, Typography, Box, Paper, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
              Privacy Policy
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
              How we collect, use, and protect your personal information
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            mb: 8
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'medium', mb: 3 }}>
            Smart-Trade Privacy Policy
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 3 }}>
            Last Updated: March 26, 2025
          </Typography>

          <Typography variant="body1" paragraph>
            At Smart-Trade, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or make purchases in our store.
          </Typography>
          <Typography variant="body1" paragraph>
            Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect several types of information from and about users of our services, including:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Personal Information:</strong> Name, postal address, email address, telephone number, date of birth, and payment information.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Transaction Information:</strong> Details about purchases or orders you make through our services.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Technical Information:</strong> Internet protocol (IP) address, browser type, operating system, and other technology on the devices you use to access our services.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Usage Information:</strong> How you use our website, products, and services.
                </Typography>
              </li>
            </ul>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              2. How We Collect Information
            </Typography>
            <Typography variant="body1" paragraph>
              We collect information in several ways, including:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Direct Interactions:</strong> When you create an account, make a purchase, sign up for our newsletter, or contact us.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Automated Technologies:</strong> As you navigate through our website, we may use cookies, web beacons, and other tracking technologies to collect data about your equipment, browsing actions, and patterns.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Third Parties:</strong> We may receive information from third-party service providers, business partners, or other sources.
                </Typography>
              </li>
            </ul>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              3. How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We may use the information we collect about you for various purposes, including to:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" paragraph>
                  Provide, maintain, and improve our services.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Process and fulfill your orders, including sending confirmations, invoices, technical notices, updates, and support messages.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Communicate with you about products, services, offers, promotions, and events.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Create and maintain a secure environment and protect against fraud and illegal activity.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Comply with legal obligations and enforce our terms of service.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Analyze trends and understand how users interact with our services.
                </Typography>
              </li>
            </ul>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              4. Disclosure of Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We may disclose information that we collect or that you provide in certain circumstances, including:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Service Providers:</strong> To contractors, service providers, and other third parties we use to support our business.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Business Transfers:</strong> To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Legal Requirements:</strong> To comply with any court order, law, or legal process, including to respond to any government or regulatory request.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Protection of Rights:</strong> To enforce or apply our terms of service and other agreements, or to protect the rights, property, or safety of Smart-Trade, our customers, or others.
                </Typography>
              </li>
            </ul>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              5. Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All payment transactions are encrypted using secure technology.
            </Typography>
            <Typography variant="body1" paragraph>
              The safety and security of your information also depends on you. We urge you to be careful about providing information in public areas of our website, which may be viewed by any user of the website.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              6. Your Rights and Choices
            </Typography>
            <Typography variant="body1" paragraph>
              You have certain rights and choices regarding your personal information, including:
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Access and Update:</strong> You can access and update certain information through your account settings.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Cookies and Tracking Technologies:</strong> You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Marketing Communications:</strong> You can opt out of receiving promotional emails from us by following the unsubscribe instructions in those emails.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Data Subject Rights:</strong> Depending on your location, you may have additional rights under data protection laws, such as the right to request access, deletion, or portability of your personal information.
                </Typography>
              </li>
            </ul>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              7. Children's Privacy
            </Typography>
            <Typography variant="body1" paragraph>
              Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe we may have collected information about a child, please contact us.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              8. Changes to Our Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update our Privacy Policy from time to time. If we make material changes, we will notify you by email or through a notice on our website prior to the change becoming effective.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              9. Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </Typography>
            <Typography variant="body1">
              Smart-Trade<br />
              35 Ellenberger Street<br />
              Wilgehof, Bloemfontein, 9301<br />
              Phone: 083 334 1547<br />
              Email: privacy@smart-trade.biz
            </Typography>
          </section>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy; 