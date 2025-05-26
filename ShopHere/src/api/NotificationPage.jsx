// src/components/NotificationPage.jsx

import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const notifications = [
  { id: 1, message: "Your order #1234 has been shipped!", date: "2024-10-20" },
  { id: 2, message: "New items are available in your favorite category!", date: "2024-10-19" },
  { id: 3, message: "Don't miss our 20% off sale this weekend!", date: "2024-10-18" },
  // Add more notifications as needed
];

const NotificationPage = () => {
  return (
    <Box sx={{ padding: '40px' }} className="min-h-screen p-4 px-4 py-8">
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map(notification => (
          <ListItem key={notification.id}>
            <ListItemText
              primary={notification.message}
              secondary={notification.date}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NotificationPage;
