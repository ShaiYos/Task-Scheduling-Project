// HomePage.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../src/components/ThemeContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { mode } = useThemeContext(); // Get the mode from the context

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100%',
        bgcolor: mode === 'dark' ? '#333' : '#f5f5f5',
        color: mode === 'dark' ? '#ffffff' : '#000000',
        padding: 20,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Your Task Management App!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Manage your tasks efficiently and effectively.
      </Typography>
    </Box>
  );
};

export default HomePage;
