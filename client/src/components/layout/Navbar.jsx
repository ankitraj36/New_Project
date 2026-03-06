'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiLogOut, FiShield } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa6';

export default function Navbar() {
    const { user, logout, isAdmin, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [dark, setDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = saved === 'dark' || (!saved && prefersDark);
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newDark = !dark;
        setDark(newDark);
        document.documentElement.classList.toggle('dark', newDark);
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/departments', label: 'Departments' },
        { href: '/materials', label: 'Resources' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/5 dark:shadow-black/20' : ''} glass border-b border-slate-200/60 dark:border-slate-700/60`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-18">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-brand-600 to-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-110 transition-transform">
                            <FaGraduationCap className="text-white text-sm" />
                        </div>
                        <span className="text-xl font-extrabold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                            College Lover
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button onClick={toggleTheme}
                            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-500/20 hover:text-brand-600 dark:hover:text-brand-400 transition-all hover:scale-110">
                            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>

                        {isAuthenticated ? (
                            <div className="hidden lg:flex items-center gap-2">
                                <Link href={isAdmin ? '/admin' : '/dashboard'}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 shadow-md shadow-brand-500/20 transition-all">
                                    {isAdmin ? <FiShield size={16} /> : <FiUser size={16} />}
                                    {isAdmin ? 'Admin' : 'Dashboard'}
                                </Link>
                                <button onClick={logout}
                                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-red-100 hover:text-red-600 transition-all">
                                    <FiLogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-2">
                                <Link href="/login"
                                    className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 transition-all">
                                    Login
                                </Link>
                                <Link href="/signup"
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold shadow-md shadow-brand-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all">
                            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-brand-50 dark:hover:bg-brand-500/10 hover:text-brand-600 transition-all">
                                    {link.label}
                                </Link>
                            ))}
                            <hr className="border-slate-200 dark:border-slate-700 my-2" />
                            {isAuthenticated ? (
                                <>
                                    <Link href={isAdmin ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-xl text-brand-600 font-semibold">
                                        {isAdmin ? '🛡️ Admin Dashboard' : '📊 Dashboard'}
                                    </Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }}
                                        className="w-full text-left px-4 py-3 rounded-xl text-red-500 font-medium">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 font-medium">
                                        Login
                                    </Link>
                                    <Link href="/signup" onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-xl bg-brand-600 text-white text-center font-semibold">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
