// src/features/payment/pages/PaymentFailed.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { X, AlertCircle, ArrowLeft, RefreshCw, Mail } from 'lucide-react';

const PaymentFailed = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl border border-red-100 p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={48} className="text-red-500" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800">Payment Failed</h1>
          <p className="text-gray-500 mt-2">
            We couldn't process your payment. Please try again.
          </p>

          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-left">
            <div className="flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-700 font-medium">Transaction Failed</p>
                <p className="text-xs text-red-600 mt-1">
                  Your payment could not be completed. You can retry with a different payment method.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to={`/payment/${orderId}`}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Retry Payment
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Go Home
            </Link>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>Need help? <Link to="/contact" className="text-emerald-600 hover:underline">Contact Support</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;