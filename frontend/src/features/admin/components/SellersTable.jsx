// src/features/admin/components/SellersTable.jsx
import React from 'react';
import { Eye, Edit, Trash2, CheckCircle, XCircle, Clock, Star } from 'lucide-react';

const SellersTable = ({ sellers }) => {
  const getStatusBadge = (status) => {
    const styles = {
      'Approved': 'bg-emerald-50 text-emerald-700',
      'Pending': 'bg-yellow-50 text-yellow-700',
      'Rejected': 'bg-red-50 text-red-700',
    };
    const icons = {
      'Approved': <CheckCircle size={14} />,
      'Pending': <Clock size={14} />,
      'Rejected': <XCircle size={14} />,
    };
    return (
      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || 'bg-gray-50 text-gray-700'}`}>
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sellers.map((seller) => (
            <tr key={seller.id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                    {seller.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{seller.storeName}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{seller.owner}</td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-600">{seller.email}</p>
                  <p className="text-xs text-gray-400">{seller.phone}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{seller.products}</td>
              <td className="px-6 py-4 font-semibold text-gray-800">{seller.revenue}</td>
              <td className="px-6 py-4">
                {seller.rating > 0 ? (
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{seller.rating}</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-4">{getStatusBadge(seller.status)}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
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

export default SellersTable;