// src/features/seller/components/OrderTable.jsx
import React, { useState } from "react";
import {
  Eye,
  Truck,
  Check,
  Clock,
  X,
  MapPin,
  Phone,
  Package,
  ChevronDown,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  MoreHorizontal,
  Zap,
  PackageCheck,
  Ban,
  Send,
  Calendar,
  User,
  Hash,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../admin/components/ConfirmModal";

const OrderTable = ({ orders = [], onStatusUpdate, onViewDetails }) => {
  const navigate = useNavigate();
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  //  Backend OrderStatus enum mapping
  const statusConfig = {
    PLACED: {
      icon: Clock,
      color: "bg-gray-100 text-gray-700",
      label: "Placed",
      borderColor: "border-gray-300",
      dotColor: "bg-gray-400",
    },
    PAID: {
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-700",
      label: "Paid",
      borderColor: "border-emerald-300",
      dotColor: "bg-emerald-500",
    },
    SHIPPED: {
      icon: Truck,
      color: "bg-blue-100 text-blue-700",
      label: "Shipped",
      borderColor: "border-blue-300",
      dotColor: "bg-blue-500",
    },
    DELIVERED: {
      icon: PackageCheck,
      color: "bg-emerald-100 text-emerald-700",
      label: "Delivered",
      borderColor: "border-emerald-400",
      dotColor: "bg-emerald-600",
    },
    CANCELLED: {
      icon: X,
      color: "bg-red-100 text-red-700",
      label: "Cancelled",
      borderColor: "border-red-300",
      dotColor: "bg-red-500",
    },
  };

  //  Status flow
  const statusFlow = {
    PLACED: ["PAID", "CANCELLED"],
    PAID: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED", "CANCELLED"],
    DELIVERED: [],
    CANCELLED: [],
  };

  const canUpdateStatus = (status) => {
    return !["DELIVERED", "CANCELLED"].includes(status);
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig["PLACED"];
    const Icon = config.icon;
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${config.color} shadow-sm`}
      >
        <Icon size={13} />
        {config.label}
      </div>
    );
  };

  const getNextStatuses = (status) => {
    return statusFlow[status] || [];
  };

  const getStatusProgress = (status) => {
    const order = ["PLACED", "PAID", "SHIPPED", "DELIVERED"];
    const index = order.indexOf(status);
    return index >= 0 ? ((index + 1) / order.length) * 100 : 0;
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  const handleQuickStatusUpdate = async (order, status) => {
    try {
      if (onStatusUpdate) {
        await onStatusUpdate(order.orderItemId, status);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;

    setUpdating(true);
    try {
      if (onStatusUpdate) {
        await onStatusUpdate(
          selectedOrder.orderItemId || selectedOrder.orderId,
          newStatus,
        );
      }
      setShowStatusModal(false);
      setSelectedOrder(null);
      setNewStatus("");
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Handle Eye Click - Navigate to Order Details
  const handleViewDetails = (order) => {
    if (onViewDetails) {
      onViewDetails(order);
    } else {
      // Default navigation to seller order details
      navigate(`/seller/orders/${order.orderItemId}`);
    }
  };

  return (
    <>
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-gray-200/50">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Hash size={14} />
                    Order ID
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    Customer
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={14} />
                    Product
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Package size={14} />
                    Details
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} />
                    Total
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    Status
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/50">
              {orders.map((order) => {
                const currentStatus = order.status;

                const nextStatuses = getNextStatuses(currentStatus);

                const progress = getStatusProgress(currentStatus);

                const isDelivered = currentStatus === "DELIVERED";

                const isCancelled = currentStatus === "CANCELLED";

                return (
                  <tr
                    key={order.orderItemId || order.orderId}
                    className="hover:bg-white/50 transition group"
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold text-sm text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                        #{order.orderId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-semibold text-sm flex-shrink-0">
                          {order.customerName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                            {order.customerName || "N/A"}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Phone size={11} />
                            {order.customerPhone || "N/A"}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={11} />
                            {order.address?.split(",")[0] || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-white">
                          {order.imageUrl ? (
                            <img
                              src={order.imageUrl}
                              alt={order.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package size={22} className="text-gray-300" />
                            </div>
                          )}
                          {order.color && (
                            <div
                              className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{
                                backgroundColor: order.color.toLowerCase(),
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-800 line-clamp-1">
                            {order.productName || "N/A"}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <span
                              className="inline-block w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  order.color?.toLowerCase() || "#ccc",
                              }}
                            />
                            {order.color || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="bg-gray-50/70 rounded-xl px-3 py-2">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Package size={14} className="text-gray-400" />
                          Qty:{" "}
                          <span className="font-semibold text-gray-800">
                            {order.quantity || 0}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          ₹{Number(order.price || 0).toLocaleString()} each
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-800 text-lg">
                        ₹
                        {Number(
                          order.price * order.quantity || 0,
                        ).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2.5 min-w-[130px]">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${statusConfig[currentStatus]?.dotColor || "bg-gray-400"} animate-pulse`}
                          />
                          {getStatusBadge(currentStatus)}
                        </div>
                        {!isCancelled && (
                          <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                isDelivered
                                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600"
                                  : "bg-gradient-to-r from-indigo-400 to-indigo-600"
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                        {isCancelled && (
                          <div className="relative w-full h-1.5 bg-red-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full w-full" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/*  Eye Button - Navigate to Order Details */}
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="p-2 hover:bg-indigo-50 rounded-xl transition-all text-gray-400 hover:text-indigo-600 group-hover:scale-110"
                          title="View Order Details"
                        >
                          <Eye size={18} />
                        </button>

                        {canUpdateStatus(currentStatus) &&
                          nextStatuses.length > 0 && (
                            <div className="relative">
                              <button
                                onClick={() =>
                                  toggleDropdown(
                                    order.orderItemId || order.orderId,
                                  )
                                }
                                className={`p-2 rounded-xl transition-all group-hover:scale-110 ${
                                  openDropdown ===
                                  (order.orderItemId || order.orderId)
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"
                                }`}
                                title="Update Status"
                              >
                                <RefreshCw
                                  size={18}
                                  className={
                                    openDropdown ===
                                    (order.orderItemId || order.orderId)
                                      ? "rotate-180 transition-transform duration-300"
                                      : ""
                                  }
                                />
                              </button>

                              {openDropdown ===
                                (order.orderItemId || order.orderId) && (
                                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100/50 py-2 z-50 animate-slideDown">
                                  <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                      <RefreshCw size={12} />
                                      Update Status
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800">
                                      #{order.orderId}
                                    </p>
                                  </div>
                                  {nextStatuses.map((status) => {
                                    const config = statusConfig[status];
                                    const Icon = config.icon;
                                    return (
                                      <button
                                        key={status}
                                        onClick={() =>
                                          handleQuickStatusUpdate(order, status)
                                        }
                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 transition-all text-left group/item"
                                      >
                                        <div
                                          className={`p-1.5 rounded-lg ${config.color}`}
                                        >
                                          <Icon size={14} />
                                        </div>
                                        <span className="font-medium text-gray-700">
                                          Mark as {config.label}
                                        </span>
                                        <ChevronDown
                                          size={14}
                                          className="ml-auto text-gray-300 opacity-0 group-hover/item:opacity-100 transition"
                                        />
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}

                        {isDelivered && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold shadow-sm shadow-emerald-100">
                            <PackageCheck size={14} />
                            Complete
                          </span>
                        )}

                        {isCancelled && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold shadow-sm shadow-red-100">
                            <Ban size={14} />
                            Cancelled
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
                        <Package size={48} className="text-gray-300" />
                      </div>
                      <div>
                        <p className="text-gray-500 font-bold text-xl">
                          No orders found
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Orders will appear here once you receive them
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {orders.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100/50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white/50">
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Package size={14} className="text-gray-400" />
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {orders.length}
              </span>{" "}
              order{orders.length > 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-white transition shadow-sm disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-200">
                1
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-white transition shadow-sm">
                2
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-white transition shadow-sm">
                3
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm hover:bg-white transition shadow-sm">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      <ConfirmModal
        isOpen={showStatusModal}
        onClose={() => {
          setShowStatusModal(false);
          setSelectedOrder(null);
          setNewStatus("");
        }}
        onConfirm={handleStatusUpdate}
        title="Update Order Status"
        message={
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md bg-white border-2 border-white flex-shrink-0">
                  {selectedOrder?.imageUrl ? (
                    <img
                      src={selectedOrder.imageUrl}
                      alt={selectedOrder.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={28} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">
                    #{selectedOrder?.orderId}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    {selectedOrder?.productName}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span>Qty: {selectedOrder?.quantity}</span>
                    <span>•</span>
                    <span>₹{selectedOrder?.price}</span>
                    <span>•</span>
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          selectedOrder?.color?.toLowerCase() || "#ccc",
                      }}
                    />
                    <span>{selectedOrder?.color}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-500">Current Status</span>
              {selectedOrder && getStatusBadge(selectedOrder.status)}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Select New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm font-medium"
              >
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
        confirmText={updating ? "Updating..." : "Update Status"}
        type="info"
      />
    </>
  );
};

export default OrderTable;
