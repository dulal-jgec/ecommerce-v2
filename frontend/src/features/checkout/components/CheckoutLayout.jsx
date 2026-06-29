// src/features/checkout/components/CheckoutLayout.jsx
import React from 'react';
import { ChevronLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutLayout = ({ children, step = 1, totalSteps = 3 }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-xl transition">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
              <p className="text-sm text-gray-500">Secure checkout process</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock size={16} className="text-emerald-600" />
            <span>Secure Payment</span>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          {['Cart', 'Checkout', 'Payment'].map((label, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${index + 1 <= step 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-500'}
              `}>
                {index + 1}
              </div>
              <span className={`text-sm font-medium ${index + 1 <= step ? 'text-gray-800' : 'text-gray-400'}`}>
                {label}
              </span>
              {index < 2 && <span className="text-gray-300">→</span>}
            </div>
          ))}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default CheckoutLayout;