import api from "../api";
import { RegisterData, LoginData, AuthResponse } from "../../types";

export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const res = await api.post("api/auth/register", data);
    return res.data; 
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
    const res = await api.post("api/auth/login", data);
    return res.data;
};