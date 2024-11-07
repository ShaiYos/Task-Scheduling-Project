import { useState } from "react";
import { Grid, TextField, Button, Box, InputAdornment, Link, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useThemeContext } from '../../src/components/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import { useLoginContext } from "../../src/components/LoginContext";
import "./LoginPage.css"; // Import the CSS file

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { mode } = useThemeContext();
    const navigate = useNavigate();
    const { loginUser } = useLoginContext();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/login`, {
                username: username.toLowerCase(),
                password,
            });

            if (response.status === 200) {
                loginUser(response.data.userId);
                localStorage.setItem('username', username);
                navigate('/home');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    const handleRegisterLink = () => navigate('/register');

    return (
        <Box
            className={`login-page-container ${mode}`}
            sx={{
                borderRadius: '20px',
                p: 10, 
                position: 'relative',
                width: '500px', 
                maxWidth: '100%', 
            }}
        >
            <Typography className="login-title" variant="h4" align="center" gutterBottom>
                Log In
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                className="custom-textfield"
                                variant="outlined"
                                value={username}
                                onChange={handleUsernameChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                label="Username"
                                placeholder="Enter your username" 
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                className="custom-textfield"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={handlePasswordChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                label="Password"
                                placeholder="Enter your password" 
                            />
                        </FormControl>
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Box sx={{ color: 'red', textAlign: 'center', mb: 1 }}>{error}</Box>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button className="loginBtn" type="submit" variant="contained" color="primary" fullWidth>
                            Log In
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="body1">
                            Don't have an account?
                            <Link onClick={handleRegisterLink} underline="hover" className="register-link" sx={{ fontWeight: "bold" }}>
                                sign Up
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
