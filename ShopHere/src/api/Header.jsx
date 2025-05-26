'use client'
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({ cartCount }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    console.log('Logout clicked');
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    setUsername(''); 
    setAnchorEl(null);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, {
        email,
        password,
      });
      console.log('Response data:', response.data); // Check if username is present

      console.log('Login successful:', response.data);

      // Store user information or token if required
      localStorage.setItem('userToken', response.data.token); 
      localStorage.setItem('username', response.data.username); 
      console.log('Username on load:', localStorage.getItem('username'));

      setUsername(response.data.username);
      


      handleCloseModal(); 
      navigate('/'); 
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setemail(''); 
    setPassword(''); 
  };

  return (
    <AppBar position="sticky" sx={{ boxShadow: 'none', borderBottom: '2px solid black', 
      background: 'linear-gradient(to right, #DD5E89 0%, #F7BB97  51%, #DD5E89  100%)'

     }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Show username if logged in, otherwise show welcome message */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000000', marginLeft: '18px', fontFamily: 'Bercelony' }}>
            {username ? `${username}!` : 'Welcome!'}
          </Typography>
        </Box>


        {/* Center: Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '30px' }}>
          <InputBase
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for what you need..."
            sx={{
              backgroundColor: 'white',
              borderRadius: '4px',
              border: '1px solid black',
              padding: '8px',
              width: '60%',
              '&:hover': {
                backgroundColor: 'white',
              },
            }}
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>

        {/* Right: Login, User, and Cart icons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!username && ( // Show login button only if not logged in
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)} // Open modal on button click
              sx={{
                background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
                color: 'white',
                marginRight: '50px',
              }}
            >

            Login
          </Button>
        )}
          <IconButton aria-label="user" onClick={handleMenuClick}>
            <AccountCircle sx={{ color: 'black', fontSize: '35px' }} />
          </IconButton>

          <IconButton aria-label="cart" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon sx={{ color: 'black', fontSize: '35px' }} />
            </Badge>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleMenuItemClick}>Logout</MenuItem>
          </Menu>
        </Box>

        {/* Login Modal */}
        <Dialog 
      open={openModal} 
      onClose={handleCloseModal} 
      className="relative z-50"
    >
      <DialogTitle className="text-center text-2xl font-bold">Login</DialogTitle>
      <DialogContent className="w-200 h-50"> 
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email" 
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          sx={{
            marginTop: '20px',
            '&:hover': {
              backgroundColor: '#BFDBFE', 
            },
          }}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginTop: '50px',
            '&:hover': {
              backgroundColor: '#BFDBFE', // bg-blue-200 equivalent
            },
          }}
        
        />
      </DialogContent>
      <DialogActions className="flex flex-col items-center mt-8">
  <div className="flex space-x-4">
    <Button 
      onClick={handleCloseModal} 
      sx={{
        backgroundColor: '#E5E7EB', // bg-gray-200 equivalent
        color: 'black', // Black text to match the new background
        '&:hover': {
          backgroundColor: '#D1D5DB', // Hover effect with slightly darker gray (bg-gray-300)
        },
      }}
    >
      Cancel
    </Button>
    <Button 
      onClick={handleLogin}               
      sx={{
        background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
        color: 'white',
        marginRight: '50px',
      }}
    >
      Login
    </Button>
  </div>
  <p className="mt-6 text-sm ">
    <spam className="mr-8">Don't have an account? </spam>
    <Button
      component={Link}
      to="/signup" // Link to signup page
      variant="contained"
      onClick={handleCloseModal} // Close the modal before navigating
      sx={{
        background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
        color: 'white',
        marginLeft:'6',
      }}
    >
      Sign Up
    </Button>
  </p>
</DialogActions>

    </Dialog>
        </Toolbar>
    </AppBar>
  );
};

export default Header;
