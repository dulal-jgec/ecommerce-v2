import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  ShoppingBag,
  ListTree,
  DollarSign,
  FileText,
  Menu,
  X,
  Image,
  Home,
} from "lucide-react";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Users" },
    { path: "/admin/sellers", icon: Store, label: "Sellers" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
    { path: "/admin/categories", icon: ListTree, label: "Categories" },
    { path: "/admin/banners", icon: Image, label: "Banners" },
    { path: "/admin/revenue", icon: DollarSign, label: "Revenue" },
    { path: "/admin/reports", icon: FileText, label: "Reports" },
  ];

  const isActive = (path) => {
    if (path === "/admin" && location.pathname === "/admin") return true;
    if (path !== "/admin" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-200 
        transition-transform duration-300 ease-in-out overflow-y-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">SL</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ShopLy</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">
            Management
          </p>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive(item.path)
                    ? "bg-indigo-50 text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }
              `}
            >
              <item.icon
                size={20}
                className={isActive(item.path) ? "text-indigo-600" : ""}
              />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}

          <div className="border-t border-gray-100 my-4"></div>

          {/* Back to Store */}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition"
          >
            <Home size={20} />
            <span className="font-medium text-sm">Back to Store</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
