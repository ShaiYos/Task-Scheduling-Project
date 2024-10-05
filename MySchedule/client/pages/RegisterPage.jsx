import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

// Backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook to navigate to a different route

    // Update username state
    const changeUsername = (e) => {
        const newValue = e.target.value;
        setUsername(newValue);
    };
    // Update email state
    const changeEmail = (e) => {
        const newValue = e.target.value;
        setEmail(newValue);
    };
    // Update password state
    const changePassword = (e) => {
        const newValue = e.target.value;
        setPassword(newValue);
    };
    // Update repeatPassword state
    const changeRepeatPassword = (e) => {
        const newValue = e.target.value;
        setRepeatPassword(newValue);
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior (page reload)
    
        try {
            // Send a POST request to the backend to log in the user
            const response = await axios.post(`${BACKEND_URL}/login`, {
                username: username.toLowerCase(), // Lowercase username for consistency
                password,
            });
    
            // If login is successful, navigate to the task scheduler page
            if (response.status === 200) {
                setError(""); // Clear any existing error messages
                navigate('/task-scheduler'); // Redirect to the task scheduler page
            } else {
                throw new Error("Login failed");
            }
        } catch (error) {
            // Handle different error responses
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    setError("Invalid username or password"); // Handle invalid credentials
                } else {
                    setError("Login failed"); // Generic error message for other status codes
                }
            } else {
                setError("Something went wrong"); // Handle non-Axios errors
            }
        }
    };
    

    return (
        <Box sx={{ border: 1, borderColor: 'grey.500', borderRadius: 2, p: 3, position: 'relative', maxWidth: 300, mx: 'auto', mt: 5 }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        id="outlined-username-input"
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
                        id="outlined-email-input"
                        label="Email"
                        variant="outlined"
                        value={email}
                        name="email"
                        onChange={changeEmail}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
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
                <Box sx={{ mb: 2 }}>
                    <TextField
                        id="outlined-repeat-password-input"
                        label="Repeat Password"
                        type="password"
                        value={repeatPassword}
                        name="repeatPassword"
                        onChange={changeRepeatPassword}
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
                {error && <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </Box>
    );
}