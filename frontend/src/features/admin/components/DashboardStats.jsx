// src/features/admin/components/DashboardStats.jsx
import React from 'react';
import { Users, Store, Package, ShoppingBag, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import StatCard from './StatCard';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,248',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+8.2%',
      changeType: 'up'
    },
    {
      title: 'Total Sellers',
      value: '86',
      icon: Store,
      color: 'from-emerald-500 to-emerald-600',
      change: '+12.4%',
      changeType: 'up'
    },
    {
      title: 'Total Products',
      value: '3,421',
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      change: '+5.7%',
      changeType: 'up'
    },
    {
      title: 'Total Orders',
      value: '567',
      icon: ShoppingBag,
      color: 'from-orange-500 to-orange-600',
      change: '+3.2%',
      changeType: 'up'
    },
    {
      title: 'Revenue',
      value: '₹28.4L',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      change: '+18.7%',
      changeType: 'up'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;