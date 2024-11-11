import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../src/components/ThemeContext'; // Correct import of ThemeContext
import Feature from '../../src/components/Feature/Feature'; // Correct path to Feature component
import './HomePage.css';

const HomePage = () => {
  const { mode } = useThemeContext(); // Access mode from ThemeContext using useContext hook
  const navigate = useNavigate();

  // const handleGetStarted = () => navigate('/get-started');
  // const handleLearnMore = () => navigate('/learn-more');

  return (
    <Box className={`homepage ${mode}`}>
      {/* Hero Section */}
      <Container maxWidth="lg" className="hero-section">
        <Typography variant="h2" className="hero-title">
          Organize Your Life, Connect with Your Goals
        </Typography>
        <Typography variant="h6" className="hero-subtitle">
          A simple, powerful tool to manage tasks and achieve more.
        </Typography>
        {/* <Box className="cta-buttons">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleLearnMore}
            className="cta-button"
          >
            Learn More
          </Button>
        </Box> */}
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" className="features-section">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className="feature-card">
              <Feature
                imageSrc="/tasks.jpg"
                title="Task Scheduling"
                description="Easily schedule tasks and stay organized."
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className="feature-card">
              <Feature
                imageSrc="/user.png"
                title="Profile Management"
                description="View and manage your profile settings and preferences."
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} className="feature-card">
              <Feature
                imageSrc="/motivation.jpeg"
                title="Motivational Quotes"
                description="Stay inspired with daily motivational quotes."
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
