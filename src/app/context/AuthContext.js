"use client";
import { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "@/app/utils/authUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        isAuthenticated()
            .then((userData) => setUserDetails(userData))
            .catch(() => setUserDetails(null));
    }, []);

    return (
        <AuthContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
