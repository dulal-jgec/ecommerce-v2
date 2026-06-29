// src/features/admin/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Users, Store, Package, ShoppingBag, DollarSign } from 'lucide-react';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import TrafficSources from '../components/TrafficSources';
import PendingSellerTable from '../components/PendingSellerTable';
import { getDashboardStats, getRevenueData } from '../services/adminService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers.toLocaleString(), 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      change: '+8.2%',
      changeType: 'up'
    },
    { 
      title: 'Total Sellers', 
      value: stats.totalSellers.toLocaleString(), 
      icon: Store, 
      color: 'from-emerald-500 to-emerald-600',
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
      title: 'Total Orders', 
      value: stats.totalOrders.toLocaleString(), 
      icon: ShoppingBag, 
      color: 'from-orange-500 to-orange-600',
      change: '+3.2%',
      changeType: 'up'
    },
    { 
      title: 'Revenue', 
      value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`, 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600',
      change: '+18.7%',
      changeType: 'up'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm">Platform overview at a glance</p>
        </div>
        <button 
          onClick={loadDashboard}
          className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TrafficSources />
        </div>
      </div>

      <PendingSellerTable />
    </div>
  );
};

export default Dashboard;