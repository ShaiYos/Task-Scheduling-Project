import { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const loginUser = (user) => {
        setLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logoutUser = () => {
        setLoggedIn(false);
        localStorage.removeItem('user');
    };

    return (
        <LoginContext.Provider value={{ loggedIn, loginUser, logoutUser }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginContext = () => useContext(LoginContext);
