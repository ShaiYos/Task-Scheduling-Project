
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { LoginProvider } from './components/LoginContext';
import { ThemeContextProvider } from './components/ThemeContext'; // Import your ThemeContextProvider
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <ThemeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </LoginProvider>
  </StrictMode>
);

