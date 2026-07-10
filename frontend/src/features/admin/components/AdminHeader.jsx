import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hooks/useAuth";

const AdminHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const email = user?.email || "No Email";
  const name = email.split("@")[0];
  const firstLetter = name.charAt(0).toUpperCase();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
              <h2 className="text-lg font-semibold text-gray-800">
                Dashboard
              </h2>
              <p className="text-xs text-gray-400">
                Welcome back, {name}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="hidden sm:block relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition w-48 lg:w-64"
              />
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-2 border-l border-gray-200 hover:bg-gray-50 rounded-xl p-1.5 transition"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {firstLetter}
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {name}
                  </p>

                  <p className="text-xs text-gray-400">
                    {email}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">

                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">
                      {name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {email}
                    </p>
                  </div>

                  <Link
                    to="/admin/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User size={16} />
                    My Profile
                  </Link>

                  <Link
                    to="/admin/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings size={16} />
                    Settings
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <HelpCircle size={16} />
                    Help Center
                  </Link>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={async () => {
                      const ok = window.confirm(
                        "Are you sure you want to logout?"
                      );

                      if (!ok) return;

                      setShowProfileMenu(false);
                      await logout();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full"
                  >
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