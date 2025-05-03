"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPassword } from "@/app/utils/profileUtils";

export default function PasswordReset({ setToast }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [newPasswordVisible, setnewPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    await resetPassword(
      currentPassword,
      newPassword,
      confirmPassword,
      setToast
    );
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setError(
      newPassword !== e.target.value ? "New password doesn't match" : ""
    );
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            className="w-full p-2 border rounded"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute top-3 right-3"
          >
            {visible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative">
          <input
            type={newPasswordVisible ? "text" : "password"}
            className="w-full p-2 border rounded"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setnewPasswordVisible(!newPasswordVisible)}
            className="absolute top-3 right-3"
          >
            {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="relative">
          <input
            type={confirmVisible ? "text" : "password"}
            className="w-full p-2 border rounded"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button
            type="button"
            onClick={() => setConfirmVisible(!confirmVisible)}
            className="absolute top-3 right-3"
          >
            {confirmVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {/* Error message */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="md:col-span-2">
          <button
            onClick={handleReset}
            className="bg-gray-900 text-white px-4 py-2 rounded disabled:cursor-not-allowed"
            disabled={error !== ""}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
