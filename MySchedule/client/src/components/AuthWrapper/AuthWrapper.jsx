// AuthWrapper.jsx
import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../ThemeContext'; // Adjust the path as necessary
import './AuthWrapper.css'; // Import custom CSS for additional styling

const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user !== null;
};

const AuthWrapper = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const { mode } = useThemeContext(); // Access the theme mode
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            setShowAlert(true);
        }
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    if (showAlert) {
        return (
            <div className={`alert-box ${mode}-mode`}>
                <Alert variant="outlined" severity="warning">
                    You need to log in first to access this content.
                </Alert>
                <button className="alert-button" onClick={handleLogin}>
                    Login
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthWrapper;
