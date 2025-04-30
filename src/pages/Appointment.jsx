import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MeetingLink from '../components/MeetingLink';

const services = [
  { value: 'numerology', label: 'Numerology Reading' },
  { value: 'astrology', label: 'Astrology Consultation' },
  { value: 'both', label: 'Combined Reading' },
];

const steps = ['Personal Information', 'Appointment Details', 'Confirmation'];

const Appointment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: null,
    time: null,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Appointment form submitted:', formData);
    setError(null);
    
    try {
      // Format date and time properly
      const formattedDate = formData.date?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      const formattedTime = formData.time?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-server-url.vercel.app/api/send-meeting-link'
        : 'http://localhost:3001/api/send-meeting-link';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          date: formattedDate,
          time: formattedTime,
          service: formData.service,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to send meeting link');
      }

      const data = await response.json();
      console.log('Meeting link created:', data.meetLink);
      
      setSuccess(true);
      handleNext();
    } catch (error) {
      console.error('Error sending meeting link:', error);
      setError(error.message);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                {services.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={(newValue) => {
                    setFormData({ ...formData, date: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time"
                  value={formData.time}
                  onChange={(newValue) => {
                    setFormData({ ...formData, time: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message (Optional)"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Appointment Details
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Name:</strong> {formData.name}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Service:</strong> {services.find(s => s.value === formData.service)?.label}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Date:</strong> {formData.date?.toLocaleDateString()}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Time:</strong> {formData.time?.toLocaleTimeString()}
            </Typography>
            {formData.message && (
              <Typography variant="body1" paragraph>
                <strong>Message:</strong> {formData.message}
              </Typography>
            )}
            <MeetingLink appointmentDetails={formData} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            py: 8,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Book an Appointment
            </Typography>
            <Typography variant="subtitle1" align="center" paragraph>
              Schedule a consultation with Vibha Upadhyay
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Appointment booked successfully! Check your email for confirmation.
              </Alert>
            )}

            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit}>
              {renderStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Confirm Appointment
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Appointment; 