import { createContext } from "react";
import { useState, useEffect } from "react";
import type { DarkModeObj } from "../types/DarkModeObj";
import type { JSX } from "react";

export const DarkModeContext = createContext<DarkModeObj | null>(null);

export function DarkModeProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [darkMode, setDarkMode] = useState<string | boolean>((): (string | boolean) => {
        return localStorage.getItem("theme") || document.documentElement.classList.contains("dark");
    });
    const toggleDarkMode = (): void => setDarkMode(prev => !prev);

    useEffect((): void => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode])

    return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}> {children} </DarkModeContext.Provider>
}