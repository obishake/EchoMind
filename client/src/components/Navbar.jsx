import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    FiMenu,
    FiX,
    FiSun,
    FiMoon,
    FiUser,
    FiLogOut,
    FiEdit,
} from "react-icons/fi";

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span
                            className="text-2xl font-bold text-cyan-600"
                        >
                            EchoMind
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Home
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/create-blog"
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                                >
                                    <FiEdit /> Create Blog
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Dashboard
                                </Link>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setShowProfileMenu(!showProfileMenu)
                                        }
                                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        {user?.profilePic ? (
                                            <img
                                                src={user.profilePic}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <FiUser className="w-6 h-6" />
                                        )}
                                        <span className="font-medium">
                                            {user?.username}
                                        </span>
                                    </button>

                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() =>
                                                    setShowProfileMenu(false)
                                                }
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setShowProfileMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                            >
                                                <FiLogOut /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                        
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        
                        <button onClick={toggleMenu} className="p-2">
                            {isOpen ? (
                                <FiX className="w-6 h-6" />
                            ) : (
                                <FiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link
                            to="/"
                            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/create-blog"
                                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={toggleMenu}
                                >
                                    Create Blog
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={toggleMenu}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={toggleMenu}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMenu();
                                    }}
                                    className="block w-full text-left py-2 text-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600"
                                    onClick={toggleMenu}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block py-2 text-blue-600 font-medium"
                                    onClick={toggleMenu}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
