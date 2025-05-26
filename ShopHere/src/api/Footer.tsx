import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter'; // Import Twitter icon
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Import Play Arrow Icon


const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: '40px 16px 0',
        margin: '0', 
        textAlign: 'center',
        background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
        color: 'white',
        bottom: 0,
        width: '100%',
        height: '220px', // Increased height for additional content
      }}
    >
      <Typography variant="caption" sx={{ color: 'white', mb: 1 }}>
        &copy; 2024 Copyright. All rights reserved.
      </Typography>
      
      <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
        Contact us: 
        <span style={{ marginLeft: '5px' }}>Email: prity@example.com</span>
        <span style={{ marginLeft: '5px' }}>Phone: (123) 456-7890</span>
      </Typography>

      {/* Play Store Button */}
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ 
          marginBottom: '10px', 
          backgroundColor: '#FF6F61', // Customize button color
          '&:hover': {
            backgroundColor: '#FF4F41', // Change color on hover
          },
        }} 
        startIcon={<PlayArrowIcon />} // Add an icon to the button
        onClick={() => window.open('https://play.google.com/store', '_blank')}
      >
        Download on Play Store
      </Button>


      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {/* Social Media Icons */}
        <IconButton
          component="a"
          href="https://www.instagram.com/"
          target="_blank"
          sx={{ color: 'white', mx: 1 }}
        >
          <InstagramIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://www.linkedin.com/"
          target="_blank"
          sx={{ color: 'white', mx: 1 }}
        >
          <LinkedInIcon />
        </IconButton>

        <IconButton
          component="a"
          href="https://twitter.com/"
          target="_blank"
          sx={{ color: 'white', mx: 1 }}
        >
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
