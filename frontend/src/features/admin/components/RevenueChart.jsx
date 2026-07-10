import React, { useState, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { getRevenueData } from "../services/adminService";

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await getRevenueData();
      setData(result);
    } catch (error) {
      console.error("Error loading revenue data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse text-center">Loading...</div>
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-800">Revenue Overview</h3>
          <p className="text-sm text-gray-400">Monthly revenue & orders</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
          <Calendar size={16} />
          <span>Last 6 Months</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No data available</div>
      ) : (
        <>
          <div className="flex items-end gap-2 h-52 mb-4">
            {data.map((item, index) => {
              const height = (item.revenue / maxRevenue) * 100;
              const orderHeight = Math.min((item.orders / 100) * 100, 100);
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-indigo-500 rounded-lg transition-all duration-500 hover:bg-indigo-600"
                      style={{
                        height: `${Math.max(height * 0.7, 5)}%`,
                        minHeight: "20px",
                      }}
                    />
                    <div
                      className="w-full bg-emerald-500 rounded-lg transition-all duration-500 hover:bg-emerald-600"
                      style={{
                        height: `${Math.max(orderHeight * 0.4, 5)}%`,
                        minHeight: "15px",
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 mt-2">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded"></div>
              <span className="text-gray-500">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <span className="text-gray-500">Orders</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueChart;
