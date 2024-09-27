import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ToDoList from './components/ToDoList'
import LoginPage from '../client/pages/LoginPage'
import RegisterPage from '../client/pages/RegisterPage'
import LandingPage from '../client/pages/LandingPage'
import { ThemeContextProvider, useThemeContext } from './components/ThemeContext' 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import './App.css'




function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton
        onClick={toggleTheme}
        sx={{ position: 'absolute', top: 10, right: 10 }}
    >
        {mode === 'light' ? <WbSunnyIcon /> : <NightlightIcon />}
    </IconButton>
);
}

function App() {
  return (
    
      <ThemeContextProvider>
        <ThemeToggleButton />
          <Box id="root"sx={{ position: 'relative', height: '100vh' }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </BrowserRouter>
          </Box>
      </ThemeContextProvider>
  );
}

export default App
