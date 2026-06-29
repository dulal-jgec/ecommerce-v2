// src/features/payment/components/CODOption.jsx
import React from 'react';
import { Banknote, Check, Shield, Truck } from 'lucide-react';

const CODOption = ({ onSubmit, loading, amount }) => {
  const handleSubmit = () => {
    onSubmit({ method: 'cod' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Banknote size={30} className="text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Cash on Delivery</h3>
        <p className="text-sm text-gray-500 mt-1">Pay when you receive your order</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Check size={18} className="text-emerald-600 flex-shrink-0" />
          <span className="text-sm text-gray-600">No extra charges</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Shield size={18} className="text-emerald-600 flex-shrink-0" />
          <span className="text-sm text-gray-600">100% secure delivery</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <Truck size={18} className="text-emerald-600 flex-shrink-0" />
          <span className="text-sm text-gray-600">Pay after inspection</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </>
        ) : (
          <>
            <Banknote size={18} />
            Place Order with COD
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Total amount: <span className="font-semibold text-gray-600">₹{amount?.toLocaleString()}</span>
      </p>
    </div>
  );
};

export default CODOption;