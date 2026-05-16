import { createContext, useEffect, useState, type ReactNode } from "react";
import type { FocusContextType, Session, Task } from "../types/Focus";


export const FocusContext = createContext<FocusContextType | undefined>(undefined);

type props = {
    children: ReactNode
}

export function FocusProvider({ children }: props) {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const stored = localStorage.getItem("tasks")
        return stored ? JSON.parse(stored) : []
    });

    const [sessions, setSessions] = useState<Session[]>(() => {
        const stored = localStorage.getItem("sessions")
        return stored ? JSON.parse(stored) : []
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    useEffect(() => {
        localStorage.setItem("sessions", JSON.stringify(sessions))
    }, [sessions])

    return (
        <FocusContext.Provider value={{ tasks, setTasks, sessions, setSessions }}>{children}</FocusContext.Provider>
    )
}