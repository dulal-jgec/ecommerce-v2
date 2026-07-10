// src/features/admin/pages/CategoriesPage.jsx
import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronDown,
  FolderTree,
  Package,
  Edit,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
  X,
  Check,
  AlertCircle
} from "lucide-react";
import CategoryTable from "../components/CategoriesTable";
import CategoryForm from "../components/CategoryForm";
import { getCategories, createCategory } from "../services/categoryService.js";
import ConfirmModal from "../components/ConfirmModal";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
       
      
 
      const categoriesData = response?.data || response || [];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (formData) => {
    try {
      const result = await createCategory(formData);
       
      await loadCategories();
      setShowForm(false); 
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category. Please try again.");
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.id);
      await loadCategories();
      setShowDeleteModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

   const stats = [
    { label: "Total Categories", value: categories.length, color: "bg-indigo-50 text-indigo-700", icon: FolderTree },
    { label: "Active", value: categories.filter(c => c.active !== false).length, color: "bg-emerald-50 text-emerald-700", icon: Check },
    { label: "Inactive", value: categories.filter(c => c.active === false).length, color: "bg-red-50 text-red-700", icon: X },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading categories...</p>
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
            <FolderTree size={24} className="text-indigo-600" />
            Categories Management
          </h1>
          <p className="text-gray-500 text-sm">Manage product categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);  
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition shadow-md"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.color} rounded-xl p-4 text-center transition hover:shadow-md`}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={loadCategories}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:bg-gray-100 transition flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Category Table */}
      <CategoryTable
        categories={filteredCategories}
        onEdit={(category) => {
          setEditingCategory(category);
          setShowForm(true);
        }}
        onDelete={(category) => {
          setSelectedCategory(category);
          setShowDeleteModal(true);
        }}
      />

      {/* Category Form Modal - Only shows when showForm is true */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onClose={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
          onSubmit={handleCreateCategory}
        />
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? This action cannot be undone.`}
        confirmText="Delete Category"
        type="danger"
      />
    </div>
  );
};

export default CategoriesPage;