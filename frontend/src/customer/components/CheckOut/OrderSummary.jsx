// OrderSummary.jsx
import React from "react";
import {
  CheckCircleIcon,
  TruckIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

import { useCart } from "../../../context/CartContext";

const OrderSummary = ({ address, shippingMethod, onNext, onBack }) => {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = subtotal;

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <div className="bg-[linear-gradient(to_bottom,var(--light-bg),#ecfdf5)]">
        <div className="flex items-center gap-3">
          <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
          <div>
            <p className="font-medium text-emerald-800">
              Delivery Address Confirmed
            </p>
            <p className="text-sm text-emerald-600">
              Your order will be shipped to this address
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="flex gap-4 py-4 border-b border-gray-100"
            >
              <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {item.productName}
                </h3>
                <div className="text-sm text-gray-500 mt-1">
                  <span>Qty: {item.quantity}</span>
                  {item.color && (
                    <span className="ml-2">Color: {item.color}</span>
                  )}
                  {item.size && <span className="ml-2">Size: {item.size}</span>}
                </div>
                <p className="text-indigo-600 font-semibold mt-1">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Address Card */}
      {address && (
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TruckIcon className="h-5 w-5 text-indigo-500" />
            Delivery Address
          </h3>
          <div className="space-y-1 text-sm">
            <p className="font-medium text-gray-900">{address.fullName}</p>
            <p className="text-gray-600">{address.addressLine1}</p>
            {address.addressLine2 && (
              <p className="text-gray-600">{address.addressLine2}</p>
            )}
            <p className="text-gray-600">
              {address.city}, {address.state} - {address.pincode}
            </p>
            <p className="text-gray-600">{address.country}</p>
            <p className="text-gray-600">📞 {address.phone}</p>
            <p className="text-gray-600">✉️ {address.email}</p>
          </div>
        </div>
      )}

      {/* Price Summary */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-semibold text-gray-900 mb-3">Price Summary</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="text-gray-900">₹0.00</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-gray-100">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-indigo-600">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
        >
          Back to Address
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-200"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
