import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';

// Import your logo image
import logo from './path_to_your_logo_image.png'; // Update this path

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    // Add login logic here
  };

  return (
    <Grid container style={{ height: '100vh' }}>
      {/* Left Side */}
      <Grid item xs={6} sx={{
        background: 'linear-gradient(to right, #41295a, #2F0743)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
      }}>
        <Box sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'pulse 2s infinite',
        }}>
          <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
        </Box>
        <Typography variant="h4" gutterBottom>
          Welcome! Shop with Confidence
        </Typography>
        <Typography variant="h6">
          Discover the best products at unbeatable prices.
        </Typography>
      </Grid>

      {/* Right Side */}
      <Grid item xs={6} component={Paper} elevation={3} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box sx={{ width: '300px', padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ marginTop: '20px' }}
          >
            Login
          </Button>
        </Box>
      </Grid>

      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Grid>
  );
};

export default LoginPage;
