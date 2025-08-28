import api from "../api";
import { RegisterData, LoginData, AuthResponse } from "../../types";

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    console.log("🔐 [FRONTEND REGISTER] Attempting registration with data:", data);
    const res = await api.post("auth/register", data);
    console.log("🔐 [FRONTEND REGISTER] Registration successful:", res.data);
    return res.data; 
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
    console.log("🔐 [FRONTEND LOGIN] Attempting login with data:", data);
    const res = await api.post("auth/login", data);
    console.log("🔐 [FRONTEND LOGIN] Login successful:", res.data);
    return res.data;
};