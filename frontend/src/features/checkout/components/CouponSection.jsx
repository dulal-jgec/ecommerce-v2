// src/features/checkout/components/CouponSection.jsx
import React, { useState } from 'react';
import { Tag, X, Check } from 'lucide-react';

const CouponSection = ({ onApply, onRemove, discount, coupon }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await onApply(code);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setCode('');
    } catch (err) {
      setError(err.message || 'Invalid coupon code');
    } finally {
      setLoading(false);
    }
  };

  if (coupon) {
    return (
      <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
        <div className="flex items-center gap-2">
          <Tag size={16} className="text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">
            {coupon.code} - ₹{coupon.discount} OFF
          </span>
        </div>
        <button 
          onClick={onRemove}
          className="p-1 hover:bg-emerald-100 rounded-lg transition text-emerald-600"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter coupon code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {loading ? '...' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {success && <p className="text-xs text-emerald-600">✓ Coupon applied successfully!</p>}
    </div>
  );
};

export default CouponSection;