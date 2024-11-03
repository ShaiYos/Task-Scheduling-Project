// HomePage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../src/components/ThemeContext';

const HomePage = () => {
  const { mode } = useThemeContext(); // Get the mode from the context
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: mode === 'dark' ? '#444' : '#eaeaea',
        color: mode === 'dark' ? '#ffffff' : '#000000',
        padding: 20,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome{username ? `, ${username}` : ''}!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Manage your tasks efficiently and effectively.
      </Typography>
    </Box>
  );
};

export default HomePage;
