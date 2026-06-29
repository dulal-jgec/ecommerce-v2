// src/features/seller/components/DashboardStats.jsx
import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  Star
} from 'lucide-react';
import StatCard from './StatCard';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹4,56,789',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      change: '+18.7%',
      changeType: 'up'
    },
    {
      title: 'Total Orders',
      value: '342',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      change: '+12.4%',
      changeType: 'up'
    },
    {
      title: 'Total Products',
      value: '156',
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      change: '+5.7%',
      changeType: 'up'
    },
    {
      title: 'Total Customers',
      value: '284',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      change: '+8.2%',
      changeType: 'up'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;