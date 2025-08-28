import api from '../api';
import { User, ApiResponse } from '../../types';

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get('users');
    return res.data;
}

export const blockUser = async (userId: string): Promise<ApiResponse> => {
    const res = await api.post(`users/${userId}/block`);
    return res.data;
};

export const unblockUser = async (userId: string): Promise<ApiResponse> => {
    const res = await api.post(`users/${userId}/unblock`);
    return res.data;
}

export const deleteUser = async (userId: string): Promise<ApiResponse> => {
    const res = await api.delete(`users/${userId}`);
    return res.data;
};