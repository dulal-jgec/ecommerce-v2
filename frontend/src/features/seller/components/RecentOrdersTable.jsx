import React from "react";
import { Eye, Truck, Check, Clock, X } from "lucide-react";

const RecentOrdersTable = ({ orders = [] }) => {
  const statusConfig = {
    DELIVERED: {
      icon: Check,
      color: "bg-emerald-100 text-emerald-700",
    },
    SHIPPED: {
      icon: Truck,
      color: "bg-blue-100 text-blue-700",
    },
    PROCESSING: {
      icon: Clock,
      color: "bg-yellow-100 text-yellow-700",
    },
    PAID: {
      icon: Clock,
      color: "bg-orange-100 text-orange-700",
    },
    CANCELLED: {
      icon: X,
      color: "bg-red-100 text-red-700",
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">Recent Orders</h3>
          <p className="text-sm text-gray-400">Latest customer orders</p>
        </div>

        <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
          View All →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Product</th>
              <th className="pb-3">Qty</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500">
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const StatusIcon = statusConfig[currentStatus]?.icon || Clock;

                const statusColor =
                  statusConfig[currentStatus]?.color ||
                  "bg-gray-100 text-gray-700";

                return (
                  <tr
                    key={order.orderItemId}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-semibold text-emerald-600">
                      #{order.orderId}
                    </td>

                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.customerName}
                        </p>

                        <p className="text-xs text-gray-500">
                          {order.customerPhone}
                        </p>
                      </div>
                    </td>

                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.imageUrl}
                          alt={order.productName}
                          className="w-12 h-12 rounded-lg object-cover border"
                        />

                        <div>
                          <p className="font-medium text-gray-800">
                            {order.productName}
                          </p>

                          <p className="text-xs text-gray-500">{order.color}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">{order.quantity}</td>

                    <td className="py-4 font-semibold">
                      ₹{(order.price * order.quantity).toLocaleString()}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                      >
                        <StatusIcon size={12} />
                        <OrderStatusBadge status={currentStatus} />
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <button className="p-2 rounded-lg hover:bg-gray-100">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
