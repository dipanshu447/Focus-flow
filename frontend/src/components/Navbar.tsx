import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import logo from '../assets/logo.svg';
import { Link, NavLink } from "react-router";
import type { JSX } from "react";

type DarkModeController = { darkMode: string, toggleDarkMode: () => void }

export default function Navbar({ darkMode, toggleDarkMode }: DarkModeController): JSX.Element {
    const token = localStorage.getItem("token");

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center items-center gap-2 md:gap-4 px-4 md:px-5 py-2 rounded-full bg-white/70 dark:bg-neutral-950/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] border border-black/5 dark:border-white/5 transition-colors duration-500 w-max max-w-[90vw]">
            <Link className="flex items-center shrink-0 mr-2 md:mr-0 group" to='.'>
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
                <Link to='app' className="bg-neutral-900 text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 shadow-sm font-medium px-5 py-2 rounded-full text-xs md:text-sm shrink-0">
                    Launch App
                </Link>
            ) : (
                <Link to='signup' className="bg-neutral-900 text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90 transition-all duration-300 shadow-sm font-medium px-5 py-2 rounded-full text-xs md:text-sm shrink-0">
                    Start Free
                </Link>
            )}
            <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1 md:mx-2 shrink-0"></div>
            <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 outline-none shrink-0"
                aria-label="Toggle Theme">
                {!darkMode ? (
                    <MdOutlineLightMode size={20} className="transition-transform duration-300 hover:rotate-90" />
                ) : (
                    <MdOutlineDarkMode size={20} className="transition-transform duration-300 hover:-rotate-90" />
                )}
            </button>
        </div>
    );
}