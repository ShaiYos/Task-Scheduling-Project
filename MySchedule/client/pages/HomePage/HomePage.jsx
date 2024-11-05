// HomePage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useThemeContext } from '../../src/components/ThemeContext';
import { useNavigate } from 'react-router-dom'; // To handle navigation

const HomePage = () => {
  const { mode } = useThemeContext(); // Get the mode from the context
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Click handlers to navigate to respective pages
  const goToTaskScheduling = () => navigate('/task-scheduler');
  const goToProfile = () => navigate('/profile');
  const goToMotivationQuotes = () => navigate('/motivation');

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
      <Typography variant="h3" gutterBottom>
        Welcome{username ? `, ${username}` : ''}!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Manage your tasks efficiently and effectively.
      </Typography>
      
      {/* Image grid for navigation */}
      <Box
        sx={{
          display: 'flex',
          gap: 6, // Increased gap between images
          mt: 5,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Task Scheduling Image */}
        <IconButton
          onClick={goToTaskScheduling}
          disableRipple // Disable ripple effect
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            '&:hover img, &:hover .text': {
              transform: 'scale(1.1)', // Scale up on hover
            },
            transition: 'transform 0.3s ease', // Smooth transition for the button
          }}
        >
          <img
            src="/tasks.jpg" // Replace with your image path
            alt="Task Scheduling"
            style={{
              width: 150,
              height: 150,
              borderRadius: '8px',
              transition: 'transform 0.3s ease', // Smooth transition for image
            }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 1.5, transition: 'transform 0.3s ease', fontSize: '1rem' }} // Increased margin-top for text
            className="text" // Added class name for hover scaling
          >
            Task Scheduling
          </Typography>
        </IconButton>

        {/* Profile Image */}
        <IconButton
          onClick={goToProfile}
          disableRipple // Disable ripple effect
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            '&:hover img, &:hover .text': {
              transform: 'scale(1.1)', // Scale up on hover
            },
            transition: 'transform 0.3s ease', // Smooth transition for the button
          }}
        >
          <img
            src="/user.png"
            alt="Profile"
            style={{
              width: 150,
              height: 150,
              borderRadius: '8px',
              transition: 'transform 0.3s ease', // Smooth transition for image
            }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 1.5, transition: 'transform 0.3s ease', fontSize: '1rem' }} // Increased margin-top for text
            className="text" // Added class name for hover scaling
          >
            Profile
          </Typography>
        </IconButton>

        {/* Motivation Quotes Image */}
        <IconButton
          onClick={goToMotivationQuotes}
          disableRipple // Disable ripple effect
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            '&:hover img, &:hover .text': {
              transform: 'scale(1.1)', // Scale up on hover
            },
            transition: 'transform 0.3s ease', // Smooth transition for the button
          }}
        >
          <img
            src="/motivation.jpeg" // Replace with your image path
            alt="Motivation Quotes"
            style={{
              width: 150,
              height: 150,
              borderRadius: '8px',
              transition: 'transform 0.3s ease', // Smooth transition for image
            }}
          />
          <Typography
            variant="body1"
            sx={{ mt: 1.5, transition: 'transform 0.3s ease', fontSize: '1rem' }} // Increased margin-top for text
            className="text" // Added class name for hover scaling
          >
            Motivation Quotes
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default HomePage;
