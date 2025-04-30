import { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Avatar,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Avatar
              src="/logo.png"
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto 24px',
                backgroundColor: 'primary.main',
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Sign in with your Google account to book appointments and access your profile
            </Typography>
            <Box sx={{ mt: 3 }}>
              <GoogleLogin
                onSuccess={login}
                onError={() => {
                  console.log('Login Failed');
                }}
                shape="rectangular"
                size="large"
                width="300"
                theme="filled_blue"
                text="signin_with"
                logo_alignment="center"
                useOneTap
                auto_select
                context="signin"
                ux_mode="popup"
                itp_support
                cancel_on_tap_outside
                prompt_parent_id="google-signin-button"
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Login; 