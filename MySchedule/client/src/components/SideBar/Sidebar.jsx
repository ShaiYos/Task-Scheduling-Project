import React, { useEffect, useState } from 'react';
import { Drawer, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../LoginContext';
import { useThemeContext } from '../ThemeContext';

const Sidebar = ({ open, onClose, toggleSidebar }) => {
  const navigate = useNavigate();
  const { loggedIn, logoutUser } = useLoginContext();
  const { mode } = useThemeContext();

  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logoutUser();
      setIsLoggedIn(false);
      onClose();
      navigate('/');
    } else {
      navigate(path);
      onClose();
    }
  };

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          top: { xs: '1rem', sm: '1.5rem' },
          left: { xs: '1rem', sm: '1.5rem' },
          color: mode === 'light' ? 'black' : 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          sx={{
            width: { xs: '12.5rem', sm: '15rem', md: '18.75rem' },
            padding: { xs: '1rem', sm: '1.25rem' },
            display: 'flex',
            flexDirection: 'column',
            height: {
              xs: '100vh',       // Full height on smaller screens
              // sm: '90vh',        // Slightly shorter height on medium screens
              // md: '80vh',        // Even shorter on larger screens
            },
            bgcolor: 'background.default',
            overflowY: 'auto',   // Adds scrolling if content exceeds height
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <img
              src={'./logo.png'}
              alt="App Logo"
              style={{
                width: '80%',
                maxWidth: '15rem',
                height: 'auto',
              }}
            />
          </Box>
          <List>
            {(isLoggedIn
              ? [
                { text: 'Home', path: '/home' },
                { text: 'Profile', path: '/profile' },
                { text: 'Task Scheduler', path: '/task-scheduler' },
                { text: 'Motivational Quotes', path: '/motivation' },
                { text: 'Logout', path: '/logout' },
              ]
              : [
                { text: 'Landing Page', path: '/' },
                { text: 'Login', path: '/login' },
                { text: 'Sign Up', path: '/register' },
              ]
            ).map(({ text, path }) => (
              <ListItem button='true' key={text} onClick={() => handleNavigation(path)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
