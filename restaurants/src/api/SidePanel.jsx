import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ContactsIcon from '@mui/icons-material/Contacts';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(false); // Control drawer open state

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  // List of items with text and icons
  const iconList = [
    { text: 'Cart', icon: <ShoppingCartIcon sx={{ color: 'black' }} /> },
    { text: 'Wishlist', icon: <FavoriteIcon sx={{ color: 'black' }} /> },
    { text: 'Profile', icon: <PersonIcon sx={{ color: 'black' }} /> },
    { text: 'Categories', icon: <CategoryIcon sx={{ color: 'black' }} /> },
    { text: 'Contacts', icon: <ContactsIcon sx={{ color: 'black' }} /> },
    { text: 'About Me', icon: <InfoIcon sx={{ color: 'black' }} /> },
  ];

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" margin-left="20px" aria-label="menu">
        <MenuIcon sx={{ color: 'black' }} />
      </IconButton>

      {/* Drawer (Side panel) */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)} // Close when clicking outside
        variant="persistent" // Keeps drawer visible for icon-only mode
        sx={{
          '& .MuiDrawer-paper': {
            width: isOpen ? 240 : 60, // Full width when open, small when closed
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            backgroundColor: '#FFEBEE', // Use a pink color (you can adjust this color)
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
          sx={{ width: '100%', mt: 3 }} // Added margin-top for space between items
          role="presentation"
          onKeyDown={toggleDrawer(false)} // Close on key down (e.g., Escape)
        >
          <List>
            {iconList.map((item, index) => (
              <ListItem button key={index} sx={{ mb: 2, justifyContent: isOpen ? 'flex-start' : 'center' }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={item.text} sx={{ ml: 2 }} />}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
