import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useThemeContext } from '../../src/components/ThemeContext'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variables


export default function LoginPage() {
    const [username, setUsername] = useState(""); // state variable to manage username
    const [password, setPassword] = useState(""); // state variable to manage password
    const [error, setError] = useState(""); // State to track error messages
    const { mode, toggleTheme } = useThemeContext(); // Accessing theme context for light/dark mode
    const navigate = useNavigate(); // Hook to navigate to another route

    // Update the username state
    const changeUsername = (e) => {
        const newValue = e.target.value;
        setUsername(newValue);
    };
    // Update the password state
    const changePassword = (e) => {
        const newValue = e.target.value;
        setPassword(newValue);
    };
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
        try {
            const response = await axios.post(`${BACKEND_URL}/login`, {
                username : username.toLowerCase(), // Lowercase username for consistency,
                password,
            });
        
            if (response.status === 200) {
                console.log("Login successful", response.data);
                navigate('/task-scheduler');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Check if the error response indicates an authentication failure
                if (error.response?.status === 401) {
                    alert(error.response.data.message || "Invalid username or password");
                } else {
                    alert("An unexpected error occurred.");
                }
            }
        }
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