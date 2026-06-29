// src/features/admin/components/OrdersTable.jsx
import React from 'react';
import { Eye, Printer, MoreVertical, Check, Truck, Clock, X } from 'lucide-react';

const OrdersTable = ({ orders }) => {
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

  const getStatusBadge = (status) => {
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status] || 'bg-gray-50 text-gray-700'}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
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
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
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
  );
};

export default OrdersTable;