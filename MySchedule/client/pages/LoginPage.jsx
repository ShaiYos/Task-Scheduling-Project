import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useThemeContext } from '../src/components/ThemeContext'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { mode, toggleTheme } = useThemeContext();
    const navigate = useNavigate(); // Initialize useNavigate

    const changeUsername = (e) => {
        const newValue = e.target.value;
        setUsername(newValue);
    };

    const changePassword = (e) => {
        const newValue = e.target.value;
        setPassword(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Username:", username);
        console.log("Password:", password);
        navigate('/task-scheduler');
    };

    return (
        <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 2, p: 3, position: 'relative', maxWidth: 300, mx: 'auto', mt: 5 }}>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        value={username}
                        name="username"
                        onChange={changeUsername}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        name="password"
                        onChange={changePassword}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOpenIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Log In
                </Button>
            </form>
        </Box>
    );
}