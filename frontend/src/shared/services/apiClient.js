// src/shared/services/apiClient.js
import axios from 'axios';
import { API_BASE_URL } from './apiEndpoints';

// নতুন instance তৈরি করুন
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // CORS এর জন্য
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    // যদি CORS error হয়
    if (error.message === 'Network Error') {
      return Promise.reject({
        message: 'Cannot connect to server. Please check your internet or CORS settings.',
        isCorsError: true
      });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;