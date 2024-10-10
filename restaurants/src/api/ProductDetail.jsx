import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star'; // For review stars

const ProductDetail = ({ onAddToCart, onBuyNow }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(0); // Rating state to track selected star

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setItem(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleWishlistToggle = () => {
    setIsWishlist(!isWishlist);
  };

  const handleAddToCart = () => {
    onAddToCart(item.id);
  };

  const handleBuyNow = () => {
    onBuyNow(item.id); // Function to handle the Buy Now action
  };

  const handleRating = (index) => {
    setRating(index + 1); // Set the rating to the selected star (index + 1)
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6" color="error">Error loading product details.</Typography>;
  if (!item) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Responsive flex direction
        padding: '40px',
        gap: '20px', // Gap between columns
      }}
    >
      {/* Left Column for Image */}
      <Box
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column', // Align image and buttons vertically
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            maxWidth: '50%',
            height: 'auto',
            objectFit: 'contain',
            transition: 'transform 0.3s ease', // Smooth transition for hover
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'; // Scale on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'; // Reset scale
          }}
        />
        {/* Buttons under the image */}
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'center', 
            width: '60%', 
          }}
        >
          <Button 
            variant="contained" 
            onClick={handleAddToCart}
            sx={{
              background: 'linear-gradient(to right, #AA076B 0%, #61045F  51%, #AA076B  100%)',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 20px',
              flex: '1', // Ensures both buttons take up equal width
              transition: 'transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#841d1d', // Darker on hover
                transform: 'scale(1.05)', // Scale on hover
              },
            }}
          >
            Add to Cart
          </Button>

          <Button 
            variant="contained" 
            onClick={handleBuyNow}
            sx={{
              background: 'linear-gradient(to right, #AA076B 0%, #61045F  51%, #AA076B  100%)',
              color: 'white',
              fontWeight: 'bold',
              padding: '10px 10px',
              flex: '1', // Ensures both buttons take up equal width
              transition: 'transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#2e7d32', // Darker on hover
                transform: 'scale(1.05)', // Scale on hover
              },
            }}
          >
            Buy Now
          </Button>
        </Box>
      </Box>

      {/* Right Column for Details */}
      <Box
        sx={{
          flex: '0.8', // Reduce width of the details section to give more space to the image
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center content vertically
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          <span className="font-bold text-black">Category</span>: {item.category}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          Price: ${item.price}
        </Typography>
        <Typography variant="body2" color="text.dark" paragraph>
          {item.description}
        </Typography>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px', 
          }}
        >
          <IconButton onClick={handleWishlistToggle}>
            {isWishlist ? (
              <FavoriteIcon style={{ color: 'red' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography
        variant="body2"
        sx={{
          fontWeight: isWishlist ? 'bold' : 'normal', 
          color: isWishlist ? 'brown' : 'inherit', 
        }}
      >
        {isWishlist ? 'Wishlisted!' : 'Add to Wishlist'}
      </Typography>

        </Box>

        {/* Review Section */}
        <Box
          sx={{
            marginTop: '20px',
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Add Review
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {/* 5 Star Icons for review */}
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                sx={{
                  color: index < rating ? '#fbc02d' : 'black', // Yellow if rated, white otherwise
                  cursor: 'pointer',
                  transition: 'color 0.3s ease', // Smooth transition when clicked
                }}
                onClick={() => handleRating(index)} // Set rating on click
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
