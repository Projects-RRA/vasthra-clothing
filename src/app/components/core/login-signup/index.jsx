"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Toast from "../toast/Toast";

export default function AuthPage() {
  const [loginTab, setLoginTab] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "buyer",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "confirmPassword") {
      setPasswordError(
        e.target.value !== formData.password ? "Passwords do not match" : ""
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setToast(null);
    const endpoint = loginTab ? "/api/users/login" : "/api/users/register";

    // Prepare request payload
    const payload = loginTab
      ? { email: formData.email, password: formData.password } // Only send email & password for login
      : formData; // Send full formData for registration

    try {
      const res = await axios.post(`http://localhost:8000${endpoint}`, payload);

      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "buyer",
        password: "",
        confirmPassword: "",
      });

      if (res.status === 201 && !loginTab) {
        // Registration Success
        setToast({
          title: "Registration Successful",
          description: "Login with Your User ID and Password",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-center",
        });
        setLoginTab(true);
      } else if (res.status === 200 && loginTab) {
        // Login Success
        const { message, token, role, userName } = res.data;

        // Store token in local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userName", userName);

        setToast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-center",
        });

        // Navigate to home page
        setTimeout(() => {
          window.location.href = "/";
        }, 100);
      }
    } catch (error) {
      console.error("Request Error:", error);

      const errorMessage =
        error.response?.data?.error || "Something went wrong.";
      const errorDescription =
        error.response?.data?.message || "Something went wrong.";

      setToast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-950 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        {/* Toggle Switch */}
        <div className="flex justify-between border-b pb-3 mb-4">
          <button
            onClick={() => setLoginTab(true)}
            className={`w-1/2 text-center p-2 font-medium ${
              loginTab
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setLoginTab(false)}
            className={`w-1/2 text-center p-2 font-medium ${
              !loginTab
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!loginTab && (
            <>
              {/* Full Name */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />

              {/* Account Type (Radio) */}
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="Seller"
                    checked={formData.role === "Seller"}
                    onChange={handleChange}
                    className="w-4 h-4 accent-gray-900"
                  />
                  <span>Seller</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={formData.role === "buyer"}
                    onChange={handleChange}
                     className="w-4 h-4 accent-gray-900"
                  />
                  <span>Buyer</span>
                </label>
              </div>

              {/* Phone */}
              <input
                type="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
            </>
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {!loginTab && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-2 rounded"
          >
            {loginTab ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
      {toast && <Toast key={toast.title} {...toast} />}
    </div>
  );
}
