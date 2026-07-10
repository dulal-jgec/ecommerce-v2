// src/features/seller/pages/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { getMyProducts } from "../services/productService";
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
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Image as ImageIcon
} from 'lucide-react';
import ConfirmModal from '../../admin/components/ConfirmModal';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getMyProducts();
     
      const productsData = data?.data || data || [];
      setProducts(productsData);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    try {
      // Call delete API here
      
      setShowDeleteModal(false);
      setSelectedProduct(null);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Stats based on actual data
  const stats = [
    { 
      label: 'Total Products', 
      value: products.length, 
      color: 'bg-indigo-50 text-indigo-700',
      icon: Package,
      desc: 'All products'
    },
    { 
      label: 'In Stock', 
      value: products.filter(p => p.stock > 0).length, 
      color: 'bg-emerald-50 text-emerald-700',
      icon: CheckCircle,
      desc: 'Available'
    },
    { 
      label: 'Low Stock', 
      value: products.filter(p => p.stock > 0 && p.stock <= 5).length, 
      color: 'bg-yellow-50 text-yellow-700',
      icon: AlertCircle,
      desc: 'Less than 5'
    },
    { 
      label: 'Out of Stock', 
      value: products.filter(p => p.stock === 0).length, 
      color: 'bg-red-50 text-red-700',
      icon: XCircle,
      desc: 'Unavailable'
    },
  ];

  //  Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sellerEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesStatus = true;
    if (filterStatus === 'active') {
      matchesStatus = product.stock > 0;
    } else if (filterStatus === 'low-stock') {
      matchesStatus = product.stock > 0 && product.stock <= 5;
    } else if (filterStatus === 'out-of-stock') {
      matchesStatus = product.stock === 0;
    }

    return matchesSearch && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (stock) => {
    if (stock === 0) {
      return { label: 'Out of Stock', color: 'bg-red-100 text-red-700', icon: '🔴' };
    } else if (stock <= 5) {
      return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-700', icon: '🟡' };
    } else {
      return { label: 'In Stock', color: 'bg-emerald-100 text-emerald-700', icon: '🟢' };
    }
  };

  //  Get discount badge
  const getDiscountBadge = (discount) => {
    if (discount && discount > 0) {
      return (
        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
          {discount}% OFF
        </span>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Package size={24} className="text-emerald-600" />
            My Products
          </h1>
          <p className="text-gray-500 text-sm">Manage your product catalog</p>
        </div>
        <Link to="/seller/products/add">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-emerald-200 transition shadow-md">
            <Plus size={16} />
            Add Product
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.color} rounded-2xl p-5 transition hover:shadow-md`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs opacity-70">{stat.desc}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-xl">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, category..."
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
                <option value="all">All Products</option>
                <option value="active">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
              {filteredProducts.map((product) => {
                const status = getStatusBadge(product.stock);
                const discount = product.originalPrice && product.originalPrice > product.price
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : 0;

                return (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                          {product.images?.[0]?.imageUrl ? (
                            <img 
                              src={product.images[0].imageUrl} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-800 line-clamp-1">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {discount > 0 && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                                {discount}% OFF
                              </span>
                            )}
                            {product.featured && (
                              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
                            {product.bestSeller && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                Best Seller
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {product.category || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-800">₹{product.price?.toLocaleString()}</p>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice?.toLocaleString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {product.averageRating || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                        <span>{status.icon}</span>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/products/${product.id}`}>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-emerald-600" title="View">
                            <Eye size={16} />
                          </button>
                        </Link>
                        <Link to={`/seller/products/edit/${product.id}`}>
                          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600" title="Edit">
                            <Edit size={16} />
                          </button>
                        </Link>
                        <button 
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600" 
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">No products found</p>
            <p className="text-sm text-gray-400">Try adjusting your filters or add a new product</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm shadow-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">3</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Next</button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete Product"
        type="danger"
      />
    </div>
  );
};

export default ProductsPage;