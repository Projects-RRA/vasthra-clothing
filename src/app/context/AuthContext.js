"use client";
import { createContext, useState, useEffect } from "react";
import { isAuthenticated } from "@/app/utils/authUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isAuthenticated()
      .then((userData) => {
        setUserDetails(userData);
        setLoading(false);
      })
      .catch(() => {
        setUserDetails(null);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ userDetails, setUserDetails, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
