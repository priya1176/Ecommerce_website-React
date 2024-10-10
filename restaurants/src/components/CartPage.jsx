import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const CartPage = ({ cartItems }) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        cartItems.map(item => (
          <Card key={item.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body1">Price: ${item.price}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default CartPage;
