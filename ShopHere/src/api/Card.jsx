import React, { useState } from 'react';
import {
  Card as MUICard,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../index.css';

const ProductCard = ({ item }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  // Check if the item is already in the wishlist when the component mounts
  React.useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const itemInWishlist = wishlist.find((wishlistItem) => wishlistItem.id === item.id);
    setIsWishlist(!!itemInWishlist);
  }, [item.id]);

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (isWishlist) {
      // Remove item from wishlist
      const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== item.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert(`${item.title} has been removed from your wishlist!`);
    } else {
      // Add item to wishlist
      const updatedWishlist = [...wishlist, item];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      alert(`${item.title} has been added to your wishlist!`);
    }

    // Toggle the wishlist state
    setIsWishlist(!isWishlist);
  };

  const handleAddToCart = () => {
    // Get existing cart items from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the current item to the cart
    const updatedCart = [...existingCart, item];
    
    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Optional: You can display an alert or a message to the user
    alert(`${item.title} has been added to your cart!`);
  };

  return (
    <MUICard
    sx={{
      width: 310,
      height: 450,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 2,
      boxShadow: 6,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      marginBottom: 4, // Add margin bottom here
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: 12,
      },
    }}

    >
      <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{
            width: '100%',
            height: 250,
            objectFit: 'contain',
            objectPosition: 'center',
            backgroundColor: 'white', // Set the background to white
            cursor: 'pointer',
          }}
        />
      </Link>
      <CardContent
        sx={{
          flexGrow: 1,
          background:' linear-gradient(to right, #F7BB97 0%, #F7BB97  51%, #F7BB97  100%)',
          borderRadius: '0 0 8px 8px', 
          padding: 2,
        }}
      >
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          Category: {item.category}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Price: ${item.price}
        </Typography>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton 
          onClick={handleWishlistToggle} 
          sx={{ backgroundColor: 'white', borderRadius: '50%', padding: '8px', '&:hover': { backgroundColor: '#f0f0f0' } }}
        >
          {isWishlist ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
        </IconButton>
        <Button
          size="small"
          variant="contained"
          onClick={handleAddToCart} // Call the handler on button click
          sx={{
            background: 'linear-gradient(to right, #a73737 0%, #7a2828 51%, #a73737 100%)',
            color: 'white',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease, background 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(to right, #a73737 0%, #7a2828 51%, #a73737 100%)',
              transform: 'scale(1.05)',
              color: 'white',
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
      </CardContent>

    </MUICard>
  );
};

export default ProductCard;
