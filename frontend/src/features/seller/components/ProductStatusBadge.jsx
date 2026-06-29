// src/features/seller/components/ProductStatusBadge.jsx
import React from 'react';

const ProductStatusBadge = ({ status }) => {
  const config = {
    'Active': { icon: '🟢', color: 'bg-emerald-100 text-emerald-700' },
    'Low Stock': { icon: '🟡', color: 'bg-yellow-100 text-yellow-700' },
    'Out of Stock': { icon: '🔴', color: 'bg-red-100 text-red-700' },
    'Draft': { icon: '⚪', color: 'bg-gray-100 text-gray-700' },
    'Inactive': { icon: '⚫', color: 'bg-gray-200 text-gray-600' },
  };

  const { icon, color } = config[status] || config['Draft'];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}>
      <span>{icon}</span>
      {status}
    </span>
  );
};

export default ProductStatusBadge;