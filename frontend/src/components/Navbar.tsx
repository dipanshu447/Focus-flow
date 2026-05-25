import { MdOutlineDarkMode, MdOutlineLightMode, MdMenu, MdClose } from "react-icons/md";
import logo from '../assets/logo.svg';
import { Link, NavLink, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { JSX } from "react";

type DarkModeController = { darkMode: string | boolean, toggleDarkMode: () => void }

export default function Navbar({ darkMode, toggleDarkMode }: DarkModeController): JSX.Element {
    const token = localStorage.getItem("token");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center w-max max-w-[95vw]">
            <div className="flex justify-center items-center gap-2 md:gap-4 px-4 md:px-5 py-2 rounded-full bg-white/70 dark:bg-neutral-950/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] border border-black/5 dark:border-white/5 transition-colors duration-500 w-full">
                <Link className="flex items-center shrink-0 mr-1 md:mr-0 group" to='.'>
                    <img
                        className="object-cover w-7 h-7 md:size-9 dark:invert transition-transform duration-300 group-hover:scale-105"
                        src={logo}
                        alt="FocusFlow" />
                </Link>
                <div className="hidden md:flex items-center text-black/60 dark:text-white/60 text-sm font-medium gap-1">
                    <NavLink to='guide' className={({ isActive }) => isActive ? "px-4 py-2 rounded-full text-black dark:text-white bg-black/5 dark:bg-white/5 transition-all duration-300" : "px-4 py-2 rounded-full hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"}>
                        Guide
                    </NavLink>
                    <NavLink to='about' className={({ isActive }) => isActive ? "px-4 py-2 rounded-full text-black dark:text-white bg-black/5 dark:bg-white/5 transition-all duration-300" : "px-4 py-2 rounded-full hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"}>
                        About
                    </NavLink>
                    <NavLink to='contact' className={({ isActive }) => isActive ? "px-4 py-2 rounded-full text-black dark:text-white bg-black/5 dark:bg-white/5 transition-all duration-300" : "px-4 py-2 rounded-full hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"}>
                        Contact
                    </NavLink>
                </div>
                {token ? (
                    <Link to='app' className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 shadow-sm font-medium px-4 py-2 md:px-5 rounded-full text-xs md:text-sm shrink-0">
                        Launch App
                    </Link>
                ) : (
                    <Link to='signup' className="bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 shadow-sm font-medium px-4 py-2 md:px-5 rounded-full text-xs md:text-sm shrink-0">
                        Start Free
                    </Link>
                )}
                <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-0.5 md:mx-2 shrink-0"></div>
                <button
                    onClick={toggleDarkMode}
                    className="p-1.5 md:p-2 rounded-full text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 outline-none shrink-0"
                    aria-label="Toggle Theme">
                    {!darkMode ? (
                        <MdOutlineLightMode size={20} className="transition-transform duration-300 hover:rotate-90" />
                    ) : (
                        <MdOutlineDarkMode size={20} className="transition-transform duration-300 hover:-rotate-90" />
                    )}
                </button>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-1.5 rounded-full text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 outline-none shrink-0 ml-1"
                    aria-label="Toggle Mobile Menu">
                    {isMobileMenuOpen ? (
                        <MdClose size={22} className="transition-transform duration-300 rotate-90" />
                    ) : (
                        <MdMenu size={22} className="transition-transform duration-300" />
                    )}
                </button>
            </div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="md:hidden absolute top-full mt-3 w-full min-w-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl shadow-2xl border border-black/5 dark:border-white/5 rounded-2xl flex flex-col p-2 gap-1 z-40">
                        <NavLink 
                            to='guide' 
                            className={({ isActive }) => `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? "text-black dark:text-white bg-black/5 dark:bg-white/5" : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"}`}>
                            Guide
                        </NavLink>
                        <NavLink 
                            to='about' 
                            className={({ isActive }) => `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? "text-black dark:text-white bg-black/5 dark:bg-white/5" : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"}`}>
                            About
                        </NavLink>
                        <NavLink 
                            to='contact' 
                            className={({ isActive }) => `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive ? "text-black dark:text-white bg-black/5 dark:bg-white/5" : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"}`}>
                            Contact
                        </NavLink>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}