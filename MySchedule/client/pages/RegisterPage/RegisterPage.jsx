import { useState } from "react";
import { Grid, TextField, Button, Box, InputAdornment, Link, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useThemeContext } from '../../src/components/ThemeContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageIcon from '@mui/icons-material/Image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import calendar icon
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import "./RegisterPage.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [dob, setDob] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [gender, setGender] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    const { mode } = useThemeContext(); 

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif']; // Specify valid image types
            if (validTypes.includes(file.type)) {
                setUploadMessage('Valid image file uploaded.');
            } else {
                setUploadMessage('Invalid file type. Please upload a JPEG, PNG, or GIF image.');
            }
        } else {
            setUploadMessage('No file selected.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/register`, {
                username: username.toLowerCase(),
                email,
                password,
                gender,
                dateOfBirth: dob ? dob.toISOString() : null, 
                profileImage: profileImage,
            });

            if (response.status === 201) {
                setError("");
                navigate('/login');
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
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
        <Box 
            className={`register-form-container ${mode}`} 
            sx={{
                border: mode === 'light' ? '1px solid #444' : '1px solid #eaeaea', 
                borderRadius: '20px', 
                p: 3, 
                position: 'relative', 
                width: 400
            }}
        >
            <Box>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-username-input"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-email-input"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    label="Email"
                                    placeholder="Enter your email" 
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="outlined-repeat-password-input"
                                    type="password"
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <LockOpenIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    label="Repeat Password"
                                    placeholder="Repeat your password" 
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="gender-select">Gender</InputLabel>
                                <Select
                                    id="gender-select"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    label="Gender"
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <DatePicker
                                    label="Date of Birth"
                                    value={dob}
                                    onChange={(newValue) => setDob(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <InputAdornment position="end" >
                                                        <CalendarTodayIcon /> {/* Calendar icon added here */}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            placeholder="Select your date of birth"
                                        />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                <input
                                    accept="image/*"
                                    id="profile-image-input"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleProfileImageChange}
                                />
                                <label htmlFor="profile-image-input" style={{marginBottom: '15px'}} >
                                    <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                                        Upload Profile Image
                                    </Button>
                                </label>
                                {uploadMessage && (
                                    <Typography variant="body2" sx={{ marginLeft:'5px' ,marginTop: '8px', color: uploadMessage.includes('Invalid') ? 'red' : 'green' }}>
                                    {uploadMessage}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    {error && <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>}
                    <Button type="submit" variant="contained" color="primary" className="registerButton">
                        Register
                    </Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                        <p style={{ marginRight: 5 }}>Already have an account?</p>
                        <Link onClick={() => navigate('/login')} underline="hover">
                            {'Login'}
                        </Link>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}
