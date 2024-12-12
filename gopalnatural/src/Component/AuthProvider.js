import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserById } from "../backend"; // Ensure this function fetches user details securely from the backend

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (token,userId) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        setIsLoggedIn(true);
        try {
            if (userId) {
                const user = await getUserById(userId); // Fetch user details from the backend
                if (user) {
                    setCurrentUser(user);
                }
            }
        } catch (error) {
            console.error("Failed to log in and fetch user details:", error);
        }
    };
    // Function to fetch user details
    const fetchAndSetUser = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (token && userId) {
            try {
                const user = await getUserById(userId); // Replace with your API call
                setCurrentUser(user);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
                logout(); // Optional: Log out if fetch fails
            }
        }
    };

    // On app initialization, fetch user details
    useEffect(() => {
        if (!currentUser) {
            fetchAndSetUser();
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.setItem("signInMethod","fake")
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, currentUser, logout,login }}>
            {children}
        </AuthContext.Provider>
    );
};

