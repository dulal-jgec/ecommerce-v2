// src/features/seller/components/RevenueChart.jsx
import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const RevenueChart = () => {
  const data = [
    { month: 'Jan', revenue: 45 },
    { month: 'Feb', revenue: 52 },
    { month: 'Mar', revenue: 48 },
    { month: 'Apr', revenue: 65 },
    { month: 'May', revenue: 78 },
    { month: 'Jun', revenue: 92 },
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-800">Revenue Overview</h3>
          <p className="text-sm text-gray-400">Monthly revenue</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
          <Calendar size={16} />
          <span>Last 6 Months</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-end gap-3 h-52">
        {data.map((item, index) => {
          const height = (item.revenue / maxRevenue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-emerald-500 rounded-lg transition-all duration-500 hover:bg-emerald-600"
                style={{ height: `${height * 0.85}%`, minHeight: '20px' }}
              />
              <span className="text-xs text-gray-400 mt-2">{item.month}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        <span className="font-semibold text-gray-700">₹4,56,789</span> total revenue
      </div>
    </div>
  );
};

export default RevenueChart;