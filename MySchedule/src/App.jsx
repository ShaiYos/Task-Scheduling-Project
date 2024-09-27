import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ToDoList from './components/ToDoList'
import LoginPage from '../client/pages/LoginPage'
import RegisterPage from '../client/pages/RegisterPage'
import LandingPage from '../client/pages/LandingPage'
import { ThemeContextProvider, useThemeContext } from './components/ThemeContext' 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import './App.css'




function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeContext();

  return (
      <Button
          onClick={toggleTheme}
          variant="contained"
          color="secondary"
          sx={{ position: 'absolute', top: 10, right: 10 }}
      >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </Button>
  );
}

function App() {
  return (
    
      <ThemeContextProvider>
        <ThemeToggleButton />
          <Box sx={{ position: 'relative', height: '100vh' }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </BrowserRouter>
              {/* You can add other components here */}
          </Box>
      </ThemeContextProvider>
  );
}

export default App
