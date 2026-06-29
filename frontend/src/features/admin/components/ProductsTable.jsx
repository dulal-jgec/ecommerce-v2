// src/features/admin/components/ProductsTable.jsx
import React from 'react';
import { Eye, Edit, Trash2, Star } from 'lucide-react';

const ProductsTable = ({ products }) => {
  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-emerald-50 text-emerald-700',
      'Out of Stock': 'bg-red-50 text-red-700',
      'Low Stock': 'bg-yellow-50 text-yellow-700',
    };
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status] || 'bg-gray-50 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{product.image}</span>
                  <span className="font-medium text-sm text-gray-800">{product.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
              <td className="px-6 py-4 font-semibold text-gray-800">₹{product.price.toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </td>
              <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
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

export default ProductsTable;