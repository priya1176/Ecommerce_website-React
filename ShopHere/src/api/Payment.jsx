import React from 'react';
import { Box, Typography, Button, Divider, Card, CardContent, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Payment as PaymentIcon, Phone as PhoneIcon, CreditCard as CreditCardIcon, LocalAtm as LocalAtmIcon } from '@mui/icons-material'; // Import necessary icons

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalAmount = location.state?.totalAmount || 0; // Get totalAmount from state
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [paymentId, setPaymentId] = React.useState(''); // State for payment ID input

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method!');
      return;
    }
    if (paymentMethod !== 'Cash on Delivery (COD)' && !paymentId) {
      alert('Please enter your payment ID!');
      return;
    }
    alert(`Payment successful via ${paymentMethod}`);
    navigate('/'); // Redirect to homepage after payment
  };

  const handlePaymentIdChange = (e) => {
    setPaymentId(e.target.value);
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
          maxWidth: 500,
          width: '100%',
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: 2,
              textAlign: 'center',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #FF6F61, #6FA3EF)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Select Payment Method
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
            Total Amount: ${totalAmount}
          </Typography>
          <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel
              value="Cash on Delivery (COD)"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalAtmIcon sx={{ marginRight: 1 }} />
                  Cash on Delivery (COD)
                </Box>
              }
            />
            <FormControlLabel
              value="PhonePe"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ marginRight: 1 }} />
                  PhonePe
                </Box>
              }
            />
            <FormControlLabel
              value="Google Pay"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PaymentIcon sx={{ marginRight: 1 }} />
                  Google Pay
                </Box>
              }
            />
            <FormControlLabel
              value="Card Payment"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCardIcon sx={{ marginRight: 1 }} />
                  Card Payment
                </Box>
              }
            />
          </RadioGroup>

          {/* Conditionally render the payment ID field based on selected payment method */}
          {paymentMethod && paymentMethod !== 'Cash on Delivery (COD)' && (
            <TextField
              label="Enter Payment ID"
              variant="outlined"
              fullWidth
              value={paymentId}
              onChange={handlePaymentIdChange}
              sx={{ marginTop: 2 }}
            />
          )}

          <Button
            variant="contained"
            onClick={handlePayment}
            sx={{
              background: 'linear-gradient(to right, #41295a, #2F0743)',
              color: 'white',
              width: '100%',
              padding: 2,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 'bold',
              marginTop: 2,
            }}
          >
            Make Payment
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payment;
