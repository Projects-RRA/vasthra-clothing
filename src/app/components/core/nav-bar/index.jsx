"use client";
import Image from "next/image";
import { useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  return (
    <div className="shadow-md sticky top-0 bg-white z-50">
      {/* Top Navbar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Image
            src={"/logo/logo-white.png"}
            width={100}
            height={50}
            alt="Vasthra Logo"
          />
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center space-x-1 hover:text-gray-400"
            >
              <FaShoppingCart /> <span>Cart (0)</span>
            </a>
            {/* Commented Out Wishlist and Search */}
            {/* <a href="#" className="flex items-center space-x-1 hover:text-gray-400">
                <FaHeart /> <span>Wishlist (0)</span>
              </a> */}
            {/* <div className="relative">
                <input type="text" placeholder="Search your product" className="w-40 px-2 py-1 rounded border border-gray-300 focus:outline-none" />
              </div> */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 hover:text-gray-400"
              >
                <FaUser /> <span>Username</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    My Orders
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-g border-b border-gray-300">
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
              <a href="#" className="text-gray-950	 hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950	 hover:text-gray-600">
                All Categories
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950	 hover:text-gray-600">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950	 hover:text-gray-600">
                Featured Products
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-950	 hover:text-gray-600">
                Electronics
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
