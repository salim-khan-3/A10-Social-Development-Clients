import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Sun,
  Moon,
  Twitter,
  Instagram,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <footer className="bg-gray-900 mt-10 text-gray-700 dark:text-gray-300 pt-12 pb-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand / Logo Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              SocialServe
            </h2>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <Moon size={18} className="text-gray-800" />
              ) : (
                <Sun size={18} className="text-yellow-400" />
              )}
            </button>
          </div>

          <p className="text-sm leading-relaxed">
            Empowering communities through collective action.  
            Join hands, make an impact, and build a better tomorrow.
          </p>

          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <FaFacebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/upcoming-events" className="hover:text-blue-500">Upcoming Events</a></li>
            <li><a href="/create-event" className="hover:text-blue-500">Create Event</a></li>
            <li><a href="/joined-events" className="hover:text-blue-500">Joined Events</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-500">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-500">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-500">Community Guidelines</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="text-blue-500 mt-1" />
              <span>Mirpur 10, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-blue-500" />
              <span>+880 1777-123456</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-blue-500" />
              <span>support@socialserve.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-500 font-medium">SocialServe</span> — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
