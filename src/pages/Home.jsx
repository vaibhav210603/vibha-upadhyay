import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Comments from '../components/Comments';

const Home = () => {
  const { user } = useAuth();
  const [videoEnded, setVideoEnded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (videoEnded) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 1000); // Wait for 1 second after video ends before showing text
      return () => clearTimeout(timer);
    }
  }, [videoEnded]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const photos = [
    '/photos/photo1.jpeg',
    '/photos/photo2.jpeg',
  ];

  const services = [
    {
      title: 'Name Correction',
      description: 'Get your name analyzed and corrected for better alignment with your destiny and life path.',
      icon: '✍️',
    },
    {
      title: 'Mobile Number Correction',
      description: 'Ensure your mobile number brings positive energy and good fortune into your life.',
      icon: '📱',
    },
    {
      title: 'General Prediction',
      description: 'Comprehensive analysis of your future based on various astrological and numerological factors.',
      icon: '🔮',
    },
    {
      title: 'Remedies to Problems',
      description: 'Personalized solutions and remedies to overcome life challenges and obstacles.',
      icon: '✨',
    },
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      service: 'Name Correction',
      comment: 'After getting my name corrected, I noticed significant positive changes in my career and personal life. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Priya Patel',
      service: 'Mobile Number Correction',
      comment: 'The mobile number correction service was life-changing. My business started flourishing after implementing the suggested changes.',
      rating: 5,
    },
    {
      name: 'Amit Kumar',
      service: 'General Prediction',
      comment: 'The predictions were incredibly accurate. It helped me make better decisions in my life.',
      rating: 4,
    },
    {
      name: 'Neha Gupta',
      service: 'Remedies to Problems',
      comment: 'The remedies suggested were simple yet effective. I could feel the positive energy shift in my life.',
      rating: 5,
    },
  ];

  return (
    <Box>
      {/* Hero Section with Video Background */}
      <Box
        sx={{
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Video Background */}
        <Box
          component="video"
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            opacity: videoEnded ? 0 : 1,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Box>

        {/* White Background Fade */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 2,
            opacity: videoEnded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: videoEnded ? 'black' : 'white',
                textShadow: videoEnded ? 'none' : '2px 2px 4px rgba(0,0,0,0.5)',
                transition: 'all 1s ease-in-out',
              }}
            >
              Welcome to Vibha Upadhyay's World
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 4,
                color: videoEnded ? 'black' : 'white',
                textShadow: videoEnded ? 'none' : '1px 1px 2px rgba(0,0,0,0.5)',
                transition: 'all 1s ease-in-out',
              }}
            >
              Expert in Numerology and Astrology
            </Typography>
            <Button
              component={RouterLink}
              to={user ? "/appointment" : "/login"}
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #7B1FA2 30%, #AE52D4 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4A0072 30%, #7B1FA2 90%)',
                },
              }}
            >
              {user ? 'Book an Appointment' : 'Get Started'}
            </Button>
          </motion.div>
        </Box>
      </Box>

      {/* Services Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6, color: 'text.primary' }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h1" sx={{ mb: 2 }}>
                      {service.icon}
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom color="text.primary">
                      {service.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'primary.main', py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, color: 'text.primary' }}
          >
            Client Testimonials
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      backgroundColor: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ flexGrow: 1, color: 'text.primary' }}>
                        {testimonial.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Typography key={i} sx={{ color: '#FFD700' }}>★</Typography>
                        ))}
                      </Box>
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Service: {testimonial.service}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      "{testimonial.comment}"
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Comments Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, color: 'text.primary' }}
          >
            Share Your Experience
          </Typography>
          <Comments />
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'text.primary', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h4" gutterBottom color="text.primary">
                  About Vibha Upadhyay
                </Typography>
                <Typography variant="body1" paragraph color="text.primary">
                  With years of experience in numerology and astrology, Vibha Upadhyay
                  helps individuals discover their true potential and navigate life's
                  challenges through ancient wisdom and modern insights.
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Her expertise in these fields has helped countless people find
                  direction, purpose, and peace in their lives.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Slider {...sliderSettings}>
                  {photos.map((photo, index) => (
                    <Box key={index} sx={{ p: 2 }}>
                      <Box
                        component="img"
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: '400px',
                          objectFit: 'cover',
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  ))}
                </Slider>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 