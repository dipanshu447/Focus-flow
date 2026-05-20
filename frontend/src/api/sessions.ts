import api from "../service/api.ts";
import type { sessionTypeObj } from "../types/sessionTypes.ts";

export async function getSessions() {
    const res = await api.get("/sessions");
    return res.data.sessions;
}

export async function createSessions(newSession: sessionTypeObj) {
    const res = await api.post("/sessions", newSession);
    return res.data.sessions;
}