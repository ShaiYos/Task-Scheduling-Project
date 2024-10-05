import { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a new context for managing the theme (light/dark mode)
const ThemeContext = createContext();

// Custom hook to access the theme context easily in other components
export const useThemeContext = () => useContext(ThemeContext);

// Context provider component to wrap around parts of the app that need access to the theme
export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light'); // State to track the current theme mode ('light' or 'dark')

    // Memoize the theme object to avoid unnecessary recalculations when mode changes
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode, // Use the current mode (either 'light' or 'dark') for the theme palette
                },
            }),
        [mode] // Recalculate theme only when 'mode' changes
    );

    // Function to toggle between light and dark mode
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        // Provide the current mode and toggle function to the context consumers
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};