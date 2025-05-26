import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  Button,
  Card as MUICard,
  CardMedia,
  Divider,
  Grid,
} from '@mui/material';

const Cart = () => {
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState('Samastipur, Bihar, 848504');
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  const discountRate = 10; // Discount percentage
  const deliveryCharges = 50;

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    window.location.reload();
  };

  const calculateOriginalTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  const calculateDiscountAmount = () => {
    const originalTotal = calculateOriginalTotal();
    return (originalTotal * discountRate) / 100;
  };

  const calculateTotalAmount = () => {
    const originalTotal = calculateOriginalTotal();
    const discount = calculateDiscountAmount();
    return originalTotal - discount + deliveryCharges;
  };

  const handleBuyAll = () => {
    navigate('/checkout');
  };

  const handleChangeAddress = () => {
    const newAddress = prompt('Enter new delivery address:', deliveryAddress);
    if (newAddress) {
      setDeliveryAddress(newAddress);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {/* Delivery Address and Cart Items */}
        <Grid item xs={12} md={8}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1">
                Delivery Address: {deliveryAddress}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleChangeAddress}
                sx={{
                  marginLeft: 2,
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to right, #FFA500, #FF4500)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  borderColor: 'transparent',
                  '&:hover': {
                    backgroundImage: 'linear-gradient(to right, #FF4500, #FFA500)',
                    borderColor: 'transparent',
                  },
                }}
              >
                Change Address
              </Button>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            {cartItems.length === 0 ? (
              <Typography variant="h6">Your cart is empty!</Typography>
            ) : (
              <List>
                {cartItems.map((item) => (
                  <MUICard
                    key={item.id}
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 2,
                      padding: 4,
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={{
                        width: { xs: '100%', sm: 100 },
                        height: 100,
                        objectFit: 'contain',
                        marginRight: { sm: 2 },
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{item.title}</Typography>
                      <Typography variant="body2" sx={{ marginY: 1 }}>
                        Category: {item.category} - Price: ${item.price}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/products/${item.id}`)}
                        sx={{
                          background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
                          color: 'white',
                        }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </MUICard>
                ))}
              </List>
            )}
          </Box>
        </Grid>

        {/* Price Details */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: 2,
              backgroundColor: 'white',
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5">Price Details</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 1 }}>
              <Typography variant="body1">Price ({cartItems.length} items)</Typography>
              <Typography variant="body1">${calculateOriginalTotal()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 1 }}>
              <Typography variant="body1">Discount ({discountRate}%)</Typography>
              <Typography variant="body1" sx={{ color: 'green' }}>
                -${calculateDiscountAmount().toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 1 }}>
              <Typography variant="body1">Delivery Charges</Typography>
              <Typography variant="body1">$50</Typography>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 1 }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">${calculateTotalAmount().toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 1 }}>

            <Typography
              variant="body2"
              sx={{ color: 'green', textAlign: 'center', marginTop: 1 }}
            >
              You Saved
            </Typography>
            <Typography               variant="body2"
              sx={{ color: 'green', textAlign: 'center', marginTop: 1 }}> ${calculateDiscountAmount().toFixed(2)}!</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleBuyAll}
              disabled={cartItems.length === 0}
              sx={{
                marginTop: 2,
                background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
                color: 'white',
              }}
            >
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
