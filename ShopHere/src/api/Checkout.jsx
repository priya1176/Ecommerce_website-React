import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const deliveryCharges = 50;
  const [deliveryAddress, setDeliveryAddress] = useState('Samastipur, Bihar, 848504');
  const navigate = useNavigate();

  const calculateTotalAmount = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    return total + deliveryCharges;
  };

  const calculateOriginalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price, 0);
  };

  const handleProceedToPayment = () => {
    const totalAmount = calculateTotalAmount();
    navigate('/payment', { state: { totalAmount } }); // Pass totalAmount to Payment page
  };

  // Calculate savings (for example, comparing the original price to the total price including delivery charges)
  const calculateSavings = () => {
    const originalPrice = calculateOriginalPrice();
    const totalPrice = calculateTotalAmount();
    return totalPrice - originalPrice;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f9f9f9',
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ padding: { xs: 2, sm: 4 } }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: 2,
              textAlign: 'center',
              background: 'linear-gradient(to right, #FF6F61, #6FA3EF)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Checkout - Review
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Order Summary
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 1,
                }}
              >
                <Typography variant="body1">
                  {item.title.split(' ')[0]} - ${item.price}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography variant="body2">Delivery Charges:</Typography>
              <Typography variant="body2">${deliveryCharges}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography variant="body2">Address:</Typography>
              <Typography variant="body2" sx={{ maxWidth: '50%' }} noWrap>
                {deliveryAddress}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
              <Typography variant="body2" sx={{ color: 'green' }}>
                You Saved: 
              </Typography>
              <Typography variant="body2" sx={{ color: 'green' }}>
                ${calculateSavings()}
              </Typography>
            </Box>
            <Divider sx={{ marginY: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant="h6">Total Amount:</Typography>
              <Typography variant="h6">${calculateTotalAmount()}</Typography>
            </Box>

            {/* Number of Items */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Total Items:
              </Typography>
              <Typography variant="body2">{cartItems.length}</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={handleProceedToPayment}
            sx={{
              background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
              color: 'white',
              width: '100%',
              padding: 2,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            Proceed to Payment
          </Button>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              component="a"
              href="/"
              sx={{
                borderRadius: '8px',
                padding: 1,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Cancel
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Checkout;
