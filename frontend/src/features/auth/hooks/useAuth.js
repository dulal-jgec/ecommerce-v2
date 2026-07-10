// src/features/auth/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, logoutUser, clearError, clearSuccess, manualLogout , getProfile } from '../services/authSlice';
import { useState } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { user, isAuthenticated, isLoading, error, success } = useSelector(
    (state) => state.auth
  );

  const register = async (userData) => {
  setLoading(true);

  try {
    const result = await dispatch(registerUser(userData)).unwrap();

    setLoading(false);
    return result;
  } catch (error) {
    setLoading(false);
    throw error;
  }
};


  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      setLoading(false);
      
if(result){

    switch(result.user.role){

        case "ADMIN":
            navigate("/admin/dashboard");
            break;

        case "SELLER":
            navigate("/seller/dashboard");
            break;

        default:
            navigate("/");
    }

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
      
      
    
      const result = await dispatch(logoutUser()).unwrap();
      
       
      
      dispatch(manualLogout());
      
       navigate('/');
      
    
      setTimeout(() => {
        window.location.reload();
      }, 100);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Logout failed:', error);
      
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

  const loadProfile = async () => {
  try {
    return await dispatch(getProfile()).unwrap();
  } catch (error) {
    throw error;
  }
};
  return {
    user,
    isAuthenticated,
    isLoading: isLoading || loading,
    error,
    success,
    login,
    register,
    loadProfile,
    logout,
    clearAuthError,
    clearAuthSuccess,
  };
};