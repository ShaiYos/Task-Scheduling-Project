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
// import './RegisterPage.css';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const changeUsername = (e) => {
        const newValue = e.target.value;
        setUsername(newValue);
    };

    const changeEmail = (e) => {
        const newValue = e.target.value;
        setEmail(newValue);
    };

    const changePassword = (e) => {
        const newValue = e.target.value;
        setPassword(newValue);
    };

    const changeRepeatPassword = (e) => {
        const newValue = e.target.value;
        setRepeatPassword(newValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/register`, {
                username: username.toLowerCase(),
                email,
                password,
            });

            if (response.status === 201) {
                setError("");
                navigate('/login');
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response.status === 409) {
                    setError("User already registered");
                } else {
                    setError("Registration failed");
                }
            } else {
                setError("Something went wrong");
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