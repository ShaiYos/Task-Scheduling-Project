import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Login Context
const LoginContext = createContext();

// Login Provider Component
export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    // Check local storage for logged-in state
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('loggedIn') === 'true';
        setLoggedIn(userLoggedIn);
    }, []);

    const loginUser = () => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true'); // Store logged-in state
    };

    const logoutUser = () => {
        setLoggedIn(false);
        localStorage.setItem('loggedIn', 'false'); // Clear logged-in state
    };

    return (
        <LoginContext.Provider value={{ loggedIn, loginUser, logoutUser }}>
            {children}
        </LoginContext.Provider>
    );
};

// Custom hook to use Login Context
export const useLoginContext = () => useContext(LoginContext);
