// src/features/seller/components/SellerSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  RotateCcw, 
  Store, 
  CreditCard,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

const SellerSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/seller', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/seller/products', icon: Package, label: 'Products' },
    { path: '/seller/products/add', icon: PlusCircle, label: 'Add Product' },
    { path: '/seller/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/seller/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/seller/returns', icon: RotateCcw, label: 'Returns' },
    { path: '/seller/store-profile', icon: Store, label: 'Store Profile' },
    { path: '/seller/bank-details', icon: CreditCard, label: 'Bank Details' },
  ];

  const isActive = (path) => {
    if (path === '/seller' && location.pathname === '/seller') return true;
    if (path !== '/seller' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-200 
        transition-transform duration-300 ease-in-out overflow-y-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link to="/seller" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">SL</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ShopLy</h1>
              <p className="text-xs text-gray-400">Seller Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">
            Menu
          </p>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 my-1
                ${isActive(item.path) 
                  ? 'bg-emerald-50 text-emerald-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }
              `}
            >
              <item.icon size={20} className={isActive(item.path) ? 'text-emerald-600' : ''} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}

          <div className="border-t border-gray-100 my-4"></div>

          {/* Bottom Links */}
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition my-1"
          >
            <Home size={20} />
            <span className="font-medium text-sm">Back to Store</span>
          </Link>
          <Link
            to="/seller/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition my-1"
          >
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition w-full my-1">
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default SellerSidebar;