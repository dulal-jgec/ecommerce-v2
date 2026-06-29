// src/features/seller/pages/EditProductPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Eye,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import ProductForm from '../components/ProductForm';
import ProductImages from '../components/ProductImages';
import ProductVariants from '../components/ProductVariants';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const EditProductPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('basic');
  const [productData, setProductData] = useState({
    id: id,
    name: 'Organic Honey 500g',
    description: 'Pure organic honey from the Himalayas',
    category: 'Food & Beverages',
    price: '599',
    originalPrice: '899',
    stock: '45',
    images: [
      { id: 1, url: 'https://via.placeholder.com/200', isMain: true },
      { id: 2, url: 'https://via.placeholder.com/200', isMain: false },
    ],
    variants: [
      { id: 1, name: '500g', price: 599, stock: 25 },
      { id: 2, name: '1kg', price: 1099, stock: 20 },
    ],
    status: 'active'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'images', label: 'Images' },
    { id: 'variants', label: 'Variants' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link to="/seller/products" className="p-2 hover:bg-gray-100 rounded-xl transition">
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
              <p className="text-gray-500 text-sm">Update product details</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete
          </button>
          <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center gap-2">
            <Eye size={16} />
            Preview
          </button>
          <button className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition flex items-center gap-2">
            <Save size={16} />
            Update Product
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
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'basic' && (
            <ProductForm productData={productData} setProductData={setProductData} isEdit={true} />
          )}
          {activeTab === 'images' && (
            <ProductImages images={productData.images} setImages={(images) => setProductData({...productData, images})} />
          )}
          {activeTab === 'variants' && (
            <ProductVariants variants={productData.variants} setVariants={(variants) => setProductData({...productData, variants})} />
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          console.log('Product deleted:', id);
          setShowDeleteModal(false);
        }}
        productName={productData.name}
      />
    </div>
  );
};

export default EditProductPage;