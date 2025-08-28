import api from '../api';
import { User, ApiResponse } from '../../types';

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get('api/users');
    return res.data;
}

export const blockUser = async (userId: string): Promise<ApiResponse> => {
    const res = await api.post(`api/users/${userId}/block`);
    return res.data;
};

export const unblockUser = async (userId: string): Promise<ApiResponse> => {
    const res = await api.post(`api/users/${userId}/unblock`);
    return res.data;
}

export const deleteUser = async (userId: string): Promise<ApiResponse> => {
    const res = await api.delete(`api/users/${userId}`);
    return res.data;
};