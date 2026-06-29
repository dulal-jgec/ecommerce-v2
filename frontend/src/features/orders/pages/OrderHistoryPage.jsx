// src/features/orders/pages/OrderHistoryPage.jsx
import React from 'react';
import { Package, ShoppingBag } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import OrderCard from '../components/OrderCard';

const OrderHistoryPage = () => {
  const { orders, loading, page, totalPages, setPage } = useOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={28} className="text-emerald-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <p className="text-sm text-gray-500">View all your orders</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No Orders Yet</h3>
            <p className="text-gray-400 text-sm mt-1">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-5 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-5 py-2 text-sm text-gray-500">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-5 py-2 border border-gray-200 rounded-xl text-sm hover:bg-gray-50 transition disabled:opacity-50"
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