import { createContext, useEffect, useState, type ReactNode } from "react";
import type { FocusContextType, Session, Task } from "../types/Focus.ts";
import { getTasks } from "../api/tasks.ts";
import { getSessions } from "../api/sessions.ts";

export const FocusContext = createContext<FocusContextType | undefined>(undefined);

type props = {
    children: ReactNode
}

export function FocusProvider({ children }: props) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);

    async function fetchTasks() {
        try {
            const tasksData = await getTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchSessions() {
        try {
            const sessionData = await getSessions();
            setSessions(sessionData)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTasks();
        fetchSessions();
    }, []);

    return (
        <FocusContext.Provider value={{ tasks, setTasks, sessions, setSessions }}>{children}</FocusContext.Provider>
    )
}