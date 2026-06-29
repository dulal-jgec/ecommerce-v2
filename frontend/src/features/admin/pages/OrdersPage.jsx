// src/features/admin/pages/OrdersPage.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  Check, 
  X, 
  Clock, 
  Truck, 
  Package, 
  Filter,
  ChevronDown,
  Download,
  Printer,
  MoreVertical
} from 'lucide-react';

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const orders = [
    {
      id: '#ORD-001',
      customer: 'Rahul Sharma',
      email: 'rahul@example.com',
      products: 3,
      total: 2499,
      status: 'delivered',
      date: '25 Jun 2025',
      payment: 'Paid'
    },
    {
      id: '#ORD-002',
      customer: 'Priya Patel',
      email: 'priya@example.com',
      products: 2,
      total: 1899,
      status: 'shipped',
      date: '24 Jun 2025',
      payment: 'Paid'
    },
    {
      id: '#ORD-003',
      customer: 'Amit Kumar',
      email: 'amit@example.com',
      products: 5,
      total: 4599,
      status: 'processing',
      date: '23 Jun 2025',
      payment: 'Paid'
    },
    {
      id: '#ORD-004',
      customer: 'Sneha Reddy',
      email: 'sneha@example.com',
      products: 1,
      total: 599,
      status: 'pending',
      date: '23 Jun 2025',
      payment: 'Unpaid'
    },
    {
      id: '#ORD-005',
      customer: 'Vikram Singh',
      email: 'vikram@example.com',
      products: 4,
      total: 3299,
      status: 'cancelled',
      date: '22 Jun 2025',
      payment: 'Refunded'
    },
  ];

  const statusColors = {
    delivered: 'bg-emerald-100 text-emerald-700',
    shipped: 'bg-blue-100 text-blue-700',
    processing: 'bg-yellow-100 text-yellow-700',
    pending: 'bg-orange-100 text-orange-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    delivered: <Check size={14} />,
    shipped: <Truck size={14} />,
    processing: <Clock size={14} />,
    pending: <Clock size={14} />,
    cancelled: <X size={14} />,
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
          <p className="text-gray-500 text-sm">Manage all customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
            <Package size={16} />
            New Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, customer, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none"
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
            <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:bg-gray-100 transition flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Orders', value: '567', color: 'bg-indigo-50 text-indigo-700' },
          { label: 'Processing', value: '48', color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Shipped', value: '126', color: 'bg-blue-50 text-blue-700' },
          { label: 'Delivered', value: '356', color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Cancelled', value: '37', color: 'bg-red-50 text-red-700' },
        ].map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <span className="font-medium text-sm text-indigo-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm text-gray-800">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.products}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">₹{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                        <Printer size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-gray-800">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing {filteredOrders.length} of {orders.length} orders</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">3</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;