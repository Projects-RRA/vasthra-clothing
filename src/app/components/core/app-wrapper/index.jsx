"use client";

import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import Loader from "@/app/components/core/loader"; // Create this or use a spinner

export default function AppWrapper({ children }) {
  const { loading } = useContext(AuthContext);

  if (loading) return <Loader />; // Show loader

  return children;
}
