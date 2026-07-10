// src/features/auth/pages/SignInPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const SignInPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearAuthError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError("");
    clearAuthError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLocalError("Please fill in all fields");
      return;
    }
    try {
      
      const result = await login(formData.email, formData.password);

      switch (result.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "SELLER":
          navigate("/seller/dashboard");
          break;

        case "BUYER":
          navigate("/");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      setLocalError("Something went wrong. Please try again.");
    }
  };

  const demoAccounts = [
    {
      role: "Buyer",
      email: "buyer@example.com",
      password: "password123",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      role: "Seller",
      email: "seller@example.com",
      password: "password123",
      color: "from-blue-500 to-blue-600",
    },
    {
      role: "Admin",
      email: "admin@example.com",
      password: "password123",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const quickLogin = (email, password) => {
    setFormData({ email, password });
    // Auto submit
    setTimeout(() => {
      handleSubmit(new Event("submit"));
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Error */}
          {(localError || error) && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
              {localError || error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-500 hover:text-gray-700 transition"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <span>Sign In</span>
              )}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">Demo Login</span>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="grid grid-cols-3 gap-2">
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                onClick={() => quickLogin(account.email, account.password)}
                className={`py-2.5 px-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${account.color} hover:shadow-lg transition`}
              >
                {account.role}
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-gray-800 font-semibold hover:underline transition"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
