import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Section */}
        <div>
          <Image
            src={"/logo/logo-white.png"}
            width={200}
            height={100}
            alt="Vasthra Logo"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-bold mb-3">Quick Links</h5>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                All Categories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Featured Products
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h5 className="text-lg font-bold mb-3">Customer Service</h5>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-gray-300">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Return Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h5 className="text-lg font-bold mb-3">Follow Us</h5>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-gray-300">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Vasthra Clothing Apparel. All rights
        reserved.
      </div>
    </footer>
  );
}
