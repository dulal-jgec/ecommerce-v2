// src/customer/components/HomeSection/Navigation.jsx
import React, { useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Navigation = () => {
  const { cartItems } = useCart();
  const isLoggedIn = false;

  const { user, logout, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/men", dropdown: true },
    { name: "Women", href: "/women", dropdown: true },
    { name: "Electronics", href: "/electronics", dropdown: true },
    { name: "Fashion", href: "/fashion", dropdown: true },
    { name: "Accessories", href: "/accessories", dropdown: true },
  ];

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const wishlistCount = 0;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl"></div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                LUXE
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center gap-1"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        New Arrivals
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Best Sellers
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sale
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Limited Edition
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>

              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {!isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link to="/login">Sign In</Link>

                  <Link
                    to="/register"
                    className="bg-black text-white px-4 py-2 rounded-lg"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{user?.firstName}</span>

                  <button onClick={logout} className="text-red-500">
                    Logout
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-slideDown">
            <div className="px-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style>{`
  .swiper-pagination-bullet {
    background: #9ca3af !important;
  }

  .swiper-pagination-bullet-active {
    background: #111827 !important;
  }
`}</style>
    </>
  );
};

export default Navigation;
