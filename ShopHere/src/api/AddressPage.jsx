// AddressPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

export const AddressPage = () => {
  const [addresses, setAddresses] = useState([]); // Store address list
  const [newAddress, setNewAddress] = useState(''); // Store new address input
  const [editingIndex, setEditingIndex] = useState(null); // Track editing address

  // Handle adding a new address
  const handleAddAddress = () => {
    if (newAddress.trim()) {
      setAddresses([...addresses, newAddress]);
      setNewAddress('');
    }
  };

  // Handle editing an existing address
  const handleEditAddress = (index) => {
    setNewAddress(addresses[index]);
    setEditingIndex(index);
  };

  // Save the edited address
  const handleSaveAddress = () => {
    const updatedAddresses = [...addresses];
    updatedAddresses[editingIndex] = newAddress;
    setAddresses(updatedAddresses);
    setNewAddress('');
    setEditingIndex(null);
  };

  // Handle deleting an address
  const handleDeleteAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 2 }}>
      <h2>Manage Addresses</h2>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Add/Edit Address"
          fullWidth
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        {editingIndex !== null ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveAddress}
          >
            Save Address
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddAddress}
          >
            Add Address
          </Button>
        )}
      </Box>

      {/* Address List */}
      <List>
        {addresses.map((address, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditAddress(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAddress(index)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={address} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
