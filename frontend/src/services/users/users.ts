import api from '../api';
import { User, ApiResponse } from '../../types';

export const getUsers = async (): Promise<User[]> => {
    console.log("👥 [FRONTEND GET USERS] Fetching users...");
    const res = await api.get('users');
    console.log("👥 [FRONTEND GET USERS] Users fetched successfully:", res.data);
    return res.data;
}

export const blockUser = async (userId: string): Promise<ApiResponse> => {
    console.log("👥 [FRONTEND BLOCK USER] Blocking user:", userId);
    const res = await api.post(`users/${userId}/block`);
    console.log("👥 [FRONTEND BLOCK USER] User blocked successfully:", res.data);
    return res.data;
};

export const unblockUser = async (userId: string): Promise<ApiResponse> => {
    console.log("👥 [FRONTEND UNBLOCK USER] Unblocking user:", userId);
    const res = await api.post(`users/${userId}/unblock`);
    console.log("👥 [FRONTEND UNBLOCK USER] User unblocked successfully:", res.data);
    return res.data;
}

export const deleteUser = async (userId: string): Promise<ApiResponse> => {
    console.log("👥 [FRONTEND DELETE USER] Deleting user:", userId);
    const res = await api.delete(`users/${userId}`);
    console.log("👥 [FRONTEND DELETE USER] User deleted successfully:", res.data);
    return res.data;
};