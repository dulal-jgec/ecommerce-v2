// src/features/auth/pages/SignInPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const SignInPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearAuthError } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'ra@gmail.com',
    password: '123456'
  });
  const [localError, setLocalError] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
    clearAuthError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    setDebugInfo({ status: 'loading', message: 'Sending request...' });
    setLocalError('');

    try {
      console.log('🔐 Attempting login with:', { email: formData.email });
      
      const result = await login(formData.email, formData.password);
      
      console.log('📊 Login result:', result);
      
      if (result?.success) {
        setDebugInfo({ status: 'success', message: 'Login successful! Redirecting...' });
        setTimeout(() => navigate('/'), 1000);
      } else {
        setDebugInfo({ 
          status: 'error', 
          message: result?.message || 'Login failed',
          details: result?.error
        });
        setLocalError(result?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('💥 Unexpected error:', err);
      setDebugInfo({ 
        status: 'error', 
        message: 'Unexpected error occurred',
        details: err.message 
      });
      setLocalError('Something went wrong. Please try again.');
    }
  };

  // Quick login for testing - সরাসরি API call
  const quickLogin = async (role) => {
    const testAccounts = {
      buyer: { email: 'buyer@example.com', password: 'password123' },
      seller: { email: 'seller@example.com', password: 'password123' },
      admin: { email: 'admin@example.com', password: 'password123' }
    };
    
    const account = testAccounts[role];
    if (!account) return;
    
    setFormData(account);
    // Auto submit after 500ms
    setTimeout(() => {
      handleSubmit(new Event('submit'));
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-100/50 border border-white/50 p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-500/30 mb-4">
              <span className="text-3xl">🌿</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">Sign in to continue your shopping journey</p>
          </div>

          {/* Error Display */}
          {(localError || error) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium">{localError || error}</div>
                {debugInfo?.details && (
                  <div className="text-xs text-red-400 mt-1">{debugInfo.details}</div>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 
                flex items-center justify-center gap-2
                ${isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02]'
                }
              `}
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500">or sign in as</span>
            </div>
          </div>

          {/* Role Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button 
              onClick={() => quickLogin('buyer')}
              className="py-3 px-4 bg-emerald-50 text-emerald-700 rounded-xl font-medium text-sm hover:bg-emerald-100 transition-all duration-300 border-2 border-emerald-200"
            >
              Buyer
            </button>
            <button 
              onClick={() => quickLogin('seller')}
              className="py-3 px-4 bg-blue-50 text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-100 transition-all duration-300 border-2 border-blue-200"
            >
              Seller
            </button>
            <button 
              onClick={() => quickLogin('admin')}
              className="py-3 px-4 bg-purple-50 text-purple-700 rounded-xl font-medium text-sm hover:bg-purple-100 transition-all duration-300 border-2 border-purple-200"
            >
              Admin
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
              Sign Up
            </Link>
          </p>

          {/* Debug Info */}
          {debugInfo && (
            <div className={`mt-4 p-3 rounded-xl text-xs border ${debugInfo.status === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
              <p className="font-semibold">🔍 Debug Info:</p>
              <p>{debugInfo.message}</p>
              {debugInfo.details && <p className="text-xs opacity-70">{debugInfo.details}</p>}
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default SignInPage;