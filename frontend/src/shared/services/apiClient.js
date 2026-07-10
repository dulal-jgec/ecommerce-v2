// src/shared/services/apiClient.js
import axios from 'axios';
import { API_BASE_URL, AUTH } from "./apiEndpoints";
import { tokenManager } from '../utils/tokenManager';


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

    const token = tokenManager.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const refreshAccessToken = async () => {
  const refreshToken = tokenManager.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await axios.post(
    `${API_BASE_URL}${AUTH.REFRESH}`,
    {
      refreshToken,
    }
  );

  return response.data.data;
};

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      status: response.status,
      data: response.data,
    });

    return response;
  },

  async (error) => {

    const originalRequest = error.config || {};

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

         

        const tokens = await refreshAccessToken();

        tokenManager.setAccessToken(tokens.accessToken);
        tokenManager.setRefreshToken(tokens.refreshToken);

        originalRequest.headers.Authorization =
          `Bearer ${tokens.accessToken}`;

        

        return apiClient(originalRequest);

      } catch (refreshError) {  
        tokenManager.clearAll();

        window.location.href = "/signin";

        return Promise.reject(refreshError);
      }
    }

    console.error("Response Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.message === "Network Error") {
      return Promise.reject({
        message:
          "Cannot connect to server. Please check your internet connection.",
        isCorsError: true,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;