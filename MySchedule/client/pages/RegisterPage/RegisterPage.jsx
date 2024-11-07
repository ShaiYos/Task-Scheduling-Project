import { useState } from "react";
import { Grid, TextField, Button, Box, InputAdornment, Link, Typography , FormHelperText, MenuItem, InputLabel, FormControl, Select  } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useThemeContext } from '../../src/components/ThemeContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageIcon from '@mui/icons-material/Image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Import calendar icon

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
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [repeatPasswordError, setRepeatPasswordError] = useState("");
    const [genderError, setGenderError] = useState("");

    
    const navigate = useNavigate(); 
    const { mode } = useThemeContext(); 

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg']; // Specify valid image types
            if (validTypes.includes(file.type)) {
                setUploadMessage('Valid image file uploaded.');
            } else {
                setUploadMessage('Invalid file type. Please upload a JPEG, PNG, or JPG image.');
            }
        } else {
            setUploadMessage('No file selected.');
        }
    };

    const handleLoginLink = () => navigate('/login');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Reset error states first
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setRepeatPasswordError("");
        setGenderError("");
    
        // Basic validation
        let hasError = false;
    
        if (!username) {
            setUsernameError("Username is required.");
            hasError = true;
        }
    
        if (!email) {
            setEmailError("Email is required.");
            hasError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            hasError = true;
        }
    
        if (!password) {
            setPasswordError("Password is required.");
            hasError = true;
        }
    
        if (password !== repeatPassword) {
            setRepeatPasswordError("Passwords do not match.");
            hasError = true;
        }
    
        if (!gender) {
            setGenderError("Please select a gender.");
            hasError = true;
        }
    
        // If there are errors, prevent the form from being submitted
        if (hasError) return;
    
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
                navigate('/login');
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    setUsernameError("User already registered");
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
            className={`register-page-container ${mode}`} 
            sx={{
                borderRadius: '20px',
                p: 10, 
                position: 'relative',
                width: '800px', 
                maxWidth: '100%', 
            }}
        >
            <Typography className="sign-up-title" variant="h4" align="center" gutterBottom>
                Sign-Up
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                    {/* Username field with error handling */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                className="custom-textfield"
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
                                error={!!usernameError}
                            />
                            {usernameError && (
                                <FormHelperText error sx={{ ml: 0 }}>
                                    {usernameError}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Email field with error handling */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                className="custom-textfield"
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
                                error={!!emailError}
                            />
                            {emailError && (
                                <FormHelperText error sx={{ ml: 0 }}>
                                    {emailError}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Password field with error handling */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                className="custom-textfield"
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
                                error={!!passwordError}
                            />
                            {passwordError && (
                                <FormHelperText error sx={{ ml: 0 }}>
                                    {passwordError}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Repeat Password field with error handling */}
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                className="custom-textfield"
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
                                error={!!repeatPasswordError}
                            />
                            {repeatPasswordError && (
                                <FormHelperText error sx={{ ml: 0 }}>
                                    {repeatPasswordError}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Gender field with error handling */}
                        <FormControl className="custom-textfield" fullWidth variant="outlined" error={!!genderError}>
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                label="Gender"
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            {genderError && (
                                <FormHelperText sx={{ ml: 0 }}>
                                    {genderError}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth variant="outlined">
                            <DatePicker
                                className="custom-textfield"
                                id='date-picker'
                                label="Date of Birth"
                                value={dob}
                                onChange={(newValue) => setDob(newValue)}
                                textField={(params) => (
                                    <TextField
                                        {...params}
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CalendarTodayIcon /> {/* Calendar icon added here */}
                                                </InputAdornment>
                                            ),
                                        }}
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
                                <Typography variant="body2" sx={{ marginLeft:'5px' ,marginTop: '8px', color: uploadMessage.includes('Invalid') ? 'red' : 'green' }} >
                                {uploadMessage}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Typography variant="body2" color="error" align="center">
                                {error}
                            </Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ height: '48px' }}
                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" align="center">
                            Already have an account?{" "}
                            <Link onClick={handleLoginLink} underline="hover" className="login-link" sx={{ fontWeight: "bold" }}>
                                Log In
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
