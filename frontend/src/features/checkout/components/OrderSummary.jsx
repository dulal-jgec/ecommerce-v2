// src/features/checkout/components/OrderSummary.jsx
import React from "react";
import { Package, Truck, Tag } from "lucide-react";

const OrderSummary = ({ cart, shippingCost = 0, discount = 0 }) => {
  const subtotal = cart.subtotal || 0;
  const total = subtotal + shippingCost - discount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {cart.items?.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3">
            <img
              src={item.imageUrl || "/images/placeholder.png"}
              alt={item.productName}
              className="w-12 h-12 rounded-lg object-cover bg-gray-100"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">{}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span>₹{Number(cart.totalPrice).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span
            className={
              shippingCost === 0 ? "text-emerald-600" : "text-gray-800"
            }
          >
            {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-600">
            <span className="flex items-center gap-1">
              <Tag size={14} />
              Discount
            </span>
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span>₹{Number(cart.totalPrice).toLocaleString()}</span>
        </div>
      </div>

      {/* Secure Badge */}
      <div className="mt-4 p-3 bg-gray-50 rounded-xl text-center text-xs text-gray-500 flex items-center justify-center gap-2">
        <Package size={14} className="text-emerald-600" />
        <span>Secure checkout • 100% encrypted</span>
      </div>
    </div>
  );
};

export default OrderSummary;
