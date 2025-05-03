"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import Loader from "@/app/components/core/loader";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { userDetails } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!userDetails || !userDetails.userInfo?.name) {
      // Not authenticated 
      router.push("/login");
    } else {
      // Authenticated 
      setLoading(false);
    }
  }, [userDetails, router]);

  if (loading) return <Loader />;
  return children;
};

export default PrivateRoute;
