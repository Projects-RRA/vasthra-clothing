"use client";
import { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "../utils/authUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        isAuthenticated()
            .then((userData) => setUser(userData))
            .catch(() => setUser(null));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
