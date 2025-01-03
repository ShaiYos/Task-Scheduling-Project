import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true'); // Initialize from localStorage

    const loginUser = (id) => {
        setUserId(id);
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userId', id); // Ensure id is stored as a string
    };

    const logoutUser = () => {
        setUserId(null); // Clear userId
        setLoggedIn(false); // Update loggedIn to false
        localStorage.setItem('loggedIn', 'false');
        localStorage.removeItem('userId'); // Clear userId from localStorage
        localStorage.removeItem('tasks'); // Clear userId from localStorage
        localStorage.removeItem('username'); // Clear userId from localStorage
    };

    useEffect(() => {
        // Check local storage for loggedIn state and userId
        const storedLoggedInState = localStorage.getItem('loggedIn');
        const storedUserId = localStorage.getItem('userId');
    
        if (storedLoggedInState === 'true' && storedUserId) {
            setLoggedIn(true); // Update loggedIn state from local storage
            setUserId(storedUserId); // Set userId from local storage
        } else {
            setLoggedIn(false);
            setUserId(null);
        }
        console.log("Stored loggedIn:", storedLoggedInState, "Stored userId:", storedUserId);
    }, []);
    
    return (
        <LoginContext.Provider value={{ userId, loggedIn, loginUser, logoutUser }}>
            {children}
        </LoginContext.Provider>
    ); 
}; 
