import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from './LoginContext';

const LogoutButton = () => {
    const { loggedIn, logoutUser } = useLoginContext(); // Use the login context to check if the user is logged in
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/'); // Redirect to home after logout
    };
    
    return (
        loggedIn && ( // Only render button if user is logged in
            <button
                onClick={handleLogout}
                style={{
                    position: 'fixed',  // Fixes the button position on the screen
                    top: '20px',        // Distance from the top of the screen
                    left: '20px',       // Distance from the left side of the screen
                    backgroundColor: '#f44336',  // Red background color for the button
                    color: '#fff',      // White text color
                    border: 'none',     // Remove default border
                    padding: '10px 20px',  // Padding for the button
                    borderRadius: '5px', // Rounded corners
                    cursor: 'pointer',  // Pointer cursor on hover
                    zIndex: 1000,       // Ensures the button is always on top
                }}
            >
                Logout
            </button>
        )
    );
};

export default LogoutButton;
