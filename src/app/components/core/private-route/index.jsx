"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import Loader from "@/app/components/core/loader";

const PrivateRoute = ({ children }) => {
    const [loggedInUser, setloggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const checkAuth =  () => {
            const authUser =  user;
            if (!authUser) {
                router.push("/login"); // Redirect to login if not authenticated
            } else {
                setloggedInUser(authUser);
            }
            setLoading(false);
        };

        checkAuth();
    }, [router]);

    if (loading) return <Loader />; // ✅ Show loader while checking auth
    return loggedInUser ? children : null; // ✅ Ensure proper rendering
};

export default PrivateRoute;
