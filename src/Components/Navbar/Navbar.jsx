// src/components/Navbar.jsx
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaBars, FaTimes, FaPlus, FaCog, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme,setTheme] = useState(localStorage.getItem("theme") || "light")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(()=>{
    const html = document.querySelector("html")
    html.setAttribute("data-theme",theme)
    localStorage.setItem("theme",theme)
  },[theme])

  const handleTheme = (checked) => {
    setTheme(checked?"dark": "light")
  }

  const handleLogout = async () => {
    try {
      await logOut();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/');
     toast.success(`${user?.displayName || "User"} has logged out successfully!`);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) return null;

  return (
    <div className='shadow-md w-full'>
      <nav className="bg-white dark:text-black  max-w-7xl mx-auto sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Logo + Upcoming Events */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">
                EventHub
              </span>
            </Link>

            <Link
              to="/upcoming"
              className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Upcoming Events
            </Link>
          </div>

          {/* Right: Auth */}
          <div className="flex items-center space-x-4">
            {/* Desktop: Profile Pic + Logout Button (Side by Side) */}
            <div className="hidden md:flex items-center space-x-3" ref={dropdownRef}>
              {user ? (
                <>
                  {/* Profile Picture + Hover Name */}
                  <div className="relative group">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1 transition"
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-9 h-9 rounded-full object-cover border-2 border-gray-300"
                        />
                      ) : (
                        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </div>
                      )}
                    </button>

                    {/* Hover: Show Name */}
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {user.displayName || user.email.split('@')[0]}
                    </span>
                  </div>

                  {/* Logout Button (Side by Side) */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-1 text-sm"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>

                  {/* Dropdown (on Profile Pic Click) */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-16 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/create"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaPlus className="w-4 h-4 mr-2" />
                        Create Event
                      </Link>
                      <Link
                        to="/manage"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaCog className="w-4 h-4 mr-2" />
                        Manage Events
                      </Link>
                      <Link
                        to="/join"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaCalendarAlt className="w-4 h-4 mr-2" />
                        Joined Events
                      </Link>

                      {/* <input onChange={(e)=> handleTheme(e.target.checked)} defaultChecked={localStorage.getItem("theme") === "dark"} type="checkbox" className='toggle' /> */}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6 block" />}
            </button>
             <input onChange={(e)=> handleTheme(e.target.checked)} defaultChecked={localStorage.getItem("theme") === "dark"} type="checkbox" className='toggle' />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
            <Link
              to="/upcoming"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upcoming Events
            </Link>

            {user ? (
              <>
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.displayName || user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to="/create"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaPlus className="w-4 h-4 mr-2" />
                  Create Event
                </Link>
                <Link
                  to="/manage"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaCog className="w-4 h-4 mr-2" />
                  Manage Events
                </Link>
                <Link
                  to="/join"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaCalendarAlt className="w-4 h-4 mr-2" />
                  Joined Events
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block w-full mx-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
    </div>
  );
};

export default Navbar;