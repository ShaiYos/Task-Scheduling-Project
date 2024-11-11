import React from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import './Feature.css';

const Feature = ({ imageSrc, title, description }) => {
    const { mode } = useThemeContext(); // Access mode here

    return (
        <Box className={`feature-box ${mode}`}>
            <Box className="image-container">
                <img src={imageSrc} alt={title} className="feature-icon" />
            </Box>
            <Typography variant="h6" className="feature-title">
                {title}
            </Typography>
            <Typography variant="body1" className="feature-description">
                {description}
            </Typography>
        </Box>
    );
};

export default Feature;
