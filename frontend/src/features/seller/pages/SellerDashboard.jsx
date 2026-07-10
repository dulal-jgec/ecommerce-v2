// src/features/seller/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Package, 
  Store, 
  TrendingUp, 
  Users,
  ArrowUpRight,
  Calendar,
  RefreshCw,
  Clock,
  CheckCircle,
  Eye,
  BarChart3,
  Activity,
  PlusCircle,
  CreditCard
} from "lucide-react";
import RevenueChart from "../components/RevenueChart";
import RecentOrdersTable from "../components/RecentOrdersTable";
import { getDashboardStats } from "../services/sellerService";
import DashboardStats from "../components/DashboardStats";

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
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
      setStats(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  // Quick Stats
  const quickStats = [
    { 
      label: "Today's Revenue", 
      value: "₹4,250", 
      change: "+12%", 
      trend: "up", 
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      label: "Total Customers", 
      value: "284", 
      change: "+8%", 
      trend: "up", 
      icon: Users,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      label: "Avg Order Value", 
      value: "₹5,019", 
      change: "+3.2%", 
      trend: "up", 
      icon: CreditCard,
      color: "bg-purple-50 text-purple-600"
    },
    { 
      label: "Completion Rate", 
      value: "94%", 
      change: "+2.1%", 
      trend: "up", 
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-600"
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
            <Activity size={28} className="text-emerald-600" />
            Seller Dashboard
          </h1>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <span>Welcome back, Seller</span>
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
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
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
                  <ArrowUpRight size={14} />
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
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-sm shadow-emerald-200">
                <PlusCircle size={18} />
                Add New Product
              </button>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm shadow-blue-200">
                <ShoppingBag size={18} />
                View Orders
              </button>
              <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-sm shadow-purple-200">
                <Store size={18} />
                Update Store
              </button>
              <button className="w-full py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition flex items-center justify-center gap-2 shadow-sm shadow-amber-200">
                <Package size={18} />
                Manage Products
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable />

      {/* Footer Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <CheckCircle size={14} className="text-emerald-500" />
            Store online
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} className="text-blue-500" />
            {stats.totalProducts} products listed
          </span>
          <span className="flex items-center gap-1">
            <ShoppingBag size={14} className="text-purple-500" />
            {stats.totalOrders} total orders
          </span>
        </div>
        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} ShopLy Seller Panel
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;