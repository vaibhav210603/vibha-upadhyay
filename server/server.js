import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: ['https://mummy-website.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Appointment server is running' });
});

// API endpoint for sending meeting links
app.post('/api/send-meeting-link', async (req, res) => {
  console.log('Received request body:', req.body);
  const { email, name, date, time, service, phone } = req.body;

  if (!email || !name || !date || !time || !service || !phone) {
    console.error('Missing required fields:', { email, name, date, time, service, phone });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Generate a Google Meet link
    const meetLink = 'https://meet.google.com/new'; // This will create a new meeting room

    // Send email to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Appointment Details with Vibha Upadhyay',
      html: `
        <h2>Appointment Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Your appointment has been scheduled with Vibha Upadhyay.</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Contact No.:</strong> ${phone}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetLink}">Click here to join the meeting</a></p>
        <p><strong>For any queries, please contact:</strong></p>
        <p>Vibha Upadhyay</p>
        <p>Phone: 8175966910, 7236943125</p>
        <p>We look forward to seeing you!</p>
      `,
    };

    // Send email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin's email
      subject: 'New Appointment Booking',
      html: `
        <h2>New Appointment Booking</h2>
        <p>A new appointment has been scheduled.</p>
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Client Email:</strong> ${email}</p>
        <p><strong>Client Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetLink}">Click here to join the meeting</a></p>
      `,
    };

    console.log('Sending client email to:', email);
    const clientInfo = await transporter.sendMail(clientMailOptions);
    console.log('Client email sent successfully:', clientInfo);

    console.log('Sending admin notification');
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log('Admin notification sent successfully:', adminInfo);

    res.status(200).json({ 
      message: 'Meeting link sent successfully',
      meetLink: meetLink
    });
  } catch (error) {
    console.error('Detailed email sending error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to send meeting link', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 