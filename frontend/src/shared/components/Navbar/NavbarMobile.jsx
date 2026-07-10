// src/shared/components/Navbar/NavbarMobile.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag, Heart, LogOut, Settings, LayoutDashboard } from "lucide-react";
import Logo from "../Logo/Logo";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { useCart } from "../../../features/cart/hooks/useCart";

const NavbarMobile = ({ isOpen, setIsOpen }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
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
    <div className="py-3">
      <div className="flex items-center justify-between">
        <Logo size="sm" />

        <div className="flex items-center gap-1">
          <button className="p-2 text-white hover:text-indigo-300 rounded-full transition-colors">
            <Search size={20} />
          </button>

          <Link to="/cart" className="relative p-2 text-white hover:text-indigo-300 rounded-full transition-colors">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-indigo-400 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:text-indigo-300 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-1 animate-slideDown">
          <Link
            to="/"
            className="flex items-center px-4 py-3.5 text-white hover:text-indigo-300 hover:bg-white/10 rounded-xl font-medium transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="flex items-center px-4 py-3.5 text-white hover:text-indigo-300 hover:bg-white/10 rounded-xl font-medium transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/about"
            className="flex items-center px-4 py-3.5 text-white hover:text-indigo-300 hover:bg-white/10 rounded-xl font-medium transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          <div className="border-t border-white/10 my-2"></div>

          {isAuthenticated ? (
            <>
              <div className="px-4 py-2">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.email || "User"}
                </p>
                <p className="text-xs text-white/60 capitalize">
                  {user?.role?.toLowerCase() || "Buyer"}
                </p>
              </div>

              {/*  Dashboard Link - Only for Admin/Seller */}
              {dashboardLink && (
                <Link
                  to={dashboardLink}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:text-indigo-300 hover:bg-white/10 rounded-xl transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
              )}

              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-3 text-white hover:text-indigo-300 hover:bg-white/10 rounded-xl transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>
              <Link
                to="/orders"
                className="flex items-center gap-3 px-4 py-3 text-white hover:text-indigo-300 hover:bg-white/10 rounded-xl transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={18} />
                <span>My Orders</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200 w-full"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="flex items-center gap-2 px-4 py-3.5 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium transition-all duration-200 hover:bg-white/30 border border-white/20"
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