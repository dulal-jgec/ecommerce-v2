// src/features/payment/pages/PaymentSuccess.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Package, Mail, Download, Printer } from 'lucide-react';

const PaymentSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={48} className="text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">Payment Successful! 🎉</h1>
          <p className="text-gray-500 mt-2">
            Your payment has been confirmed. Order #{orderId} is being processed.
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
            <p className="text-sm text-gray-500">Order Status</p>
            <p className="text-xl font-bold text-emerald-600">Confirmed ✓</p>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to={`/orders/${orderId}`}
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
          </div>

          <div className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
            <Mail size={16} />
            <span>Confirmation email sent to your registered email</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;