import React from 'react';
import { Container, Typography, Box, Paper, Divider, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const TermsOfService = () => {
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
              Terms of Service
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
              Please read these terms carefully before using our services
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
            Smart-Trade Terms of Service
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: 'italic', mb: 3 }}>
            Last Updated: March 26, 2025
          </Typography>

          <section>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By accessing and using the services provided by Smart-Trade ("Company", "we", "our", or "us"), including our website, mobile applications, and in-store services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you should not use our services.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              2. Description of Services
            </Typography>
            <Typography variant="body1" paragraph>
              Smart-Trade provides technology products, software solutions, and related services to customers in South Africa. Our services include but are not limited to the sale of computer hardware, software, networking equipment, peripherals, and technical support services.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              3. User Accounts
            </Typography>
            <Typography variant="body1" paragraph>
              Some parts of our services require you to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.
            </Typography>
            <Typography variant="body1" paragraph>
              You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              4. Product Information and Pricing
            </Typography>
            <Typography variant="body1" paragraph>
              We strive to provide accurate product descriptions and pricing information. However, we do not warrant that product descriptions or other content on our site is accurate, complete, reliable, current, or error-free. In the event of a pricing error, we reserve the right to cancel any orders placed for products that were incorrectly priced.
            </Typography>
            <Typography variant="body1" paragraph>
              All prices are in South African Rand (ZAR) and are inclusive of VAT unless otherwise stated. Prices are subject to change without notice.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              5. Orders and Payments
            </Typography>
            <Typography variant="body1" paragraph>
              Your order is an offer to buy from us. We reserve the right to accept or decline your order for any reason, including but not limited to availability, inaccuracies in product information, or errors in your order.
            </Typography>
            <Typography variant="body1" paragraph>
              We accept various payment methods as indicated on our website. By providing a payment method, you represent that you are authorized to use the designated payment method and authorize us to charge your payment method for all purchases you make.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              6. Shipping and Delivery
            </Typography>
            <Typography variant="body1" paragraph>
              Shipping and delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or other factors beyond our control.
            </Typography>
            <Typography variant="body1" paragraph>
              Risk of loss and title for items purchased pass to you upon delivery of the items to the shipping carrier or, if you select in-store pickup, when you pick up your items.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              7. Returns and Refunds
            </Typography>
            <Typography variant="body1" paragraph>
              Our return and refund policy is outlined in detail on our Returns page. By using our services, you agree to the terms of our return and refund policy.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              8. Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              All content included on our website and in our services, such as text, graphics, logos, images, and software, is the property of Smart-Trade or its content suppliers and is protected by South African and international copyright laws.
            </Typography>
            <Typography variant="body1" paragraph>
              You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of our services without express written permission from us.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              9. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              To the fullest extent permitted by law, Smart-Trade shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
            </Typography>
            <Typography component="ol" variant="body1" sx={{ pl: 2 }}>
              <li>Your use of or inability to use our services;</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein;</li>
              <li>Any interruption or cessation of transmission to or from our services;</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services by any third party.</li>
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              10. Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
              These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa, without regard to its conflict of law provisions.
            </Typography>
            <Typography variant="body1" paragraph>
              Any disputes arising under these Terms shall be resolved in the courts of South Africa.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              11. Changes to Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last Updated" date. Your continued use of our services after any such changes constitutes your acceptance of the new Terms.
            </Typography>
          </section>

          <Divider sx={{ my: 3 }} />

          <section>
            <Typography variant="h5" gutterBottom>
              12. Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about these Terms, please contact us at:
            </Typography>
            <Typography variant="body1">
              Smart-Trade<br />
              35 Ellenburger Street<br />
              Wilgehof, Bloemfontein, 9301<br />
              Phone: 083 334 1547<br />
              Email: office@smart-trade.biz
            </Typography>
          </section>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService; 