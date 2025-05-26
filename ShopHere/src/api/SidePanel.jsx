import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Fab, // Import Fab for floating action button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import the Notifications icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false); // Control drawer open state
  const [showButton, setShowButton] = useState(false); // State for showing floating button
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  // Handle scroll event to show/hide the floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // Show button after scrolling down 100px
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup the event listener
    };
  }, []);

  // List of items with text and icons
  const iconList = [
    { text: 'Cart', icon: <ShoppingCartIcon sx={{ color: 'black' }} />, onClick: () => navigate('/cart') },
    { text: 'Wishlist', icon: <FavoriteIcon sx={{ color: 'black' }} />, onClick: () => navigate('/wishlist') },
    { text: 'Profile', icon: <PersonIcon sx={{ color: 'black' }} />, onClick: () => navigate('/account') }, 
    { text: 'Categories', icon: <CategoryIcon sx={{ color: 'black' }} />,onClick: () => navigate('/categories') },
    { text: 'Notification', icon: <NotificationsIcon sx={{ color: 'black' }} />,onClick: () => navigate('/notification') }, // Updated to use Notifications icon
    { text: 'About Me', icon: <InfoIcon sx={{ color: 'black' }} />,onClick: () => navigate('/about') },
  ];

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          display: showButton ? 'none' : 'block',
          color:'white',
          borderRadius: '50%',
          width: 46, 
          height: 46,
          ml:2,
        }}
      >
        <MenuIcon
          sx={{
            background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)', // Gradient background
            width: 36,
            height: 36,
            borderRadius: '10%',
          }}
        />
      </IconButton>

      {/* Drawer (Side panel) */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)} 
        variant="persistent" 
        sx={{
          '& .MuiDrawer-paper': {
            width: isOpen ? 240 : 60, 
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            backgroundColor: '#FFEBEE',
            mt:'64px', 
          },
        }}
      >
        {/* Close Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* List of Items */}
        <Box
          sx={{ width: '100%', mt: 3 }} 
          role="presentation"
          onKeyDown={toggleDrawer(false)} 
        >
          <List>
            {iconList.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={item.onClick} // Call the onClick function here
                sx={{ mb: 2, justifyContent: isOpen ? 'flex-start' : 'center' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={item.text} sx={{ ml: 2 }} />}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Floating Action Button */}
      {showButton && (
        <Box sx={{
          position: 'fixed',
          bottom: '40%',
          left: 16,
          background: 'white',
        }}>
          <Fab 
            onClick={toggleDrawer(true)} 
            sx={{ borderRadius: '50%',
              color: 'white',
              width: 56, height: 56 }} // Half-radius size button
          >
            <MenuIcon
              sx={{
                background: 'linear-gradient(to right, #41295a 0%, #2F0743 51%, #41295a 100%)', // Gradient background
                width: 34,
                height: 34,
                borderRadius: '50%',
              }}
            />          
          </Fab>
        </Box>
      )}
    </>
  );
};
