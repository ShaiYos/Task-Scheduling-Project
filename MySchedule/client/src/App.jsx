
// Main application component
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LandingPage from '../pages/LandingPage/LandingPage';
import TaskSchedulerPage from '../pages/TaskSchedulerPage/TaskSchedulerPage';
import { ThemeContextProvider, useThemeContext } from './components/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AuthWrapper from './components/AuthWrapper/AuthWrapper.jsx';
import LogoutButton from './components/LogoutButton.jsx';
import { LoginProvider } from './components/LoginContext.jsx'; // Use curly braces for named import


import './App.css';

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


function App() {
  return (
    <ThemeContextProvider>
      <LoginProvider> {/* Wrap the app with LoginContext */}
        <ThemeToggleButton />
        <Box id="root" sx={{ position: 'relative', height: '100%' }}>
          <BrowserRouter>
            <LogoutButton />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/task-scheduler" element={<AuthWrapper><TaskSchedulerPage /></AuthWrapper>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </LoginProvider>
    </ThemeContextProvider>
  );
}
export default App;
