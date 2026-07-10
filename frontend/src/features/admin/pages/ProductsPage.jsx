// src/features/admin/pages/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  Filter,
  RefreshCw,
  Star,
  Package,
  Flame,
  TrendingUp,
  Award,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import {
  getAllProducts,
  deleteProduct,
  updateMarketing,
} from "../services/adminService";
import ConfirmModal from "../components/ConfirmModal";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTag, setFilterTag] = useState("all");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts(page, 10);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct.id);
      setShowDeleteModal(false);
      setSelectedProduct(null);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleTagToggle = async (product, tagName) => {
    setUpdating(true);
    try {
      await updateMarketing(product.id, {
        featured: product.featured,
        bestSeller: product.bestSeller,
        newArrival: product.newArrival,
        trending: product.trending,
        [tagName]: !product[tagName],
      });
      await loadProducts();
    } catch (error) {
      console.error(`Error updating ${tagName}:`, error);
    } finally {
      setUpdating(false);
    }
  };

  const stats = [
    {
      label: "Total Products",
      value: products.length || 0,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "Featured",
      value: products.filter((p) => p.featured).length,
      color: "bg-purple-50 text-purple-700",
    },
    {
      label: "Best Sellers",
      value: products.filter((p) => p.bestSeller).length,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "New Arrivals",
      value: products.filter((p) => p.newArrival).length,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Trending",
      value: products.filter((p) => p.trending).length,
      color: "bg-rose-50 text-rose-700",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = filterTag === "all" || product[filterTag] === true;

    return matchesSearch && matchesTag;
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      ACTIVE: "bg-emerald-50 text-emerald-700",
      active: "bg-emerald-50 text-emerald-700",
      INACTIVE: "bg-red-50 text-red-700",
      inactive: "bg-red-50 text-red-700",
      DRAFT: "bg-gray-50 text-gray-700",
      draft: "bg-gray-50 text-gray-700",
    };
    return (
      <span
        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusMap[status] || "bg-gray-50 text-gray-700"}`}
      >
        {status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() ||
          "Active"}
      </span>
    );
  };

  const getTagBadge = (product, tagName, icon, color) => {
    const isActive = product[tagName] === true;
    return (
      <button
        onClick={() => handleTagToggle(product, tagName)}
        disabled={updating}
        className={`
          inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all
          ${
            isActive
              ? `${color} shadow-sm`
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }
          ${updating ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
        `}
        title={isActive ? `Remove from ${tagName}` : `Add to ${tagName}`}
      >
        {icon}
        {tagName === "featured" && "Featured"}
        {tagName === "bestSeller" && "Best Seller"}
        {tagName === "newArrival" && "New"}
        {tagName === "trending" && "Trending"}
        {isActive ? <Check size={12} /> : <Plus size={12} />}
      </button>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
          <h1 className="text-2xl font-bold text-gray-800">
            Products Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage products and tags (Featured, Trending, Best Seller, New
            Arrival)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadProducts}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <Link to="/seller/products/add">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
              <Plus size={16} />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-xl p-4 text-center transition hover:shadow-md`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products by name, category..."
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
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="DRAFT">Draft</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <div className="relative">
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option value="all">All Tags</option>
                <option value="featured">⭐ Featured</option>
                <option value="bestSeller">🏆 Best Seller</option>
                <option value="newArrival">🆕 New Arrival</option>
                <option value="trending">🔥 Trending</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0]?.imageUrl ? (
                        <img
                          src={product.images[0].imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package size={18} className="text-gray-400" />
                        </div>
                      )}
                      <span className="font-medium text-sm text-gray-800 line-clamp-1">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {product.category || "N/A"}
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    ₹{product.price?.toLocaleString() || 0}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {product.stock || 0}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {getTagBadge(
                        product,
                        "featured",
                        <Star size={12} />,
                        "bg-purple-100 text-purple-700",
                      )}
                      {getTagBadge(
                        product,
                        "bestSeller",
                        <Award size={12} />,
                        "bg-amber-100 text-amber-700",
                      )}
                      {getTagBadge(
                        product,
                        "newArrival",
                        <Sparkles size={12} />,
                        "bg-emerald-100 text-emerald-700",
                      )}
                      {getTagBadge(
                        product,
                        "trending",
                        <Flame size={12} />,
                        "bg-rose-100 text-rose-700",
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(product.status)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/products/${product.id}`}>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link to={`/seller/products/edit/${product.id}`}>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products found matching your filters
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone and all product data will be permanently removed.`}
        confirmText="Delete Product"
        type="danger"
      />
    </div>
  );
};

export default ProductsPage;
