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
                    position: 'fixed',
                    top: '20px',
                    left: '20px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 1000,
                }}
            >
                Logout
            </button>
        )
    );
};

export default LogoutButton;
