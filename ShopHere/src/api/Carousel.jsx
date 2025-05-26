import React from "react";
import { Box, Typography } from "@mui/material";

const imageItem = { 
  title: 'Featured Product 1', 
  image: '/images/imgp.jpg', 
  textCenter: 'Hurry, Limited Time Offers Await!' 
};

const ImageBanner = () => {
  return (
    <Box sx={{ margin: 0, padding: 0, backgroundColor: '#f5f5f5' }}>
      <Box
        sx={{
          position: 'relative',
          cursor: 'pointer',
          '&:hover .hoverEffect': {
            transform: 'scale(1.05)',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Box
          component="img"
          src={imageItem.image}
          alt={imageItem.title}
          sx={{
            width: '100%',
            height: '400px',
            borderRadius: '0px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.5s ease',
            opacity: 0.8, // Smooth opacity effect
            '&:hover': {
              opacity: 1, // Full opacity on hover for better visual effect
            },
          }}
          className="hoverEffect"
        />

        {/* Text starting after 60% width */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '44%', // Start the text block at 60% of the width
            transform: 'translateY(-50%)', // Keep vertical centering
            color: '#000', // Changed to black text
            fontWeight: 'bold',
            fontSize: '36px', // Increase font size for more prominence
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add a shadow effect for readability
            textAlign: 'center',
            width: '40%', // Limit text width
          }}
        >
          <Typography variant="h4">{imageItem.textCenter}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageBanner;
