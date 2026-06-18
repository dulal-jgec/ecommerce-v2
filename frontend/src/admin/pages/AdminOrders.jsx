// AdminOrders.jsx
import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/orderService";
import { useNavigate } from "react-router-dom";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    setUpdatingStatus(orderId);
    try {
      await updateOrderStatus(orderId, status);
      await fetchOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingStatus(null);
    }
  };

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

  const getStatusBadgeColor = (status) => {
    const colors = {
      PLACED: "border-amber-200 bg-amber-50 text-amber-700",
      PAID: "border-blue-200 bg-blue-50 text-blue-700",
      SHIPPED: "border-purple-200 bg-purple-50 text-purple-700",
      DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
      CANCELLED: "border-rose-200 bg-rose-50 text-rose-700",
    };
    return colors[status] || "border-gray-200 bg-gray-50 text-gray-700";
  };

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((order) => order.status === filter);

  const stats = {
    total: orders.length,
    placed: orders.filter((o) => o.status === "PLACED").length,
    paid: orders.filter((o) => o.status === "PAID").length,
    shipped: orders.filter((o) => o.status === "SHIPPED").length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-500">Manage and track all customer orders</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Placed</p>
            <p className="text-2xl font-bold text-amber-600">{stats.placed}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Paid</p>
            <p className="text-2xl font-bold text-blue-600">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Shipped</p>
            <p className="text-2xl font-bold text-purple-600">
              {stats.shipped}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-emerald-600">
              {stats.delivered}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["ALL", "PLACED", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-5 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  filter === status
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {status === "ALL" ? "All Orders" : status}
                {status !== "ALL" && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      filter === status ? "bg-white/20" : "bg-gray-100"
                    }`}
                  >
                    {stats[status.toLowerCase()]}
                  </span>
                )}
              </button>
            ),
          )}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500">
              No orders match the selected filter.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="font-mono font-bold text-xl tracking-tight text-gray-900">
                          #{String(order.orderId).slice(0, 12)}
                        </h2>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>
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
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{Number(order.totalPrice).toLocaleString("en-IN")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.items?.length || 0} items
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Customer</p>
                      <p className="font-medium text-gray-900">
                        {order.shippingFullName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shippingPhoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Shipping Address
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.shippingAddressLine1}, {order.shippingCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex-1 min-w-[200px]">
                      <label className="text-sm text-gray-500 mb-1 block">
                        Update Status
                      </label>
                      <select
                        value={order.status}
                        disabled={
                          order.status === "DELIVERED" ||
                          order.status === "CANCELLED" ||
                          updatingStatus === order.orderId
                        }
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                        className={`w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all ${
                          order.status === "DELIVERED" ||
                          order.status === "CANCELLED"
                            ? "bg-gray-50 cursor-not-allowed text-gray-400"
                            : "bg-white hover:border-gray-300"
                        }`}
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="PAID">PAID</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() =>
                          navigate(`/admin/orders/${order.orderId}`)
                        }
                        className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
