import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Paper } from '@mui/material';
import { CheckCircle, CalendarToday, Favorite } from '@mui/icons-material';
import { useThemeContext } from '../../src/components/ThemeContext';

import './LandingPage.css';

const LandingPage = () => {
    const { mode } = useThemeContext(); // Get the mode from the context

    return (
        <Box className={`LandingPageContainer ${mode}`} sx={{ textAlign: 'center', padding: '1rem', maxWidth: '1000px', margin: 'auto' }}>
            {/* Tagline and Value Proposition */}
            <Typography variant="h2" className="title" gutterBottom>
                Manage Your Day, Find Your Motivation
            </Typography>
            <Typography variant="h5" className="description" color="textSecondary" paragraph>
                Your Task Management Tool with a Personal Touch. Stay organized and inspired every day.
            </Typography>

            {/* Feature Highlights Section */}
            <Box sx={{ marginTop: '2rem' }} className="features">
                <Paper elevation={3} sx={{ padding: '2rem', marginBottom: '2rem' }} className="MuiPaper-root">
                    <Box sx={{ fontSize: '3rem' }} className="MuiBox-root">
                        <CheckCircle style={{ color: mode === 'light' ? '#666' : '#ccc' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom className="MuiTypography-h5">Track Your Progress</Typography>
                    <Typography className="MuiTypography-colorTextSecondary" color="textSecondary">
                        Keep an eye on your completed tasks and measure your success as you move forward.
                    </Typography>
                </Paper>

                <Paper elevation={3} sx={{ padding: '2rem', marginBottom: '2rem' }} className="MuiPaper-root">
                    <Box sx={{ fontSize: '3rem' }} className="MuiBox-root">
                        <CalendarToday style={{ color: mode === 'light' ? '#666' : '#ccc' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom className="MuiTypography-h5">Organize Your Tasks</Typography>
                    <Typography className="MuiTypography-colorTextSecondary" color="textSecondary">
                        Effortlessly plan and manage your daily schedule, so you stay productive and on track.
                    </Typography>
                </Paper>

                <Paper elevation={3} sx={{ padding: '2rem', marginBottom: '2rem' }} className="MuiPaper-root">
                    <Box sx={{ fontSize: '3rem' }} className="MuiBox-root">
                        <Favorite style={{ color: mode === 'light' ? '#666' : '#ccc' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom className="MuiTypography-h5">Get Motivational Quotes</Typography>
                    <Typography className="MuiTypography-colorTextSecondary" color="textSecondary">
                        Stay inspired with daily quotes that help you stay focused and motivated on your goals.
                    </Typography>
                </Paper>
            </Box>

            {/* Call to Action Buttons */}
            <Box sx={{ marginTop: '2rem' }} className="buttons">
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/register"
                    sx={{ margin: '1rem' }}
                    className="MuiButton-root MuiButton-contained"
                >
                    Sign Up for Free
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/login"
                    sx={{ margin: '1rem' }}
                    className="MuiButton-root MuiButton-outlined"
                >
                    Log In
                </Button>
            </Box>
        </Box>
    );
};

export default LandingPage;
