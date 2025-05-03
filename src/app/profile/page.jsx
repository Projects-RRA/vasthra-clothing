"use client";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import Loader from "../components/core/loader";
import Toast from "@/app/components/core/toast/Toast";
import { logout } from "@/app/utils/authUtils";
import BasicInfo from "./components/basicInfo";
import AddressList from "./components/addressList";
import PasswordReset from "./components/passwordReset";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [toast, setToast] = useState(null);

  const { userDetails } = useContext(AuthContext);

  useEffect(() => {
    if (userDetails) {
      setAddresses(userDetails.addresses);
      setProfile(userDetails.userInfo);
      setLoading(false);
    }
  }, [userDetails]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-gray-950 container mx-auto p-6">
      {/* Basic Info */}
      <BasicInfo
        profile={profile}
        setProfile={setProfile}
        setToast={setToast}
      />

      {/* Address Section */}
      <AddressList
        addresses={addresses}
        setAddresses={setAddresses}
        setToast={setToast}
      />
      <PasswordReset setToast={setToast} />
      {toast && <Toast key={toast.title} {...toast} />}
    </div>
  );
}
