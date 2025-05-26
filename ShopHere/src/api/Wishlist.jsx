import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Wishlist = () => {
  const [wishlist, setWishlist] = React.useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  const handleRemoveItem = (itemId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update local storage
  };

  const handleBuyNow = (itemId) => {
    // Handle the purchase action, e.g., redirect to the product page
    console.log(`Redirecting to buy item with id: ${itemId}`);
    // You can replace this with a route navigation or a modal display
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        My Wishlist
      </Typography>
      {wishlist.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Your wishlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {wishlist.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxShadow: 3,
                  padding: 2,
                }}
              >
                <CardMedia
                  component="img"
                  alt={item.title}
                  image={item.image} // Assuming each item has an image URL
                  title={item.title}
                  sx={{
                    height: 140,
                    objectFit: 'contain',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Category: {item.category} {/* Assuming each item has a category */}
                  </Typography>
                  <Typography variant="h5" sx={{ marginTop: 1 }}>
                    ${item.price}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBuyNow(item.id)}
                  >
                    Buy Now
                  </Button>
                  <IconButton
                    onClick={() => handleRemoveItem(item.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Wishlist;
