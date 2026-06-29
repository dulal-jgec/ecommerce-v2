// src/features/seller/components/ConfirmDeleteModal.jsx
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-slideDown">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100 text-red-500">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Delete Product</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-600 text-sm leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-gray-800">"{productName}"</span>? 
          This action cannot be undone and all product data will be permanently removed.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition shadow-lg shadow-red-200"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;