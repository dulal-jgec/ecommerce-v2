// src/features/seller/pages/AddProductPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  X, 
  Save, 
  Eye,
  CheckCircle,
  AlertCircle,
  Loader
} from "lucide-react";
import ProductForm from "../components/ProductForm";
import ProductImages from "../components/product-images/ProductImages";
import ProductVariants from "../components/ProductVariants";
import { createProduct, updateProduct, getProductById } from "../services/productService";
import { getCategories } from "../services/sellerService";

const AddProductPage = ({ isEdit = false, productId: editProductId }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    originalPrice: "",
    stock: "",
    images: [],
    variants: [],
    status: "draft",
  });

  // ✅ Load categories
  useEffect(() => {
    loadCategories();
  }, []);

  // ✅ If editing, load product data
  useEffect(() => {
    if (isEdit && editProductId) {
      loadProductData(editProductId);
    }
  }, [isEdit, editProductId]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadProductData = async (id) => {
    try {
      const response = await getProductById(id);
      const product = response.data || response;
      setProductData({
        name: product.name || "",
        description: product.description || "",
        categoryId: product.categoryId || product.category?.id || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        stock: product.stock || "",
        images: product.images || [],
        variants: product.variants || [],
        status: product.status || "draft",
      });
      setProductId(id);
    } catch (error) {
      console.error("Error loading product:", error);
      showToast("Failed to load product data", "error");
    }
  };

  // ✅ Show Toast Message
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // ✅ Save Product - Step by Step
  const handleSaveProduct = async () => {
    // Step 1: Validation
    if (!productData.name.trim()) {
      showToast("Please enter product name", "error");
      setActiveTab("basic");
      return;
    }
    if (!productData.categoryId) {
      showToast("Please select a category", "error");
      setActiveTab("basic");
      return;
    }
    if (!productData.price || parseFloat(productData.price) <= 0) {
      showToast("Please enter a valid price", "error");
      setActiveTab("basic");
      return;
    }

    setIsSaving(true);
    setLoading(true);
    
    try {
      let response;
      let newProductId;
      
      if (isEdit && productId) {
        // ✅ Update existing product
        response = await updateProduct(productId, productData);
        newProductId = productId;
        showToast("✅ Product updated successfully!", "success");
        setSaveSuccess(true);
      } else {
        // ✅ Create new product
        response = await createProduct(productData);
        newProductId = response.data?.id || response.id;
        setProductId(newProductId);
        showToast("🎉 Product created successfully!", "success");
        setSaveSuccess(true);
      }
      
      console.log("Product saved:", response);
      
      // ✅ Auto switch to images tab after successful save (only for new product)
      if (!isEdit && newProductId) {
        setTimeout(() => {
          setActiveTab("images");
        }, 800);
      }
      
    } catch (error) {
      console.error("Error saving product:", error);
      showToast(
        error.response?.data?.message || "Failed to save product. Please try again.",
        "error"
      );
      setSaveSuccess(false);
    } finally {
      setLoading(false);
      setIsSaving(false);
    }
  };

  // ✅ Preview Product
  const handlePreview = () => {
    if (productId) {
      window.open(`/products/${productId}`, "_blank");
    } else {
      showToast("Please save the product first to preview", "error");
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "images", label: "Images" },
    { id: "variants", label: "Variants" },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* ✅ Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 max-w-md w-full animate-slideDown">
          <div className={`rounded-2xl shadow-2xl p-5 flex items-start gap-4 border ${
            toast.type === "success" 
              ? "bg-emerald-50 border-emerald-200" 
              : "bg-red-50 border-red-200"
          }`}>
            <div className="flex-shrink-0">
              {toast.type === "success" ? (
                <CheckCircle size={24} className="text-emerald-600" />
              ) : (
                <AlertCircle size={24} className="text-red-600" />
              )}
            </div>
            <div className="flex-1">
              <p className={`font-medium ${toast.type === "success" ? "text-emerald-800" : "text-red-800"}`}>
                {toast.type === "success" ? "Success!" : "Error!"}
              </p>
              <p className={`text-sm ${toast.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(null)}
              className="flex-shrink-0 p-1 hover:bg-black/5 rounded-lg transition"
            >
              <X size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link
              to="/seller/dashboard"
              className="p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEdit ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-gray-500 text-sm">
                {isEdit ? "Update your product listing" : "Create a new product listing"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreview}
            disabled={!productId}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            onClick={handleSaveProduct}
            disabled={loading}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm shadow-emerald-200 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader size={16} className="animate-spin" />
                {isEdit ? "Updating..." : "Saving..."}
              </>
            ) : (
              <>
                <Save size={16} />
                {isEdit ? "Update Product" : "Save Product"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100 px-6">
          <div className="flex gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "basic" && (
            <ProductForm
              productData={productData}
              setProductData={setProductData}
              categories={categories}
            />
          )}
          {activeTab === "images" && (
            <ProductImages 
              productId={productId} 
              onUploadComplete={() => {
                showToast("Image uploaded successfully!", "success");
              }}
            />
          )}
          {activeTab === "variants" && (
            <ProductVariants
              variants={productData.variants}
              setVariants={(variants) =>
                setProductData({ ...productData, variants })
              }
            />
          )}
        </div>
      </div>

      {/* ✅ Bottom Action Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Progress Indicator */}
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${productData.name ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
              <span className={productData.name ? 'text-gray-700' : 'text-gray-400'}>Basic Info</span>
              {productData.name && <CheckCircle size={14} className="text-emerald-500" />}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${productId ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
              <span className={productId ? 'text-gray-700' : 'text-gray-400'}>Images</span>
              {productId && <CheckCircle size={14} className="text-emerald-500" />}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${productData.variants?.length > 0 ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
              <span className={productData.variants?.length > 0 ? 'text-gray-700' : 'text-gray-400'}>Variants</span>
              {productData.variants?.length > 0 && <CheckCircle size={14} className="text-emerald-500" />}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/seller/products")}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProduct}
              disabled={loading}
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm shadow-emerald-200 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  {isEdit ? "Updating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isEdit ? "Update Product" : "Save Product"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Success Overlay (Optional) */}
      {saveSuccess && !loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-scaleIn">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {isEdit ? "Product Updated!" : "Product Created!"}
            </h3>
            <p className="text-gray-500 mt-2">
              {isEdit 
                ? "Your product has been updated successfully." 
                : "Your product has been created successfully. Now you can add images."}
            </p>
            <div className="flex gap-3 mt-6">
              {!isEdit && (
                <button
                  onClick={() => {
                    setSaveSuccess(false);
                    setActiveTab("images");
                  }}
                  className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition"
                >
                  Add Images
                </button>
              )}
              <button
                onClick={() => {
                  setSaveSuccess(false);
                  navigate("/seller/products");
                }}
                className={`${!isEdit ? 'flex-1' : 'w-full'} px-4 py-2.5 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition`}
              >
                Go to Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductPage;