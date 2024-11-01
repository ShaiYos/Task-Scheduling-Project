import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useThemeContext } from '../../src/components/ThemeContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Link from '@mui/material/Link';
import axios from 'axios';
import { useLoginContext } from "../../src/components/LoginContext";

import "./LoginPage.css"; // Import the new CSS file

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variables

export default function LoginPage() {
    const [username, setUsername] = useState(""); // state variable to manage username
    const [password, setPassword] = useState(""); // state variable to manage password
    const [error, setError] = useState(""); // State to track error messages
    const { mode } = useThemeContext(); // Accessing theme context for light/dark mode
    const navigate = useNavigate(); // Hook to navigate to another route
    const { loginUser } = useLoginContext(); // Access loginUser from context

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
                username: username.toLowerCase(), // Lowercase username for consistency,
                password,
            });

            if (response.status === 200) {
                console.log("Login successful", response.data);
                loginUser(response.data.userId); // Call loginUser from context to update the state with user ID
                navigate('/task-scheduler');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Check if the error response indicates an authentication failure
                if (error.response?.status === 401) {
                    setError('Invalid username or password');
                } else {
                    setError('An error occurred. Please try again later.');
                }
            } else {
                setError('An error occurred. Please try again later.');
            }
            console.error('Login error:', error);
        }
    };

    // Handler for navigating to the registration page
    const handleRegister = () => {
        navigate('/register'); // Navigate to the register page
    };

    return (
        <Box
            className={`centered-box ${mode}`}
            sx={{
                border: mode === 'light' ? '1px solid #444' : '1px solid #eaeaea',
                borderRadius: '20px',
                p: 3,
                position: 'relative',
                width: 350,
            }}
        >

            <Box>
                <h2 className="login-title">Log In</h2>
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
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: mode === 'dark' ? '#747bff' : '#007bff;'
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: mode === 'dark' ? '#747bff' : '#007bff;'
                                },
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
                            sx={{
                                '& .MuiOutlinedInput-root.Mui-focused': {
                                    '& fieldset': {
                                        borderColor: mode === 'dark' ? '#747bff' : '#007bff;'
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: mode === 'dark' ? '#747bff' : '#007bff;'
                                },
                            }}
                        />
                    </Box>
                    {error && <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>}
                    <Button className="loginButton" type="submit" variant="contained" color="primary" fullWidth>
                        Log In
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                        <p style={{ marginRight: 5 }}>Don't have an account?</p>
                        <Link className="registerLink" onClick={handleRegister} underline="hover">
                            {'Register'}
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}