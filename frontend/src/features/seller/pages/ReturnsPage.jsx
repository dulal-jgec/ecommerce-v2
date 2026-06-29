// src/features/seller/pages/ReturnsPage.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, Eye, Check, X, Clock } from 'lucide-react';

const ReturnsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const returns = [
    { id: '#RET-001', orderId: '#ORD-001', product: 'Organic Honey 500g', customer: 'Rahul Sharma', reason: 'Damaged', status: 'pending', date: '25 Jun 2025' },
    { id: '#RET-002', orderId: '#ORD-003', product: 'Yoga Mat Organic', customer: 'Amit Kumar', reason: 'Wrong Size', status: 'approved', date: '23 Jun 2025' },
    { id: '#RET-003', orderId: '#ORD-004', product: 'Bamboo Toothbrush', customer: 'Sneha Reddy', reason: 'Defective', status: 'rejected', date: '22 Jun 2025' },
    { id: '#RET-004', orderId: '#ORD-002', product: 'Produce Bags', customer: 'Priya Patel', reason: 'Changed Mind', status: 'completed', date: '20 Jun 2025' },
  ];

  const stats = [
    { label: 'Total Returns', value: '28', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Pending', value: '8', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Approved', value: '12', color: 'bg-blue-50 text-blue-700' },
    { label: 'Completed', value: '8', color: 'bg-green-50 text-green-700' },
  ];

  const statusConfig = {
    pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    approved: { icon: Check, color: 'bg-blue-100 text-blue-700' },
    rejected: { icon: X, color: 'bg-red-100 text-red-700' },
    completed: { icon: Check, color: 'bg-green-100 text-green-700' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Returns</h1>
        <p className="text-gray-500 text-sm">Manage product returns and refunds</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search returns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm"
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {returns.map((returnItem) => {
                const StatusIcon = statusConfig[returnItem.status]?.icon || Clock;
                const statusColor = statusConfig[returnItem.status]?.color || 'bg-gray-100 text-gray-700';
                return (
                  <tr key={returnItem.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-emerald-600">{returnItem.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{returnItem.orderId}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{returnItem.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{returnItem.customer}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{returnItem.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusColor}`}>
                        <StatusIcon size={12} />
                        {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-emerald-600">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;