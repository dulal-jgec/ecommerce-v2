// src/shared/components/Navbar/NavbarDesktop.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  LogOut,
  Settings,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import Logo from "../Logo/Logo";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useCart } from "../../../features/cart/hooks/useCart";

const NavbarDesktop = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  // Dashboard link based on role
  const getDashboardLink = () => {
    if (!user) return null;
    const role = user?.role?.toUpperCase();
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "SELLER") return "/seller/dashboard";
    return null;
  };

  const dashboardLink = getDashboardLink();

  return (
    <div className="flex items-center justify-between h-16">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* Center: Navigation */}
      <div className="hidden lg:flex items-center gap-1">
        <Link
          to="/"
          className="relative px-4 py-2 text-white font-medium text-sm tracking-wide hover:text-indigo-300 transition-all duration-300 group"
        >
          Home
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
        <Link
          to="/products"
          className="relative px-4 py-2 text-white font-medium text-sm tracking-wide hover:text-indigo-300 transition-all duration-300 group"
        >
          Shop
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
        <Link
          to="/about"
          className="relative px-4 py-2 text-white font-medium text-sm tracking-wide hover:text-indigo-300 transition-all duration-300 group"
        >
          About
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
      </div>

      {/* Right: Search + Actions */}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div
          className={`relative flex items-center transition-all duration-300 ${searchFocused ? "w-72" : "w-56"}`}
        >
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${searchFocused ? "bg-white shadow-lg shadow-indigo-100/50 ring-2 ring-indigo-400" : "bg-white/20 backdrop-blur-sm border border-white/30"}`}
          ></div>
          <Search
            className={`absolute left-3 z-10 transition-colors duration-300 ${searchFocused ? "text-indigo-600" : "text-white/70"}`}
            size={16}
          />
          <input
            type="text"
            placeholder="Search for products..."
            className="relative z-10 w-full py-2 pl-9 pr-3 bg-transparent rounded-full outline-none text-white placeholder-white/60 text-sm transition-all duration-300"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Wishlist */}
        <button className="relative p-2 text-white hover:text-indigo-300 hover:bg-white/10 rounded-full transition-all duration-300 group">
          <Heart size={18} className="group-hover:scale-110 transition-transform" />
          <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-rose-500/30">
            3
          </span>
        </button>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative p-2 text-white hover:text-indigo-300 hover:bg-white/10 rounded-full transition-all duration-300 group"
        >
          <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-indigo-400 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              {totalItems}
            </span>
          )}
        </Link>

        {/* User Section */}
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-full transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-500/30">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <ChevronDown
                size={14}
                className={`text-white/70 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-100 py-2 animate-slideDown z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.email || "User"}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role?.toLowerCase() || "Buyer"}
                  </p>
                </div>

                {/* Dashboard Link - Only for Admin/Seller */}
                {dashboardLink && (
                  <Link
                    to={dashboardLink}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={16} />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <ShoppingBag size={16} />
                  <span>My Orders</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>

                <div className="border-t border-gray-100 my-1"></div>

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
          <Link to="/signin">
            <button className="px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium text-sm hover:bg-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/20 border border-white/30">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarDesktop;