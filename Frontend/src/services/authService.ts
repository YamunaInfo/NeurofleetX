import axios from 'axios';
import { User } from '../types';

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || 'traffic_dashboard_user';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await apiClient.post('/auth/login', {
        username: email,
        email: email,
        password: password
      });
      
      const user: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.username,
        role: response.data.role === 'ADMIN' ? 'admin' : 'citizen'
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Login failed'
      );
    }
  },

  signup: async (email: string, password: string, name: string): Promise<User> => {
    try {
      const response = await apiClient.post('/auth/signup', {
        username: name,
        email: email,
        password: password
      });
      
      const user: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.username,
        role: response.data.role === 'ADMIN' ? 'admin' : 'citizen'
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return user;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Signup failed'
      );
    }
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as User : null;
  },
};
