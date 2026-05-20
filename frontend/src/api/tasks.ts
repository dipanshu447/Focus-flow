import api from "../service/api.ts";

export async function getTasks() {
    const res = await api.get("/tasks");
    return res.data.tasks;
}

export async function createTask(title: string) {
    const res = await api.post("/tasks", { title });
    return res.data;
}

export async function toggleTask(id: string, completed: boolean) {
    const res = await api.patch(`/tasks/${id}`, { completed: !completed });
    return res.data;
}

export async function deleteTask(id: string) {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
}