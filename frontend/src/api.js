import axios from 'axios';
import { getStoredUser } from './utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const { token } = getStoredUser();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (payload) => api.post('/auth/login', payload).then(res => res.data);
export const registerUser = (payload) => api.post('/auth/register', payload).then(res => res.data);
export const uploadFiles = (formData) => api.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
}).then(res => res.data);
export const compareCode = (payload) => api.post('/compare', payload).then(res => res.data);
export const getHistory = () => api.get('/history').then(res => res.data);
export const getReport = (id) => api.get(`/report/${id}`).then(res => res.data);
