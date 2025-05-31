"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import Loader from "@/app/components/core/loader";

const PrivateRoute = ({ children }) => {
  const { userDetails, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!userDetails || !userDetails.userInfo?.name)) {
      router.push("/login");
    }
  }, [loading, userDetails, router]);

  if (loading || !userDetails || !userDetails.userInfo?.name) {
    return <Loader />;
  }

  return children;
};

export default PrivateRoute;
