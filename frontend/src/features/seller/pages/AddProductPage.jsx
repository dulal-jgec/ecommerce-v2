// src/features/seller/pages/AddProductPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, X, Plus, Trash2, Save, Eye } from "lucide-react";
import ProductForm from "../components/ProductForm";
import ProductImages from "../components/product-images/ProductImages";
import ProductVariants from "../components/ProductVariants";
import { createProduct } from "../services/productService";
import { useEffect } from "react";
import { getCategories } from "../services/sellerService";

const AddProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [productId, setProductId] = useState(null);
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
  const handleSaveProduct = async () => {
    try {
      const response = await createProduct(productData);

      setProductId(response.data.id);

      console.log("Create Product Response:", response);
    } catch (error) {
      console.error(error);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "images", label: "Images" },
    { id: "variants", label: "Variants" },
  ];

  const loadProducts = async () => {
    try {
      const response = await getMyProducts();

      console.log(response);

      setProducts(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
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
                Add New Product
              </h1>
              <p className="text-gray-500 text-sm">
                Create a new product listing
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2">
            <Eye size={16} />
            Preview
          </button>
          <button
            onClick={handleSaveProduct}
            className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <Save size={16} />
            Save Product
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
          {activeTab === "images" && <ProductImages productId={productId} />}
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
    </div>
  );
};

export default AddProductPage;
