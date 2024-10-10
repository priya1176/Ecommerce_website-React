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

const ProductCard = ({ item, onAddToCart }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <MUICard
      sx={{
        width: 310,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(to right, #fffff 5%, #fffff 51%, #fffff 80%)',
        padding: 8,
        borderRadius: 2,
        boxShadow: 6,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
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
            height: 200,
            objectFit: 'contain',
            objectPosition: 'center',
            cursor: 'pointer',
          }}
        />
      </Link>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          Category: {item.category}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Price: ${item.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton onClick={handleWishlistToggle} sx={{ backgroundColor: 'white', borderRadius: '50%', padding: '8px', '&:hover': { backgroundColor: '#f0f0f0' } }}>
          {isWishlist ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
        </IconButton>
        <Button
          size="small"
          variant="contained"
          onClick={() => onAddToCart(item.id)} // Use the passed function
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
    </MUICard>
  );
};

export default ProductCard;
