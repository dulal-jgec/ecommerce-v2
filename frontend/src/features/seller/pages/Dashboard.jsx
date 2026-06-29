// src/features/seller/pages/Dashboard.jsx
import React, { useState } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  ArrowUpRight,
  Star
} from 'lucide-react';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import RecentOrdersTable from '../components/RecentOrdersTable';

const Dashboard = () => {
  const [stats] = useState({
    totalRevenue: 456789,
    totalOrders: 342,
    totalProducts: 156,
    totalCustomers: 284,
    growth: 12.5,
    rating: 4.8,
  });

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`,
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      change: '+18.7%',
      changeType: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      change: '+12.4%',
      changeType: 'up'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      change: '+5.7%',
      changeType: 'up'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      change: '+8.2%',
      changeType: 'up'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back, EcoStore India</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-800">{stats.rating}</span>
            <span className="text-sm text-gray-400">(124 reviews)</span>
          </div>
          <span className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
            <TrendingUp size={16} />
            {stats.growth}% Growth
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition flex items-center justify-center gap-2">
              <Package size={18} />
              Add New Product
            </button>
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <ShoppingBag size={18} />
              View Orders
            </button>
            <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2">
              <Store size={18} />
              Update Store
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable />
    </div>
  );
};

export default Dashboard;