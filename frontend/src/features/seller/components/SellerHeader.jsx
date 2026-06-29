// src/features/seller/components/SellerHeader.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown, 
  LogOut, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  Store
} from 'lucide-react';

const SellerHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'New order #ORD-001', time: '2 min ago', read: false },
    { id: 2, title: 'Product approved', time: '15 min ago', read: false },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-gray-800">Seller Dashboard</h2>
              <p className="text-xs text-gray-400">Welcome back, EcoStore</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Store Link */}
            <Link
              to="/store/ecostore"
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-100 transition"
            >
              <Store size={16} />
              View Store
            </Link>

            {/* Search */}
            <div className="hidden sm:block relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition w-48 lg:w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-2 border-l border-gray-200 hover:bg-gray-50 rounded-xl p-1.5 transition"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  E
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">EcoStore</p>
                  <p className="text-xs text-gray-400">eco@example.com</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">EcoStore India</p>
                    <p className="text-xs text-gray-400">eco@example.com</p>
                  </div>
                  <Link to="/seller/store-profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <Store size={16} />
                    Store Profile
                  </Link>
                  <Link to="/seller/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <Settings size={16} />
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SellerHeader;