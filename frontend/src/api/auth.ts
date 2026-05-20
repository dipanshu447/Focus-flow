import api from '../service/api.ts';
import type { AuthUserobj } from '../types/AuthUserobj.ts';
import type { CredentialResponse } from '@react-oauth/google';

export const registerUser = async (userData: AuthUserobj) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
};

export const loginUser = async (userData: AuthUserobj) => {
    const res = await api.post("/auth/login", userData);
    return res.data;
};

export const googleLogin = async (credentialResponse: CredentialResponse) => {
    const res = await api.post("/auth/google", {
        credential: credentialResponse.credential,
    });
    return res.data;
}