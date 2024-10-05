import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import LandingPage from '../pages/LandingPage'
import TaskSchedulerPage from '../pages/TaskSchedulerPage'
import { ThemeContextProvider, useThemeContext } from './components/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import './App.css'

// Component for theme toggle button (Light/Dark mode)
function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext(); // Access theme mode and toggle function

  return (
    <IconButton
        onClick={toggleTheme}
        sx={{ position: 'absolute', top: 10, right: 10 }}
    >   {/* Icon changes based on the current theme (light or dark) */}
        {mode === 'light' ? <WbSunnyIcon /> : <NightlightIcon />}
    </IconButton>
);
}

// Main application component
function App() {
  return (
      <ThemeContextProvider>
        <ThemeToggleButton /> {/* Add the theme toggle button */}
          <Box id="root"sx={{ position: 'relative', height: '100%' }}>
              <BrowserRouter> {/* Wrapping components with BrowserRouter for routing */}
                <Routes> {/* Define the different routes for the app */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/task-scheduler" element={<TaskSchedulerPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </BrowserRouter>
          </Box>
      </ThemeContextProvider>
  );
}

export default App
