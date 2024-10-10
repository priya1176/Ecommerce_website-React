import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: '40px 16px 0',
        margin: '0', 
        textAlign: 'center',
        background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)', // New gradient background
        color: 'white', // Text color
        bottom: 0,
        width: '100%', // Full width
        height: '80px', // Increased height
      }}

    >
      <Typography variant="caption" sx={{ color: 'white' }}>
        &copy; 2024 Copyright. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
