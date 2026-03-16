import { axiosClient } from '../api/axiosClient';
import type { ApiResponse, User } from '../types/user';

export const usersService = {
  async getUsers(): Promise<User[]> {
    const { data } = await axiosClient.get<ApiResponse<User[]>>('/users');
    return data.data;
  },

  async getUserById(id: string): Promise<User> {
    const { data } = await axiosClient.get<ApiResponse<User>>(`/users/${id}`);
    return data.data;
  },

  async createUser(payload: {
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<User> {
    const { data } = await axiosClient.post<ApiResponse<User>>('/users', payload);
    return data.data;
  },

  async updateUser(
    id: string,
    payload: Partial<{ firstName: string; lastName: string; email: string }>
  ): Promise<User> {
    const { data } = await axiosClient.put<ApiResponse<User>>(
      `/users/${id}`,
      payload
    );
    return data.data;
  },

  async deleteUser(id: string): Promise<void> {
    await axiosClient.delete(`/users/${id}`);
  },
};
