// src/shared/components/Navbar/NavbarDesktop.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Heart, LogOut, Settings, ChevronDown } from 'lucide-react';
import Logo from '../Logo/Logo';
import { useAuth } from '../../../features/auth/hooks/useAuth';

const NavbarDesktop = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between h-20">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* Center: Navigation */}
      <div className="hidden lg:flex items-center gap-1">
        <Link to="/" className="relative px-5 py-2.5 text-gray-700 font-medium text-sm tracking-wide hover:text-emerald-600 transition-all duration-300 group">
          Home
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
        <Link to="/shop" className="relative px-5 py-2.5 text-gray-700 font-medium text-sm tracking-wide hover:text-emerald-600 transition-all duration-300 group">
          Shop
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
        <Link to="/about" className="relative px-5 py-2.5 text-gray-700 font-medium text-sm tracking-wide hover:text-emerald-600 transition-all duration-300 group">
          About
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
      </div>

      {/* Right: Search + Actions */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className={`relative flex items-center transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${searchFocused ? 'bg-white shadow-lg shadow-emerald-100/50 ring-2 ring-emerald-400' : 'bg-gray-50/80 border border-gray-200/80'}`}></div>
          <Search className={`absolute left-4 z-10 transition-colors duration-300 ${searchFocused ? 'text-emerald-500' : 'text-gray-400'}`} size={18} />
          <input
            type="text"
            placeholder="Search for products..."
            className="relative z-10 w-full py-2.5 pl-11 pr-4 bg-transparent rounded-full outline-none text-gray-700 placeholder-gray-400 text-sm transition-all duration-300"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Wishlist */}
        <button className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300 group">
          <Heart size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-rose-500/30">
            3
          </span>
        </button>

        {/* Cart */}
        <button className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-300 group">
          <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            2
          </span>
        </button>

        {/* User Section - Conditional Rendering */}
        {isAuthenticated ? (
          // ✅ Logged In - Show Profile Dropdown
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-emerald-50 rounded-full transition-all duration-300 group"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-emerald-500/30">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 py-2 animate-slideDown z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role?.toLowerCase() || 'Buyer'}
                  </p>
                </div>

                {/* Menu Items */}
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={16} />
                  <span>My Profile</span>
                </Link>
                <Link 
                  to="/orders" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <ShoppingBag size={16} />
                  <span>My Orders</span>
                </Link>
                <Link 
                  to="/settings" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>

                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          // ❌ Not Logged In - Show Sign In Button
          <Link to="/signin">
            <button className="group relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                <User size={16} />
                <span>Sign In</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarDesktop;