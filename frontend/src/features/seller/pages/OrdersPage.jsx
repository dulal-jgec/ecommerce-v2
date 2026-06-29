// src/features/seller/pages/OrdersPage.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, Filter, Eye } from 'lucide-react';
import OrderTable from '../components/OrderTable';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    { id: '#ORD-001', customer: 'Rahul Sharma', items: 3, total: 2499, status: 'delivered', date: '25 Jun 2025' },
    { id: '#ORD-002', customer: 'Priya Patel', items: 2, total: 1899, status: 'shipped', date: '24 Jun 2025' },
    { id: '#ORD-003', customer: 'Amit Kumar', items: 5, total: 4599, status: 'processing', date: '23 Jun 2025' },
    { id: '#ORD-004', customer: 'Sneha Reddy', items: 1, total: 599, status: 'pending', date: '23 Jun 2025' },
    { id: '#ORD-005', customer: 'Vikram Singh', items: 4, total: 3299, status: 'delivered', date: '22 Jun 2025' },
  ];

  const stats = [
    { label: 'Total Orders', value: '342', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Pending', value: '28', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Processing', value: '45', color: 'bg-blue-50 text-blue-700' },
    { label: 'Completed', value: '269', color: 'bg-green-50 text-green-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-500 text-sm">Manage all your orders</p>
        </div>
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
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrdersPage;