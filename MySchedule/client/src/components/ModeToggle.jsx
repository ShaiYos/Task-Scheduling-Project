import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import IconButton from '@mui/material/IconButton';
import { useThemeContext } from './ThemeContext';

// Component for theme toggle button (Light/Dark mode)
function ModeToggle() {
  const { mode, toggleTheme } = useThemeContext(); // Access theme mode and toggle function

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: 'fixed',
        top: { xs: '1rem', sm: '1.5rem' },
        right: { xs: '1rem', sm: '1.5rem' },
        zIndex: 1000,  // Ensures it stays on top
        borderRadius: '50%',
        // color: mode === 'light' ? 'black' : 'white', // Icon color based on theme
        fontSize: '1.5rem', // Sets a responsive font size for the icons
      }}
    >
      {/* Icon changes based on the current theme (light or dark) */}
      {mode === 'light' ? <NightlightIcon fontSize="inherit" /> : <WbSunnyIcon fontSize="inherit" />}
    </IconButton>
  );
}

export default ModeToggle;
