import React, { useState } from 'react';
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
  const [openModal, setOpenModal] = useState(false); // State to manage modal visibility
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = () => {
    console.log('Logout clicked');
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUsername(''); // Reset username
    setPassword(''); // Reset password
  };

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    // Add login logic here
    handleCloseModal(); // Close modal after login attempt
  };


  return (
    <AppBar position="sticky" sx={{ boxShadow: 'none', borderBottom: '2px solid black', backgroundColor: '#FFEEEE' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#000000',
              textDecoration: 'none',
              marginLeft: '18px',
              fontFamily: 'Bercelony', // Apply Bercelony font here
            }}
          >
            Welcome!
          </Typography>
        </Box>

        {/* Center: Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '30px' }}>
          <InputBase
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for what you need..."
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '4px',
              border: '1px solid black',
              padding: '8px',
              width: '60%', // Make it wider for better usability
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
          <Button
            variant="contained"
            onClick={handleOpenModal} // Open modal on click
            sx={{
              background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
              color: 'white',
              marginRight: '50px', // Space between login and cart icon
              '&:hover': {
                background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)',
              },
            }}
          >
            Login
          </Button>

          <IconButton aria-label="user" onClick={handleMenuClick}>
            <AccountCircle sx={{ color: 'black', fontSize: '35px' }} />
          </IconButton>
          <IconButton aria-label="cart">
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon sx={{ color: 'black', fontSize: '35px' }} />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleMenuItemClick}>Logout</MenuItem>
          </Menu>
        </Box>

        {/* Login Modal */}
        <Dialog open={openModal} onClose={handleCloseModal}>
  <DialogTitle sx={{ textAlign: 'center' }}>Login</DialogTitle>
  <DialogContent>
    <TextField
      autoFocus
      margin="dense"
      label="Username"
      type="text"
      fullWidth
      variant="outlined"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <TextField
      margin="dense"
      label="Password"
      type="password"
      fullWidth
      variant="outlined"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'center' }}>
    <Button
      onClick={handleCloseModal}
      sx={{
        background: 'linear-gradient(to right, #B0B0B0, #E0E0E0)', // Gray gradient
        color: 'black', // Black text
        '&:hover': {
          background: 'linear-gradient(to right, #E0E0E0, #B0B0B0)',
        },
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleLogin}
      sx={{
        background: 'linear-gradient(to right, #41295a, #2F0743)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(to right, #2F0743, #41295a)',
        },
      }}
    >
      Login
    </Button>
  </DialogActions>
</Dialog>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
