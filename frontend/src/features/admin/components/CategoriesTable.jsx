// src/features/admin/components/CategoriesTable.jsx
import React from 'react';
import { Edit, Trash2, Copy } from 'lucide-react';

const CategoriesTable = ({ categories }) => {
  const getStatusBadge = (status) => {
    return (
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
        status === 'Active' 
          ? 'bg-emerald-50 text-emerald-700' 
          : 'bg-red-50 text-red-700'
      }`}>
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-sm text-gray-800">{category.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{category.slug}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{category.parent || '-'}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{category.subcategories}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{category.products}</td>
              <td className="px-6 py-4">{getStatusBadge(category.status)}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                    <Copy size={16} />
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

export default CategoriesTable;