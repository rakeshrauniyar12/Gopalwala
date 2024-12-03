import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserById } from "../backend"; // Ensure this function is implemented correctly

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (token, userId) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        try {
            const user = await getUserById(userId);
            console.log("Auth Provider",user);
            if (user) setCurrentUser(user);
        } catch (error) {
            console.error("Failed to fetch user details:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setCurrentUser(null);
    };

    // Extract userId from token
    const extractUserIdFromToken = (token) => {
        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            return decodedToken.userId; // Adjust key name based on your token structure
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    // Fetch user details if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const userId = extractUserIdFromToken(token);
            if (userId) {
                (async () => {
                    try {
                        const user = await getUserById(userId);
                        if (user) setCurrentUser(user);
                    } catch (error) {
                        console.error("Error initializing user:", error);
                    }
                })();
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
