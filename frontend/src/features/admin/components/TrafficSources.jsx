import React from 'react';
import { Globe, MousePointer, Users, Share2, TrendingUp } from 'lucide-react';

const TrafficSources = () => {
  const sources = [
    { name: 'Organic', icon: Globe, percentage: 45, color: 'from-blue-500 to-blue-600' },
    { name: 'Direct', icon: MousePointer, percentage: 25, color: 'from-emerald-500 to-emerald-600' },
    { name: 'Social', icon: Users, percentage: 20, color: 'from-purple-500 to-purple-600' },
    { name: 'Referral', icon: Share2, percentage: 10, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800">Traffic Sources</h3>
        <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <TrendingUp size={12} />
          +12%
        </span>
      </div>
      
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${source.color} text-white`}>
                  <source.icon size={14} />
                </div>
                <span className="text-sm font-medium text-gray-700">{source.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{source.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${source.color} rounded-full transition-all duration-500`}
                style={{ width: `${source.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Total Traffic</span>
          <span className="font-semibold text-gray-800">12,847</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficSources;