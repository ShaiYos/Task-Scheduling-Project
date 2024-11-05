import { useState } from "react";
import { Grid, TextField, Button, Box, InputAdornment, Link, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useThemeContext } from '../../src/components/ThemeContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

    const handleRegister = () => navigate('/register');

    return (
        <Box
            className={`centered-box ${mode}`}
            sx={{
                border: mode === 'light' ? '1px solid #444' : '1px solid #eaeaea',
                borderRadius: '20px',
                p: 4,
                position: 'relative',
                width: 400,
            }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Log In
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
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
                        />
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Box sx={{ color: 'red', textAlign: 'center', mb: 1 }}>{error}</Box>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" >
                            Log In
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link onClick={handleRegister} underline="hover" className="register-link">
                                Register
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
