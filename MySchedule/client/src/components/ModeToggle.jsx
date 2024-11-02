
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
        sx={{ position: 'fixed', top: 10, right: 10 }}
      >   {/* Icon changes based on the current theme (light or dark) */}
        {mode === 'light' ? <NightlightIcon /> : <WbSunnyIcon />}
      </IconButton>
    );
  }
  
export default ModeToggle;