import React , {useState} from 'react';
import { Drawer, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from './LoginContext';
import { useThemeContext } from './ThemeContext';

const Sidebar = ({ open, onClose, toggleSidebar }) => {
  const navigate = useNavigate();
  const { logoutUser, loggedIn } = useLoginContext();
  const { mode } = useThemeContext();

    const handleNavigation = (path) => {
        if (path === '/logout') {
            logoutUser(); // Call logoutUser to update the state
            console.log("Logged out. Local storage userId:", localStorage.getItem('loggedIn')); // Check value
            setIsVisible(false); // Hide the sidebar immediately
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
          color: mode === 'light'? 'black' : 'white' ,
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
          <List>
            {[ // List of navigation items
              { text: 'Home', path: '/home' },
              { text: 'Task Scheduler', path: '/task-scheduler' },
              { text: 'Profile', path: '/profile' },
              { text: 'Settings', path: '/settings' },
              { text: 'Logout', path: '/logout' }
            ].map(({ text, path }) => (
              <ListItem button="true" key={text} onClick={() => handleNavigation(path)}>
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
