import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Package, 
  ShoppingBag, 
  ListTree,
  DollarSign,
  FileText,
  Home,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const AdminSidebar = ({ sidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/sellers', icon: Store, label: 'Sellers' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/categories', icon: ListTree, label: 'Categories' },
    { path: '/admin/revenue', icon: DollarSign, label: 'Revenue' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={`
      fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-gray-200 
      transition-transform duration-300 ease-in-out overflow-y-auto
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
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
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 my-1
              ${isActive(item.path) 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }
            `}
          >
            <item.icon size={20} className={isActive(item.path) ? 'text-indigo-600' : ''} />
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
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition my-1"
        >
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <Link
          to="/help"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition my-1"
        >
          <HelpCircle size={20} />
          <span className="font-medium text-sm">Help & Support</span>
        </Link>
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition w-full my-1">
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;