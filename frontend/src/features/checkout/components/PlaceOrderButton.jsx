// src/features/checkout/components/PlaceOrderButton.jsx
import React, { useState } from 'react';
import { ShoppingBag, Loader, ShieldCheck } from 'lucide-react';

const PlaceOrderButton = ({ 
  onClick, 
  loading = false, 
  disabled = false,
  total = 0 
}) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold text-base
          flex items-center justify-center gap-2
          transition-all duration-300
          ${disabled || loading 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200'}
        `}
      >
        {loading ? (
          <>
            <Loader size={20} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingBag size={20} />
            Place Order • ₹{total}
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <ShieldCheck size={14} className="text-emerald-600" />
        <span>Your payment is secure and encrypted</span>
      </div>
    </div>
  );
};

export default PlaceOrderButton;