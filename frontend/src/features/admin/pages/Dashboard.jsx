// src/features/admin/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Store, 
  Package, 
  DollarSign,
  Calendar,
  Eye,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Activity
} from "lucide-react";
import DashboardStats from "../components/DashboardStats";
import { getDashboardStats } from "../services/adminService";
import RevenueChart from "../components/RevenueChart";
import PendingSellerTable from "../components/PendingSellerTable";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await getDashboardStats();
      setStats({
        totalUsers: data.totalUsers ?? 0,
        totalSellers: data.totalSellers ?? 0,
        totalProducts: data.totalProducts ?? 0,
        totalOrders: data.totalOrders ?? 0,
        totalRevenue: data.totalRevenue ?? 0,
      });
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Quick Stats
  const quickStats = [
    { 
      label: "Today's Orders", 
      value: 24, 
      change: "+12%", 
      trend: "up", 
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      label: "Active Users", 
      value: 876, 
      change: "+8%", 
      trend: "up", 
      icon: Users,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      label: "Conversion Rate", 
      value: "3.2%", 
      change: "+0.8%", 
      trend: "up", 
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600"
    },
    { 
      label: "Pending Orders", 
      value: 18, 
      change: "-5%", 
      trend: "down", 
      icon: Clock,
      color: "bg-amber-50 text-amber-600"
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Activity size={28} className="text-indigo-600" />
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <span>Welcome back, Admin</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date().toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Clock size={14} />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={loadDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <DashboardStats stats={stats} />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Quick Actions</h3>
              <span className="text-xs text-gray-400">⚡</span>
            </div>
            <div className="space-y-3">
              <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-sm shadow-indigo-200">
                <Package size={18} />
                Add New Product
              </button>
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-sm shadow-emerald-200">
                <Store size={18} />
                View All Sellers
              </button>
              <button className="w-full py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition flex items-center justify-center gap-2 shadow-sm shadow-amber-200">
                <ShoppingBag size={18} />
                Manage Orders
              </button>
              <button className="w-full py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition flex items-center justify-center gap-2 shadow-sm shadow-gray-200">
                <Users size={18} />
                Users Management
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Sellers */}
      <PendingSellerTable />

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <CheckCircle size={14} className="text-emerald-500" />
            System online
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} className="text-indigo-500" />
            {stats.totalUsers + stats.totalSellers} total users
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 size={14} className="text-purple-500" />
            {stats.totalProducts} products
          </span>
        </div>
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} ShopLy Admin Panel v2.0
        </div>
      </div>
    </div>
  );
};

export default Dashboard;