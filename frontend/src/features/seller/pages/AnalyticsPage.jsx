// src/features/seller/pages/AnalyticsPage.jsx
import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Eye,
  ArrowUpRight,
  Calendar,
  ChevronDown
} from 'lucide-react';
import AnalyticsCard from '../components/AnalyticsCard';

const AnalyticsPage = () => {
  const analytics = [
    { title: 'Total Views', value: '12,847', change: '+15.2%', type: 'up', icon: Eye },
    { title: 'Conversion Rate', value: '3.2%', change: '+0.8%', type: 'up', icon: ShoppingBag },
    { title: 'Avg Order Value', value: '₹5,019', change: '-2.1%', type: 'down', icon: DollarSign },
    { title: 'New Customers', value: '284', change: '+8.4%', type: 'up', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500 text-sm">Track your store performance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition appearance-none">
              <option value="monthly">Last 6 Months</option>
              <option value="quarterly">Last Quarter</option>
              <option value="yearly">Last Year</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition">
            Export Report
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analytics.map((item, index) => (
          <AnalyticsCard key={index} {...item} />
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Traffic Overview</h3>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-400">Chart Placeholder</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Top Products</h3>
          <div className="space-y-3">
            {['Organic Honey', 'Bamboo Toothbrush', 'Yoga Mat', 'Produce Bags'].map((product, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{i+1}. {product}</span>
                <span className="text-sm font-medium text-gray-800">₹{(500 - i * 50).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;