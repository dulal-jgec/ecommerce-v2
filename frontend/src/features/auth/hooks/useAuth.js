// src/features/auth/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, clearError, clearSuccess, manualLogout } from '../services/authSlice';
import { useState } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated, isLoading, error, success } = useSelector(
    (state) => state.auth
  );

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      setLoading(false);
      
      if (result) {
        setTimeout(() => navigate('/'), 100);
      }
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
 
  const logout = async () => {
    setLoading(true);
    try {
      console.log('🔄 Starting logout process...');
      
      // 1. First - Dispatch logout (API call + Token clear)
      const result = await dispatch(logoutUser()).unwrap();
      
      console.log('✅ Logout successful:', result);
      
      // 2. Force state update
      dispatch(manualLogout());
      
      // 3. Navigate to home
      navigate('/');
      
      // 4. Force reload to reset all components
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('❌ Logout failed:', error);
      
      // Emergency cleanup
      dispatch(manualLogout());
      navigate('/');
      
      setLoading(false);
      return false;
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  const clearAuthSuccess = () => {
    dispatch(clearSuccess());
  };

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loading,
    error,
    success,
    login,
    logout,
    clearAuthError,
    clearAuthSuccess,
  };
};