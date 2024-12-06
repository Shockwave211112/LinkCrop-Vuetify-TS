import axios from 'axios';
import {useUserStore} from "@/store/user";
import router from "@/router";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  if(error.response?.status === 401) {
    const user = useUserStore();
    user.logout();
    router.push('/');
  }
  return Promise.reject(error);
});
