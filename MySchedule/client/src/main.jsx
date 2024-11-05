import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import './index.css';
import { LoginProvider } from './components/LoginContext';
import { ThemeContextProvider } from './components/ThemeContext'; // Import your ThemeContextProvider
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import your date adapter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <ThemeContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Wrap your app here */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocalizationProvider>
      </ThemeContextProvider>
    </LoginProvider>
  </StrictMode>
);
