// This file will create a wrapper component that ensures only authenticated users can access certain pages.
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/app/utils/authUtils";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = isAuthenticated();
    if (!user) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>; // Prevent flickering

  return children;
};

export default PrivateRoute;
