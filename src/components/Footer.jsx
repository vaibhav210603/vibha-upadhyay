import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'text.primary',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.primary' }} />
              <Typography color="text.primary">
                sector 18, Indira Nagar,<br />
                Lucknow, Uttar Pradesh 226016
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, color: 'text.primary' }} />
              <Typography color="text.primary">+91 7236943125 </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ mr: 1, color: 'text.primary' }} />
              <Typography color="text.primary">vibha.upadhyay77@gmail.com</Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="text.primary" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/appointment" color="text.primary" sx={{ mb: 1 }}>
                Book Appointment
              </Link>
              <Link href="/login" color="text.primary">
                Login
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Follow Us
            </Typography>
            <Box>
              <IconButton
                color="inherit"
                href="https://facebook.com"
                target="_blank"
                sx={{ mr: 1, color: 'text.primary' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://instagram.com"
                target="_blank"
                sx={{ mr: 1, color: 'text.primary' }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://twitter.com"
                target="_blank"
                sx={{ mr: 1, color: 'text.primary' }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://wa.me/919876543210"
                target="_blank"
                sx={{ color: 'text.primary' }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.primary">
            © {new Date().getFullYear()} Vibha Upadhyay. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 