// OrderCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      PLACED: "bg-amber-50 text-amber-700 border-amber-200",
      PAID: "bg-blue-50 text-blue-700 border-blue-200",
      SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
      DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
      CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  // Convert orderId to string safely
  const orderIdString = String(order.orderId || "");
  const displayOrderId =
    orderIdString.length > 12 ? orderIdString.slice(0, 12) : orderIdString;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h2 className="font-mono font-bold text-xl tracking-tight text-gray-900">
              #{displayOrderId}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
            >
              {order.status}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
          {order.items &&
            order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}

                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600 font-medium">Total Amount</span>
          <span className="text-2xl font-bold text-gray-900">
            ₹{Number(order.totalPrice).toLocaleString("en-IN")}
          </span>
        </div>
        <button
          onClick={() => navigate(`/orders/${order.orderId}`)}
          className="w-full px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          View Order Details
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
