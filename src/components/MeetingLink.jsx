import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';

const MeetingLink = ({ appointmentDetails }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSendMeetingLink = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Format date and time properly
      const formattedDate = appointmentDetails.date?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      const formattedTime = appointmentDetails.time?.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const response = await fetch('/api/send-meeting-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: appointmentDetails.email,
          name: appointmentDetails.name,
          date: formattedDate,
          time: formattedTime,
          service: appointmentDetails.service,
          meetingLink: 'https://meet.google.com/your-meeting-id',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to send meeting link');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Error sending meeting link:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Send Meeting Link
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          A meeting link will be sent to {appointmentDetails.email}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Meeting link sent successfully!
          </Alert>
        ) : (
          <Button
            variant="contained"
            onClick={handleSendMeetingLink}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            sx={{ mt: 2 }}
          >
            {loading ? 'Sending...' : 'Send Meeting Link'}
          </Button>
        )}
      </Box>
    </motion.div>
  );
};

export default MeetingLink; 