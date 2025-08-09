import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Header() {
    const location = useLocation();
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage on init, default to true (dark mode) if no preference is set
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            return savedTheme ? savedTheme === 'dark' : true;
        }
        return true;
    });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const root = document.documentElement;
        if (isDark && !root.classList.contains('dark')) {
            root.classList.add('dark');
        } else if (!isDark && root.classList.contains('dark')) {
            root.classList.remove('dark');
        }
    }, [isDark]);

    const toggleDarkMode = () => {
        setIsDark((prev) => {
            const enabled = !prev;
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', enabled ? 'dark' : 'light');
            }
            return enabled;
        });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16 relative">
                        {/* Logo */}
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">F</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-bold">FileWave</span>
                            <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-300">by</span>
                            <div className="hidden sm:flex items-center space-x-1">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium">Hoang Tu Gio</span>
                            </div>
                        </div>

                        {/* Desktop Navigation - Absolute center */}
                        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                            <Link
                                to="/"
                                className={`font-medium transition-colors ${
                                    isActive('/')
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-gray-500 hover:text-green-600 dark:hover:text-green-400 dark:text-gray-300'
                                }`}
                            >
                                Send files
                            </Link>
                            <Link
                                to="/view"
                                className={`font-medium transition-colors ${
                                    isActive('/view')
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-gray-500 hover:text-green-600 dark:hover:text-green-400 dark:text-gray-300'
                                }`}
                            >
                                Open file
                            </Link>
                        </nav>

                        {/* Right side - Dark mode toggle & Mobile menu button */}
                        <div className="flex items-center space-x-3 ml-auto">
                            {/* Dark Mode Toggle */}
                            <label className="relative inline-block w-12 h-6 sm:w-14 sm:h-8">
                                <input
                                    type="checkbox"
                                    checked={isDark}
                                    onChange={toggleDarkMode}
                                    className="sr-only peer"
                                />
                                <div className="absolute inset-0 bg-gray-300 peer-checked:bg-gray-800 rounded-full shadow-inner transition-colors duration-300" />
                                <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 h-5 w-5 sm:h-6 sm:w-6 bg-white rounded-full shadow-md transition-transform duration-300 transform peer-checked:translate-x-6 sm:peer-checked:translate-x-6 flex items-center justify-center text-xs sm:text-sm">
                                    {isDark ? '🌙' : '☀️'}
                                </div>
                            </label>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                ortality
                                {isMobileMenuOpen ? (
                                    <FaTimes className="w-5 h-5" />
                                ) : (
                                    <FaBars className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                        ? 'max-h-48 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer block ${
                                isActive('/')
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-white'
                            }`}
                        >
                            📤 Send files
                        </Link>
                        <Link
                            to="/view"
                            onClick={closeMobileMenu}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer block ${
                                isActive('/view')
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-white'
                            }`}
                        >
                            📁 Open file
                        </Link>

                        {/* Mobile-only author info */}
                        <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Created by</span>
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="font-medium">Hoang Tu Gio</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu overlay */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
}

export default Header;