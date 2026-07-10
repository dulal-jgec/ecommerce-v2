// src/features/payment/components/PaymentSummary.jsx
import React from 'react';
import { Package, Truck, Tag, Clock } from 'lucide-react';

const PaymentSummary = ({ order }) => {
  if (!order) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {order.items?.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              src={item.imageUrl || item.image || "/images/placeholder.png"}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover bg-gray-100"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-gray-800">₹{order.subtotal?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="text-gray-800">₹{order.shippingCost || 0}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600">
            <span className="flex items-center gap-1">
              <Tag size={14} />
              Discount
            </span>
            <span>-₹{order.discount}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span className="text-xl text-emerald-600">₹{order.total?.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-emerald-50 rounded-xl flex items-center gap-2 text-sm text-emerald-700">
        <Clock size={16} />
        <span>Estimated delivery: 3-5 business days</span>
      </div>
    </div>
  );
};

export default PaymentSummary;