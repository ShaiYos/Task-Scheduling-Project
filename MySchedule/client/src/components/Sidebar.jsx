import React, { useEffect, useState } from 'react';
import { Drawer, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from './LoginContext';
import { useThemeContext } from './ThemeContext';

const Sidebar = ({ open, onClose, toggleSidebar }) => {
  const navigate = useNavigate();
  const { loggedIn, logoutUser } = useLoginContext();
  const { mode } = useThemeContext();

  // local state to control the logged-in state in Sidebar
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

  // Update local state whenever loggedIn in context changes
  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);

  const handleNavigation = (path) => {
    if (path === '/logout') {
      logoutUser(); // Call logoutUser to update the state
      setIsLoggedIn(false); // Immediately update the local state
      onClose(); // Close the sidebar
      navigate('/'); // Navigate to the landing page
    } else {
      navigate(path); // Navigate to the specified path
      onClose(); // Close the sidebar after navigation
    }
  };

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          color: mode === 'light' ? 'black' : 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box
          sx={{
            width: 250,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            bgcolor: 'background.default',
          }}
        >
          {/* Logo at the top */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
            <img src={'./logo.png'} alt="App Logo" style={{ width: '80%', height: 'auto' }} />
          </Box>
          <List>
            {(isLoggedIn ? [ // If the user is logged in, show these links
              { text: 'Home', path: '/home' },
              { text: 'Profile', path: '/profile' },
              { text: 'Task Scheduler', path: '/task-scheduler' },
              { text: 'Motivational Quotes', path: '/motivation' },
              { text: 'Logout', path: '/logout' }
            ] : [ // If the user is not logged in, show these links
              { text: 'Landing Page', path: '/' },
              { text: 'Login', path: '/login' },
              { text: 'Sign Up', path: '/register' }
            ]) // Map over the selected links
            .map(({ text, path }) => (
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
