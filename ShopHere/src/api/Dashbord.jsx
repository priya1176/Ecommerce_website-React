import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Button, Menu, MenuItem } from '@mui/material';
import ProductCard from './Card'; // Ensure this component exists
import '../index.css';
import { SidePanel } from './SidePanel';
import ShopByCategory from './ShopByCategory';
import ImageBanner from './Carousel';

const Dashboard = () => {
  const [categories, setCategories] = useState([]); 
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
        setFilteredData(response.data); 

        // Derive unique categories
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to filter products by category
  const handleCategoryFilter = (category) => {
    if (category) {
      const filtered = data.filter(item => item.category === category);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to all products if no category is selected
    }
  };

  // Function to filter products by price
  const handlePriceFilter = (priceRange) => {
    let filtered;
    if (priceRange === '$0 - $50') {
      filtered = data.filter(item => item.price >= 0 && item.price <= 50);
    } else if (priceRange === '$51 - $100') {
      filtered = data.filter(item => item.price > 50 && item.price <= 100);
    } else if (priceRange === '$101 - $200') {
      filtered = data.filter(item => item.price > 100 && item.price <= 200);
    }
    setFilteredData(filtered);
  };

  // Function to filter products by color
  const handleColorFilter = (color) => {
    const filtered = data.filter(item => item.color === color); 
    setFilteredData(filtered);
  };

  const handleFiltersClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error loading products.
      </Typography>
    );
  }

  return (
    <Box className="bg-white" sx={{ position: 'relative' }}>
      {/* Sidebar positioned absolutely */}
      <Box sx={{ position: 'absolute', top: '0', left: '0', zIndex: '1' }}>
        <SidePanel />
      </Box>

      <ImageBanner />

      <Box display="flex" justifyContent="center" className="p-4" sx={{ paddingTop: '40px' }}>
        {/* Filters Button */}
        <Button
          variant="outlined"
          onClick={handleFiltersClick}
          sx={{
            margin: '0 10px',
            background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
            color: 'white',
            padding: '10px 30px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.10)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
            },
            '@media (max-width: 600px)': {
              padding: '8px 16px', // Adjust padding for smaller screens
              fontSize: '12px', // Smaller font size for mobile
            },
          }}
        >
          Filters
        </Button>

        {/* Menu for Filters */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <Typography variant="h6" style={{ padding: '10px', color: 'black' }}>Select Price</Typography>
          <MenuItem onClick={() => handlePriceFilter('$0 - $50')}>$0 - $50</MenuItem>
          <MenuItem onClick={() => handlePriceFilter('$51 - $100')}>$51 - $100</MenuItem>
          <MenuItem onClick={() => handlePriceFilter('$101 - $200')}>$101 - $200</MenuItem>
          <Typography variant="h6" style={{ padding: '10px', color: 'black' }}>Select Color</Typography>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="200px" padding="10px">
            <Box display="flex" flexDirection="column">
              <MenuItem onClick={() => handleColorFilter('White')}>White</MenuItem>
              <MenuItem onClick={() => handleColorFilter('Blue')}>Blue</MenuItem>
            </Box>
            <Box display="flex" flexDirection="column">
              <MenuItem onClick={() => handleColorFilter('Yellow')}>Yellow</MenuItem>
              <MenuItem onClick={() => handleColorFilter('Black')}>Black</MenuItem>
            </Box>
          </Box>
        </Menu>

        {/* All Products Button */}
        <Button
          variant="outlined"
          onClick={() => handleCategoryFilter('')}
          sx={{
            margin: '0 10px',
            background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
            color: 'white',
            padding: '14px 30px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.10)',
              boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
            },
            '@media (max-width: 600px)': {
              padding: '10px 20px', // Adjust padding for smaller screens
              fontSize: '12px', // Smaller font size for mobile
            },
          }}
        >
          All Products
        </Button>

        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleCategoryFilter(category)}
            sx={{
              margin: '0 10px',
              background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
              color: 'white',
              padding: '10px 20px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.10)',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
              },
              '@media (max-width: 600px)': {
                padding: '8px 16px', // Adjust padding for smaller screens
                fontSize: '12px', // Smaller font size for mobile
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center" sx={{ paddingTop: '70px' }}>
        {filteredData.length === 0 ? (
          <Typography variant="h6" align="center">
            No products found.
          </Typography>
        ) : (
          filteredData.map((item) => (
            <Box key={item.id} padding={1}>
              <ProductCard item={item} />
            </Box>
          ))
        )}
      </Box>
      <Box>
        <ShopByCategory />
      </Box>
    </Box>
  );
};

export default Dashboard;
