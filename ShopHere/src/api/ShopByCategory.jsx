import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = [
  { category: "Men's clothing", image: '/images/men.jpeg', discount: '10%' },
  { category: "women's clothing", image: '/images/women.jpeg', discount: '15%' },
  { category: 'footwear', image: '/images/footwear.jpeg', discount: '20%' },
  { category: 'jewelery', image: '/images/jewelery.jpeg', discount: '25%' },
  { category: 'child', image: '/images/child.jpeg', discount: '5%' },
  { category: 'home decor', image: '/images/home_dec.webp', discount: '30%' },
  { category: 'watches', image: '/images/watch.jpeg', discount: '15%' },
  { category: 'bags', image: '/images/bag.webp', discount: '10%' },
];

const ShopByCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCategoryClick = async (category) => {
    if (category.toLowerCase() === "men's clothing".toLowerCase()) {
      try {
        setLoading(true);
        const response = await axios.get('/data.json');
        const mensFashionData = response.data["Men's clothing"];
        setLoading(false);
        navigate('/product', { state: { categoryData: mensFashionData } });
      } catch (err) {
        setLoading(false);
        setError('Failed to load category data');
      }
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          margin: '20px 0',
          background: 'linear-gradient(to right, #FF6F61, #6FA3EF)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold',
          padding: '10px',
        }}
      >
        Offers on Categories
      </Typography>

      {loading && <Typography align="center">Loading...</Typography>}
      {error && <Typography color="error" align="center">{error}</Typography>}

      <Grid container spacing={3} sx={{ marginTop: '20px' }}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.category}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%)',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 12,
                },
              }}
              onClick={() => handleCategoryClick(category.category)}
            >
              <CardContent sx={{ padding: 0 }}>
                <img
                  src={category.image}
                  alt={category.category}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  {category.discount} off
                </Typography>
                <Typography variant="h6" align="center" sx={{ marginTop: '10px' }}>
                  {category.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShopByCategory;
