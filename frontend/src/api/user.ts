import api from "../service/api.ts";
import type { userUpdateObj } from "../types/userTypes.ts";

export async function getUser() {
    const res = await api.get("/user/me");
    return res.data;
}

export async function updateProfile(data: userUpdateObj | null) {
    if(!data) {
        console.log("There's nothing to update");
        return;
    }
    const res = await api.patch("/user/profile", data);
    return res.data;
}

export async function deleteAccount() {
    const res = await api.delete("/user/delete");
    return res.data;
}