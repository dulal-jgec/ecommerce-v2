// src/features/admin/components/AdminHeader.jsx
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
  Sun,
  Moon
} from 'lucide-react';

const AdminHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notifications = [
    { id: 1, title: 'New order #ORD-001', time: '2 min ago', read: false },
    { id: 2, title: 'Seller registration pending', time: '15 min ago', read: false },
    { id: 3, title: 'Product review flagged', time: '1 hour ago', read: true },
    { id: 4, title: 'Monthly report ready', time: '3 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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
              <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
              <p className="text-xs text-gray-400">Welcome back, Admin</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:block relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition w-48 lg:w-64"
              />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-500"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-xl transition"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <button className="text-xs text-indigo-600 font-medium">Mark all read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`px-4 py-3 hover:bg-gray-50 transition cursor-pointer ${!notif.read ? 'bg-indigo-50/50' : ''}`}>
                        <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-sm text-indigo-600 font-medium w-full text-center">View All</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-2 border-l border-gray-200 hover:bg-gray-50 rounded-xl p-1.5 transition"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">Admin</p>
                  <p className="text-xs text-gray-400">admin@shoply.com</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">Admin User</p>
                    <p className="text-xs text-gray-400">admin@shoply.com</p>
                  </div>
                  <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <User size={16} />
                    My Profile
                  </Link>
                  <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <Settings size={16} />
                    Settings
                  </Link>
                  <Link to="/help" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                    <HelpCircle size={16} />
                    Help Center
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

export default AdminHeader;