// src/shared/components/Navbar/NavbarMobile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingBag, Heart, LogOut, Settings } from 'lucide-react';
import Logo from '../Logo/Logo';
import { useAuth } from '../../../features/auth/hooks/useAuth';

const NavbarMobile = ({ isOpen, setIsOpen }) => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <Logo size="sm" />

        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-600 hover:text-emerald-600 rounded-full transition-colors">
            <Search size={20} />
          </button>
          <button className="relative p-2 text-gray-600 hover:text-emerald-600 rounded-full transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-1 animate-slideDown">
          {/* Navigation Links */}
          <Link 
            to="/" 
            className="flex items-center px-4 py-3.5 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl font-medium transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="flex items-center px-4 py-3.5 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl font-medium transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className="flex items-center px-4 py-3.5 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl font-medium transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          <div className="border-t border-gray-100 my-2"></div>

          {/* User Section */}
          {isAuthenticated ? (
            // ✅ Logged In
            <>
              <div className="px-4 py-2">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role?.toLowerCase() || 'Buyer'}
                </p>
              </div>
              
              <Link 
                to="/profile" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>
              <Link 
                to="/orders" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-xl transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={18} />
                <span>My Orders</span>
              </Link>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200 w-full"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            // ❌ Not Logged In
            <Link 
              to="/signin" 
              className="flex items-center gap-2 px-4 py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;