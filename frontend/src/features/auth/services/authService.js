// src/features/auth/services/authService.js
import apiClient from '../../../shared/services/apiClient';
import { AUTH } from '../../../shared/services/apiEndpoints';

class AuthService {
  
  // Login
  async login(email, password) {
    try {
      console.log('📤 Sending login request:', { email });
      
      const response = await apiClient.post(AUTH.LOGIN, {
        email: email.trim(),
        password: password.trim()
      });
      
      console.log('📥 Login response:', response.data);
      
      if (!response.data || !response.data.data) {
        throw new Error('Invalid response from server');
      }
      
      const { accessToken, refreshToken, email: userEmail, role } = response.data.data;
      
      return {
        success: true,
        data: {
          accessToken,
          refreshToken,
          user: { email: userEmail, role },
        },
        message: response.data.message || 'Login successful',
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        error: error.response?.data || error.message,
      };
    }
  }

  // ✅ Logout - সঠিকভাবে Refresh Token পাঠান
  async logout(refreshToken) {
    try {
      console.log('📤 Sending logout request with token:', refreshToken);
      
      // Logout API তে Refresh Token পাঠান
      const response = await apiClient.post(AUTH.LOGOUT, {
        refreshToken: refreshToken
      });
      
      console.log('📥 Logout response:', response.data);
      
      return {
        success: true,
        message: response.data?.message || 'Logged out successfully',
      };
    } catch (error) {
      console.error('❌ Logout API error:', error);
      
      // Error হলেও আমরা Local Token Clear করব
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed',
        error: error.response?.data || error.message,
      };
    }
  }

  // Refresh Token
  async refreshToken(refreshToken) {
    try {
      const response = await apiClient.post(AUTH.REFRESH, { refreshToken });
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Token refresh failed',
      };
    }
  }
}

export const authService = new AuthService();