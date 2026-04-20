import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import logo from '../assets/logo.svg';
import { Link } from "react-router";
import type { JSX } from "react";

type DarkModeController = { darkMode: string | boolean, toggleDarkMode: () => void }

export default function Navbar({ darkMode, toggleDarkMode }: DarkModeController): JSX.Element {
    return (
        <div className="transition-all duration-300 ease-in-out fixed gap-4 m-auto z-10 py-1.5 px-6 top-6 rounded-full flex justify-center items-center bg-white/60 backdrop-blur-md dark:bg-neutral-900/60 shadow-lg shadow-black/5 border border-gray-200 dark:border-neutral-800">
            <Link className="flex items-center shrink-0" to='.'>
                <img className="object-cover size-10 dark:invert" src={logo} alt="logo" />
            </Link>
            <div className="flex text-gray-700 dark:text-gray-300 text-sm font-medium gap-1">
                <Link to='feature' className="px-4 py-2 transition-all duration-300 ease-in-out hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-2xl cursor-pointer">Features</Link>
                <Link to='about' className="px-4 py-2 transition-all duration-300 ease-in-out hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-2xl cursor-pointer">About</Link>
                <Link to='signup' className="px-4 py-2 transition-all duration-300 ease-in-out hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-2xl cursor-pointer">Login</Link>
            </div>
            <Link to='signup' className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md font-medium px-6 py-1.5 rounded-full text-sm">Start Free</Link>
            <div className="border-r border-gray-400 py-2"></div>
            {!darkMode ? <MdOutlineLightMode className="object-cover size-8.5 rounded-full cursor-pointer fill-black hover:bg-gray-300 p-2" onClick={toggleDarkMode} /> : <MdOutlineDarkMode className="object-cover size-8.5 rounded-full cursor-pointer dark:fill-white dark:hover:bg-neutral-800 p-2" onClick={toggleDarkMode} />}
        </div>
    )
}