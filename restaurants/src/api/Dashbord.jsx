import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Button, Menu, MenuItem } from '@mui/material';
import ProductCard from './Card'; // Make sure this component exists
import '../index.css';
import { SidePanel } from './SidePanel';

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
        console.log("Fetched products:", response.data);
        setData(response.data);
        setFilteredData(response.data); 

        // Derive unique categories
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        console.log("Derived categories:", uniqueCategories);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to filter products by category
  const handleCategoryFilter = (category) => {
    console.log("Filtering by category:", category);
    if (category) {
      const filtered = data.filter(item => item.category === category);
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // Reset to all products if no category is selected
    }
  };

  // Function to filter products by price
  const handlePriceFilter = (priceRange) => {
    console.log(`Filtering by price range: ${priceRange}`);
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

  // Function to filter products by color (assuming `color` property exists in your product data)
  const handleColorFilter = (color) => {
    console.log(`Filtering by color: ${color}`);
    const filtered = data.filter(item => item.color === color); // Adjust according to your product data structure
    setFilteredData(filtered);
  };

  // Function to open filter menu
  const handleFiltersClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close filter menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle filter selection
  const handleFilterSelect = (filter) => {
    console.log(`Filter by: ${filter}`);
    handleClose(); // Close menu after selecting a filter
    // Add filtering logic here based on selected filter
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
    <Box className="bg-white">
      <SidePanel />

      <Box display="flex" justifyContent="center" className="p-7">
        {/* Filters Button */}
        <Button
          variant="outlined"
          onClick={handleFiltersClick}
          style={{
            margin: '0 10px',
            background: 'linear-gradient(to right, #41295a 0%, #2F0743  51%, #41295a  100%)',
            color: 'white',
            padding: '10px 30px',
            border: 'none', // Remove border
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
            transition: 'all 0.3s ease', // Smooth transition for hover effect
          }}
        >
          Filters
        </Button>

        {/* Menu for Filters */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Typography variant="h6" style={{ padding: '10px',color:'black' }}>
            Select Price
          </Typography>
          <MenuItem onClick={() => handlePriceFilter('$0 - $50')}>$0 - $50</MenuItem>
          <MenuItem onClick={() => handlePriceFilter('$51 - $100')}>$51 - $100</MenuItem>
          <MenuItem onClick={() => handlePriceFilter('$101 - $200')}>$101 - $200</MenuItem>
          

          <Typography variant="h6" style={{ padding: '10px',color:'black' }}>
            Select Color
          </Typography>
          <Box display="flex" flexDirection="row" justifyContent="space-between" width="200px" padding="10px">
            <Box display="flex" flexDirection="column">
              <MenuItem onClick={() => handleColorFilter('Red')}>White</MenuItem>
              <MenuItem onClick={() => handleColorFilter('Blue')}>Blue</MenuItem>
            </Box>
            <Box display="flex" flexDirection="column">
              <MenuItem onClick={() => handleColorFilter('Green')}>Yellow</MenuItem>
              <MenuItem onClick={() => handleColorFilter('Black')}>Black</MenuItem>
            </Box>
            </Box>
        </Menu>

        {/* All Products Button */}
        <Button
          variant="outlined"
          onClick={() => handleCategoryFilter('')}
          style={{
            margin: '0 10px',
            background: 'linear-gradient(to right, #41295a 0%, #2F0743  51%, #41295a  100%)',
            color: 'white',
            padding: '10px 30px',
            border: 'none', // Remove border
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
            transition: 'all 0.3s ease', // Smooth transition for hover effect
          }}
        >
          All Products
        </Button>

        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => handleCategoryFilter(category)}
            style={{
              margin: '0 10px',
              background: 'linear-gradient(to right, #41295a 0%, #2F0743  51%, #41295a  100%)',
              color: 'white',
              padding: '10px 20px',
              border: 'none', // Remove border
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow
              transition: 'all 0.3s ease', // Smooth transition for hover effect
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Box display="flex" flexWrap="wrap" justifyContent="center">
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
    </Box>
  );
};

export default Dashboard;
