import {
    LuTarget,
    LuPanelRightOpen,
    LuPanelRightClose,
    LuArrowUpRight,
    LuSun,
    LuMoon,
    LuMenu,
    LuX
} from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { useState, useEffect } from "react";
import logo from '../assets/logo.svg';
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "../hooks/useDarkMode";
import type { DarkModeObj } from "../types/DarkModeObj";
import type { userStoredObj } from "../types/userTypes";
import { capitalizeWords, initialsFromName } from "../utils/text";

export default function SideBar() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const { darkMode, toggleDarkMode }: DarkModeObj = useDarkMode();
    const location = useLocation();

    const navItems = [
        { route: 'focus', icon: LuTarget, label: 'Focus' },
        { route: 'tasks', icon: FaCheckCircle, label: 'Tasks' },
        { route: 'analytics', icon: MdBarChart, label: 'Analytics' },
    ];

    const userdata = localStorage.getItem("user");
    const user: userStoredObj = userdata ? JSON.parse(userdata) : null;

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <div className="flex md:sticky md:top-0 md:h-screen transition-colors duration-500 z-50">
            <aside className={`hidden md:flex flex-col border-r border-black/10 dark:border-white/10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarCollapsed ? 'w-18' : 'w-60'} h-full`}>
                <Link to="." className="h-20 flex items-center px-6 border-b border-black/10 dark:border-white/10 shrink-0 group">
                    <div className="size-7 rounded-lg bg-black dark:bg-white flex items-center justify-center shrink-0 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105">
                        <img src={logo} alt="FocusFlow logo" className="size-9 invert dark:invert-0" />
                    </div>
                    <span className={`ml-3 font-semibold tracking-tight whitespace-nowrap transition-opacity duration-200 text-black/90 dark:text-white/90 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                        FocusFlow
                    </span>
                </Link>
                <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.route}
                                to={item.route}
                                className={({ isActive }) => (
                                    `relative flex items-center h-10 px-3 rounded-xl transition-all duration-300 group ${isActive
                                        ? 'bg-black/5 text-black dark:bg-white/5 dark:text-white dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]'
                                        : 'text-black/40 hover:text-black/90 hover:bg-black/5 dark:text-white/40 dark:hover:text-white/90 dark:hover:bg-white/5'
                                    } ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`
                                )}>
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-black/80 dark:bg-white/80 rounded-r-full shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                                        )}
                                        <Icon size={18} className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-105' : ''}`} />
                                        <span className={`ml-3 text-sm font-medium tracking-wide whitespace-nowrap transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
                <div className="p-3 border-t border-black/10 dark:border-white/10 flex flex-col gap-2 shrink-0">
                    <button
                        onClick={toggleDarkMode}
                        className={`flex items-center h-10 px-3 rounded-xl text-black/40 hover:text-black/90 hover:bg-black/5 dark:text-white/30 dark:hover:text-white/80 dark:hover:bg-white/5 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}
                        aria-label="Toggle Theme">
                        <div className="shrink-0 relative flex items-center justify-center">
                            <LuSun size={18} className={`absolute transition-all duration-300 ${darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50 rotate-90'}`} />
                            <LuMoon size={18} className={`transition-all duration-300 ${!darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50 -rotate-90'}`} />
                        </div>
                        <span className={`ml-3 text-xs font-medium tracking-wide whitespace-nowrap transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </button>
                    <Link to="/" className={`flex items-center h-10 px-3 rounded-xl text-black/40 hover:text-black/90 hover:bg-black/5 dark:text-white/30 dark:hover:text-white/80 dark:hover:bg-white/5 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
                        <LuArrowUpRight size={18} className="shrink-0" />
                        <span className={`ml-3 text-xs font-medium tracking-wide whitespace-nowrap transition-opacity duration-200 ${isSidebarCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                            Back to Site
                        </span>
                    </Link>
                    <div className={`flex items-center mt-2 px-3 py-2.5 rounded-xl border border-transparent hover:border-black/10 dark:hover:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                        <Link to="profile" className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-[10px] text-black/80 dark:text-white/80 shrink-0 font-medium">
                                {user?.name ? initialsFromName(user.name) : "?"}
                            </div>
                            <span className={`text-xs font-medium text-black/70 dark:text-white/70 whitespace-nowrap transition-opacity duration-200 ${isSidebarCollapsed ? 'hidden' : 'block'}`}>
                                {user?.name ? capitalizeWords(user.name) : "User"}
                            </span>
                        </Link>
                        {!isSidebarCollapsed && (
                            <button onClick={() => setIsSidebarCollapsed(true)} className="text-black/30 hover:text-black/80 dark:text-white/30 dark:hover:text-white/80 transition-colors p-1" aria-label="Collapse Sidebar">
                                <LuPanelRightClose size={14} />
                            </button>
                        )}
                    </div>
                    {isSidebarCollapsed && (
                        <button onClick={() => setIsSidebarCollapsed(false)} className="mt-1 w-full flex justify-center text-black/30 hover:text-black/80 dark:text-white/30 dark:hover:text-white/80 transition-colors py-2" aria-label="Expand Sidebar">
                            <LuPanelRightOpen size={14} />
                        </button>
                    )}
                </div>
            </aside>
            <header className="md:hidden fixed top-0 left-0 w-full h-14 border-b border-black/10 dark:border-white/10 backdrop-blur-xl z-40 flex items-center justify-between px-4 transition-colors duration-500">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)} 
                        className="p-2 -ml-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors outline-none">
                        <LuMenu size={20} />
                    </button>
                    <Link to="." className="flex items-center gap-1 justify-center">
                        <img src={logo} alt="FocusFlow logo" className="size-8 invert-0 mt-0.5 dark:invert" />
                        <span className="font-semibold tracking-tight text-black/90 dark:text-white/90">FocusFlow</span>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={toggleDarkMode} 
                        className="p-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors outline-none">
                        {darkMode ? <LuSun size={20} /> : <LuMoon size={20} />}
                    </button>
                </div>
            </header>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="md:hidden fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 transition-colors"/>
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="md:hidden fixed top-0 left-0 h-full w-70 bg-[#fcfcfc] dark:bg-[#050505] shadow-2xl z-50 flex flex-col border-r border-black/10 dark:border-white/10">
                            <div className="h-16 flex items-center justify-between px-6 border-b border-black/10 dark:border-white/10 shrink-0">
                                <Link to="." className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className="w-7 h-7 rounded-lg bg-black dark:bg-white flex items-center justify-center shrink-0 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                                        <img src={logo} alt="FocusFlow logo" className="size-8 invert dark:invert-0" />
                                    </div>
                                    <span className="font-semibold tracking-tight text-black/90 dark:text-white/90">FocusFlow</span>
                                </Link>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="p-2 -mr-2 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-colors outline-none">
                                    <LuX size={20} />
                                </button>
                            </div>
                            <nav className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <NavLink
                                            key={item.route}
                                            to={item.route}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={({ isActive }) => (
                                                `relative flex items-center h-12 px-4 rounded-xl transition-all duration-300 group ${
                                                    isActive
                                                        ? 'bg-black/5 text-black dark:bg-white/5 dark:text-white'
                                                        : 'text-black/60 hover:text-black/90 hover:bg-black/5 dark:text-white/60 dark:hover:text-white/90 dark:hover:bg-white/5'}`)}>
                                            {({ isActive }) => (
                                                <>
                                                    {isActive && (
                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-black/80 dark:bg-white/80 rounded-r-full shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                                                    )}
                                                    <Icon size={20} className={`shrink-0 transition-transform duration-300 ${isActive ? 'scale-105' : ''}`} />
                                                    <span className="ml-4 text-sm font-medium tracking-wide">
                                                        {item.label}
                                                    </span>
                                                </>
                                            )}
                                        </NavLink>
                                    );
                                })}
                            </nav>
                            <div className="p-4 border-t border-black/10 dark:border-white/10 flex flex-col gap-2 shrink-0">
                                <button
                                    onClick={toggleDarkMode}
                                    className="flex items-center h-12 px-4 rounded-xl text-black/60 hover:text-black/90 hover:bg-black/5 dark:text-white/60 dark:hover:text-white/90 dark:hover:bg-white/5 transition-all duration-300 w-full text-left">
                                    <div className="shrink-0 relative flex items-center justify-center">
                                        <LuSun size={20} className={`absolute transition-all duration-300 ${darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50 rotate-90'}`} />
                                        <LuMoon size={20} className={`transition-all duration-300 ${!darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-50 -rotate-90'}`} />
                                    </div>
                                    <span className="ml-4 text-sm font-medium tracking-wide">
                                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                                    </span>
                                </button>
                                <Link 
                                    to="/" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="flex items-center h-12 px-4 rounded-xl text-black/60 hover:text-black/90 hover:bg-black/5 dark:text-white/60 dark:hover:text-white/90 dark:hover:bg-white/5 transition-all duration-300">
                                    <LuArrowUpRight size={20} className="shrink-0" />
                                    <span className="ml-4 text-sm font-medium tracking-wide">
                                        Back to Site
                                    </span>
                                </Link>
                                <Link 
                                    to="profile" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="flex items-center gap-3 mt-4 px-4 py-3 rounded-xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300">
                                    <div className="w-8 h-8 rounded-full bg-linear-to-tr from-black/10 to-black/5 dark:from-white/10 dark:to-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-xs text-black/80 dark:text-white/80 shrink-0 font-medium">
                                        {user?.name ? initialsFromName(user.name) : "?"}
                                    </div>
                                    <span className="text-sm font-medium text-black/80 dark:text-white/80 truncate">
                                        {user?.name ? capitalizeWords(user.name) : "User"}
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}