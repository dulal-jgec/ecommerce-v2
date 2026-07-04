// src/features/orders/pages/OrderHistoryPage.jsx
import React, { useState } from 'react';
import { Package, ShoppingBag, Search, Filter, Sparkles, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import OrderCard from '../components/OrderCard';

const OrderHistoryPage = () => {
  const { orders, loading, page, totalPages, setPage } = useOrders();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Orders', icon: ShoppingBag },
    { id: 'DELIVERED', label: 'Delivered', icon: CheckCircle },
    { id: 'PROCESSING', label: 'Processing', icon: Clock },
    { id: 'CANCELLED', label: 'Cancelled', icon: XCircle },
  ];

  const filteredOrders = activeFilter === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-indigo-200 border-t-transparent rounded-full animate-pulse"></div>
          </div>
          <p className="mt-4 text-slate-500 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <ShoppingBag size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  My Orders
                  <Sparkles size={18} className="text-yellow-300" />
                </h1>
                <p className="text-indigo-100 text-sm">Track and manage all your orders</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <TrendingUp size={16} className="text-emerald-300" />
              <span className="text-sm font-medium">{orders.length} Total Orders</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white border border-slate-200/50'}
                `}
              >
                <Icon size={16} />
                {filter.label}
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={48} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700">No Orders Found</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
              {activeFilter === 'all' 
                ? 'Start shopping to see your orders here.' 
                : `No ${activeFilter.toLowerCase()} orders found.`}
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-200 transition shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-5 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl text-sm font-medium hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                let pageNum = i;
                if (totalPages > 5 && page > 2) {
                  pageNum = page - 2 + i;
                }
                if (pageNum >= totalPages) return null;
                return (
                  <button
                    key={i}
                    onClick={() => setPage(pageNum)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-300 ${
                      page === pageNum
                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-200'
                        : 'bg-white/70 backdrop-blur-sm border border-slate-200/50 hover:bg-white'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-5 py-2.5 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl text-sm font-medium hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;