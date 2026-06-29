// src/features/seller/components/OrderTable.jsx
import React from 'react';
import { Eye, Truck, Check, Clock, X } from 'lucide-react';

const OrderTable = ({ orders }) => {
  const statusConfig = {
    delivered: { icon: Check, color: 'bg-emerald-100 text-emerald-700' },
    shipped: { icon: Truck, color: 'bg-blue-100 text-blue-700' },
    processing: { icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
    pending: { icon: Clock, color: 'bg-orange-100 text-orange-700' },
    cancelled: { icon: X, color: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status]?.icon || Clock;
              const statusColor = statusConfig[order.status]?.color || 'bg-gray-100 text-gray-700';
              return (
                <tr key={order.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-emerald-600">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">₹{order.total.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${statusColor}`}>
                      <StatusIcon size={12} />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
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

      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 5 of 342 orders</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition" disabled>Previous</button>
          <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">2</button>
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">3</button>
          <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;