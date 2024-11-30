import React, { createContext, useState, useContext } from "react";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Check initial login status

    const login = (token) => {
        localStorage.setItem("token", token); // Save token to localStorage
        setIsLoggedIn(true); // Update state
    };

    const logout = () => {
        localStorage.removeItem("token"); // Remove token
        setIsLoggedIn(false); // Update state
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
