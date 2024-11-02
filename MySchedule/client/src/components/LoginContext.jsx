import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Login Context
const LoginContext = createContext();

// Login Provider Component
export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null); // State to store user ID

    // Check local storage for logged-in state and user ID
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('loggedIn') === 'true';
        const storedUserId = localStorage.getItem('userId');
        setLoggedIn(userLoggedIn);  
        setUserId(storedUserId);
    }, []);

    const loginUser = (id) => {
        setLoggedIn(true);
        setUserId(id);
        localStorage.setItem('loggedIn', 'true'); // Store logged-in state
        localStorage.setItem('userId', id); // Store user ID
    };

    const logoutUser = () => {
        setLoggedIn(false);
        setUserId(null);
        localStorage.setItem('loggedIn', 'false'); // Clear logged-in state
        localStorage.removeItem('userId'); // Remove user ID
    };

    return (
        <LoginContext.Provider value={{ loggedIn, userId, loginUser, logoutUser }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom hook to use Login Context
export const useLoginContext = () => useContext(LoginContext);
