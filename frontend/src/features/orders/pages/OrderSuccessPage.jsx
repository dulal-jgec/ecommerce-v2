// src/features/orders/pages/OrderSuccessPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Check, Package, Truck, Clock, Mail, Download, Printer } from 'lucide-react';
import { getOrderDetails } from '../services/orderService';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
      } catch (error) {
        console.error('Error loading order:', error);
        navigate('/orders');
      } finally {
        setLoading(false);
      }
    };
    if (id) loadOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">Order Placed Successfully! 🎉</h1>
          <p className="text-gray-500 mt-2">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>

          {/* Order Number */}
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="text-xl font-bold text-gray-800">#{order?.id || id}</p>
          </div>

          {/* Order Summary */}
          {order && (
            <div className="mt-6 text-left">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-bold text-emerald-600">₹{order.total?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Payment Method</span>
                <span className="text-gray-800 capitalize">{order.paymentMethod || 'Card'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Status</span>
                <span className="text-emerald-600 font-medium capitalize">{order.status || 'Confirmed'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">Delivery</span>
                <span className="text-gray-800">3-5 business days</span>
              </div>
            </div>
          )}

          {/* Delivery Info */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Package size={20} className="mx-auto text-emerald-600" />
              <p className="text-xs text-gray-600 mt-1">Confirmed</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Truck size={20} className="mx-auto text-emerald-600" />
              <p className="text-xs text-gray-600 mt-1">Processing</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Clock size={20} className="mx-auto text-emerald-600" />
              <p className="text-xs text-gray-600 mt-1">Delivered</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={`/orders/${order?.id || id}`}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
            >
              View Order
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
            <button className="p-3 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition">
              <Printer size={18} />
            </button>
          </div>

          {/* Email Confirmation */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-600 flex items-center justify-center gap-2">
            <Mail size={16} />
            <span>Confirmation email sent to your registered email</span>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Need help? <Link to="/contact" className="text-emerald-600 font-medium hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;