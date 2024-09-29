import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  config => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  error => Promise.reject(error)
);

const ENDPOINTS = {
  LOGIN: '/users/login/',
  REGISTER: '/users/register/',
  LOGOUT: '/users/logout/',
  CURRENT_USER: '/users/me/',
};

const handleApiError = (error, operation) => {
  console.error(`${operation}失敗:`, error.message);
  throw error;
};

export const login = async credentials => {
  try {
    const { data } = await api.post(ENDPOINTS.LOGIN, credentials);
    return data;
  } catch (error) {
    console.error('登錄失敗:', error.message);
    throw error;
  }
};

export const register = async userData => {
  try {
    const { data } = await api.post(ENDPOINTS.REGISTER, userData);
    return data;
  } catch (error) {
    handleApiError(error, '註冊');
  }
};

export const logout = async () => {
  try {
    const { data } = await api.post(ENDPOINTS.LOGOUT);
    return data;
  } catch (error) {
    handleApiError(error, '登出');
  }
};

export const getCurrentUser = () => api.get(ENDPOINTS.CURRENT_USER);

export default api;