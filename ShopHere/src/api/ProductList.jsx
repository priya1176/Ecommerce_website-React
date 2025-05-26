import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Card, CardContent } from '@mui/material';

const ProductList = () => {
  const location = useLocation();
  const categoryData = location.state?.categoryData; // Using optional chaining to avoid errors

  if (!categoryData) {
    return <Typography variant="h6" color="error">No data available</Typography>;
  }

  return (
    <Box sx={{ margin: '20px' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '20px' }}>
        {categoryData.category}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {categoryData.products.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: 'calc(25% - 20px)',
              height: '400px', // Increase the height of the card
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '200px', // Set a fixed height for the image
                  objectFit: 'cover',
                  borderRadius: '4px', // Optional: to add rounded corners to the image
                }}
              />
              <Typography variant="h6" align="center" sx={{ marginTop: '10px' }}>
                {product.name}
              </Typography>
              <Typography variant="body2" align="center">
                Price: {product.price} 
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary">
                {product.availability}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
