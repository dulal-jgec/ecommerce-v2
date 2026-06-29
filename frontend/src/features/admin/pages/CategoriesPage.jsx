// src/features/admin/pages/CategoriesPage.jsx
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  ChevronDown,
  FolderTree,
  Package,
  MoreVertical
} from 'lucide-react';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    { id: 1, name: 'Electronics', slug: 'electronics', products: 342, status: 'Active', icon: '📱' },
    { id: 2, name: 'Clothing', slug: 'clothing', products: 289, status: 'Active', icon: '👕' },
    { id: 3, name: 'Mobile Phones', slug: 'mobile-phones', products: 156, status: 'Active', icon: '📱', parent: 'Electronics' },
    { id: 4, name: 'Home & Living', slug: 'home-living', products: 198, status: 'Active', icon: '🏠' },
    { id: 5, name: 'Beauty', slug: 'beauty', products: 134, status: 'Inactive', icon: '💄' },
    { id: 6, name: 'Books', slug: 'books', products: 89, status: 'Active', icon: '📚' },
    { id: 7, name: 'Toys', slug: 'toys', products: 67, status: 'Active', icon: '🧸' },
    { id: 8, name: 'Sports', slug: 'sports', products: 45, status: 'Inactive', icon: '⚽' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
          <p className="text-gray-500 text-sm">Manage product categories and subcategories</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition flex items-center gap-2">
            <FolderTree size={16} />
            View Hierarchy
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Categories', value: '128', color: 'bg-indigo-50 text-indigo-700' },
          { label: 'Active', value: '92', color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Inactive', value: '36', color: 'bg-red-50 text-red-700' },
          { label: 'Subcategories', value: '45', color: 'bg-purple-50 text-purple-700' },
        ].map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl p-4 text-center`}>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium text-sm text-gray-800">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.slug}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{category.parent || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{category.products}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      category.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
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
          <p className="text-sm text-gray-500">Showing {filteredCategories.length} of {categories.length} categories</p>
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

export default CategoriesPage;