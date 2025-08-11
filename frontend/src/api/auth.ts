import api from './api';

interface LoginData {
    email: string;
    password: string;
}
interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const login = async (data: LoginData) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (data: RegisterData) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};