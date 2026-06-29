// src/features/seller/pages/ProductsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  ChevronDown,
  Filter,
  MoreVertical,
  Star,
  Package
} from 'lucide-react';
import ProductTable from '../components/ProductTable';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const products = [
    { id: 1, name: 'Organic Honey 500g', price: 599, stock: 45, status: 'Active', rating: 4.8, image: '🍯' },
    { id: 2, name: 'Bamboo Toothbrush Set', price: 299, stock: 120, status: 'Active', rating: 4.7, image: '🪥' },
    { id: 3, name: 'Yoga Mat Organic', price: 1999, stock: 8, status: 'Low Stock', rating: 4.6, image: '🧘' },
    { id: 4, name: 'Reusable Produce Bags', price: 449, stock: 0, status: 'Out of Stock', rating: 4.5, image: '🛍️' },
    { id: 5, name: 'Beeswax Food Wraps', price: 399, stock: 67, status: 'Active', rating: 4.9, image: '🍯' },
  ];

  const stats = [
    { label: 'Total Products', value: '156', color: 'bg-emerald-50 text-emerald-700' },
    { label: 'Active', value: '124', color: 'bg-green-50 text-green-700' },
    { label: 'Low Stock', value: '18', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Out of Stock', value: '14', color: 'bg-red-50 text-red-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
          <p className="text-gray-500 text-sm">Manage your product catalog</p>
        </div>
        <Link to="/seller/products/add">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
            <Plus size={16} />
            Add Product
          </button>
        </Link>
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
              placeholder="Search products..."
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
                <option value="Active">Active</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <ProductTable products={products} />
    </div>
  );
};

export default ProductsPage;