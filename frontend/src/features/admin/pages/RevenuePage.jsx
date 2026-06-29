// src/features/admin/pages/RevenuePage.jsx
import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Download,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Banknote
} from 'lucide-react';

const RevenuePage = () => {
  const [period, setPeriod] = useState('monthly');

  const stats = [
    { 
      title: 'Total Revenue', 
      value: '₹28,45,690', 
      change: '+12.5%', 
      type: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      title: 'Net Profit', 
      value: '₹8,53,707', 
      change: '+8.3%', 
      type: 'up',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Total Orders', 
      value: '567', 
      change: '+3.2%', 
      type: 'up',
      icon: Wallet,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Avg Order Value', 
      value: '₹5,019', 
      change: '-2.1%', 
      type: 'down',
      icon: CreditCard,
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 120000, orders: 45 },
    { month: 'Feb', revenue: 180000, orders: 52 },
    { month: 'Mar', revenue: 150000, orders: 48 },
    { month: 'Apr', revenue: 220000, orders: 65 },
    { month: 'May', revenue: 280000, orders: 78 },
    { month: 'Jun', revenue: 350000, orders: 92 },
  ];

  const recentTransactions = [
    { id: '#TRX-001', customer: 'Rahul Sharma', amount: 2499, date: '25 Jun 2025', status: 'Completed', method: 'Card' },
    { id: '#TRX-002', customer: 'Priya Patel', amount: 1899, date: '24 Jun 2025', status: 'Completed', method: 'UPI' },
    { id: '#TRX-003', customer: 'Amit Kumar', amount: 4599, date: '23 Jun 2025', status: 'Pending', method: 'Net Banking' },
    { id: '#TRX-004', customer: 'Sneha Reddy', amount: 599, date: '23 Jun 2025', status: 'Failed', method: 'Card' },
    { id: '#TRX-005', customer: 'Vikram Singh', amount: 3299, date: '22 Jun 2025', status: 'Completed', method: 'UPI' },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Revenue Analytics</h1>
          <p className="text-gray-500 text-sm">Track your platform revenue and growth</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none">
              <option value="monthly">Last 6 Months</option>
              <option value="quarterly">Last Quarter</option>
              <option value="yearly">Last Year</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
                stat.type === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.type === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-800">Revenue Overview</h3>
            <p className="text-sm text-gray-400">Monthly revenue & order trends</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded"></div>
              <span className="text-gray-500">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span className="text-gray-500">Orders</span>
            </div>
          </div>
        </div>

        <div className="flex items-end gap-3 h-64 mb-4">
          {revenueData.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100;
            const orderHeight = (item.orders / 100) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-indigo-500 rounded-lg transition-all duration-500 hover:bg-indigo-600"
                    style={{ height: `${height * 0.7}%`, minHeight: '20px' }}
                  />
                  <div 
                    className="w-full bg-emerald-500 rounded-lg transition-all duration-500 hover:bg-emerald-600"
                    style={{ height: `${orderHeight * 0.4}%`, minHeight: '15px' }}
                  />
                </div>
                <span className="text-xs text-gray-400 mt-2">{item.month}</span>
              </div>
            );
          })}
        </div>
        <div className="text-center text-sm text-gray-500">
          <span className="font-semibold text-gray-700">₹13,00,000</span> total revenue in last 6 months
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">Recent Transactions</h3>
            <p className="text-sm text-gray-400">Latest payment activities</p>
          </div>
          <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700 transition">
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50/50 transition">
                  <td className="py-3 text-sm font-medium text-indigo-600">{transaction.id}</td>
                  <td className="py-3 text-sm text-gray-700">{transaction.customer}</td>
                  <td className="py-3 font-semibold text-gray-800">₹{transaction.amount.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-500">{transaction.date}</td>
                  <td className="py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      transaction.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                      transaction.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">{transaction.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;