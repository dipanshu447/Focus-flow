import { createContext, useEffect, useState, type ReactNode } from "react";
import type { FocusContextType, Session, Task } from "../types/Focus.ts";
import { getTasks } from "../api/tasks.ts";

export const FocusContext = createContext<FocusContextType | undefined>(undefined);

type props = {
    children: ReactNode
}

export function FocusProvider({ children }: props) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const [sessions, setSessions] = useState<Session[]>(() => {
        const stored = localStorage.getItem("sessions")
        return stored ? JSON.parse(stored) : []
    });

    async function fetchTasks() {
        try {
            const tasksData = await getTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTasks();
    }, [])

    useEffect(() => {
        localStorage.setItem("sessions", JSON.stringify(sessions))
    }, [sessions])

    return (
        <FocusContext.Provider value={{ tasks, setTasks, sessions, setSessions }}>{children}</FocusContext.Provider>
    )
}