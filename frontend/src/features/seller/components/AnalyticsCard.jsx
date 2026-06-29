// src/features/seller/components/AnalyticsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AnalyticsCard = ({ title, value, change, type, icon: Icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
          <Icon size={20} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 ${
          type === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {type === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
};

export default AnalyticsCard;