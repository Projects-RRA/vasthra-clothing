"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { isAuthenticated, logout } from "@/app/utils/authUtils";

export default function Navbar() {
  const [authenticatedUser, setauthenticatedUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  // CHecking if the user authenticated or not and updating the state
  useEffect(() => {
    setauthenticatedUser(isAuthenticated()); // Load user on mount
  }, []);


  return (
    <div className="shadow-md sticky top-0 bg-white z-50">
      {/* Top Navbar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <a href="/">
            <Image
              src={"/logo/logo-white.png"}
              width={100}
              height={50}
              alt="Vasthra Logo"
            />
          </a>

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-gray-400"
            >
              <FaShoppingCart /> <span>Cart (0)</span>
            </a>

            {/* User Section */}
            <div className="relative">
              {authenticatedUser ? (
                // Show username if logged in
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-1 hover:text-gray-400"
                >
                  <FaUser /> <span>{userName}</span>
                </button>
              ) : (
                // Show Login button if not logged in
                <a
                  href="/login"
                  className="flex items-center space-x-1 hover:text-gray-400"
                >
                  <FaUser /> <span>Login</span>
                </a>
              )}

              {/* Dropdown Menu */}
              {dropdownOpen && userName && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Profile
                  </a>
                  <a
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Orders
                  </a>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-left w-full hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-300">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          {/* Hamburger Button */}
          <button
            className="md:hidden text-xl text-slate-900"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Mobile Menu */}
          <ul
            className={`fixed left-0 top-0 w-full h-full bg-white z-50 transform ${
              menuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:hidden`}
          >
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-bold text-slate-900">Menu</h2>
              <button
                className="text-2xl text-slate-900"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <li>
              <a
                href="#"
                className="block p-4 text-gray-800 border-b"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-4 text-gray-800 border-b"
                onClick={() => setMenuOpen(false)}
              >
                All Categories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-4 text-gray-800 border-b"
                onClick={() => setMenuOpen(false)}
              >
                New Arrivals
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-4 text-gray-800 border-b"
                onClick={() => setMenuOpen(false)}
              >
                Featured Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-4 text-gray-800 border-b"
                onClick={() => setMenuOpen(false)}
              >
                Electronics
              </a>
            </li>
          </ul>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="#" className="text-gray-950 hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950 hover:text-gray-600">
                All Categories
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950 hover:text-gray-600">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950 hover:text-gray-600">
                Featured Products
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950 hover:text-gray-600">
                Electronics
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
