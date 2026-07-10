// src/features/seller/pages/OrderDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  Check,
  Clock,
  X,
  MapPin,
  Phone,
  User,
  Mail,
  Calendar,
  CreditCard,
  ShoppingBag,
  Download,
  Printer,
  CheckCircle,
  XCircle,
  PackageCheck,
  Ban,
  RefreshCw,
  Send,
  AlertCircle,
  Wallet,
  Home,
  Building,
  Hash,
  Info,
  FileText,
  ClipboardCheck,
  ChevronRight,
  Star,
  Eye,
  ExternalLink,
} from "lucide-react";
import {
  getSellerOrderDetails,
  updateSellerOrderStatus,
} from "../services/orderService";
import ConfirmModal from "../../admin/components/ConfirmModal";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  //  Status Config
  const statusConfig = {
    PLACED: {
      icon: Clock,
      color: "bg-gray-100 text-gray-700",
      borderColor: "border-gray-300",
      dotColor: "bg-gray-400",
      bgColor: "bg-gray-50",
      progress: 25,
      label: "Order Placed",
    },
    PAID: {
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-700",
      borderColor: "border-emerald-300",
      dotColor: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      progress: 50,
      label: "Payment Confirmed",
    },
    SHIPPED: {
      icon: Truck,
      color: "bg-blue-100 text-blue-700",
      borderColor: "border-blue-300",
      dotColor: "bg-blue-500",
      bgColor: "bg-blue-50",
      progress: 75,
      label: "Order Shipped",
    },
    DELIVERED: {
      icon: PackageCheck,
      color: "bg-emerald-100 text-emerald-700",
      borderColor: "border-emerald-400",
      dotColor: "bg-emerald-600",
      bgColor: "bg-emerald-50",
      progress: 100,
      label: "Delivered",
    },
    CANCELLED: {
      icon: X,
      color: "bg-red-100 text-red-700",
      borderColor: "border-red-300",
      dotColor: "bg-red-500",
      bgColor: "bg-red-50",
      progress: 0,
      label: "Cancelled",
    },
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    setLoading(true);
    try {
      const data = await getSellerOrderDetails(id);
      
      setOrder(data);
    } catch (err) {
      setError(err.message);
      console.error("Error loading order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!order || !newStatus) return;
    setUpdating(true);
    try {
      await updateSellerOrderStatus(
        order.orderItemId || order.orderId,
        newStatus,
      );
      setShowStatusModal(false);
      await loadOrder();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status] || statusConfig["PLACED"];
    const Icon = config.icon;
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${config.color} shadow-sm`}
      >
        <Icon size={16} />
        {config.label}
      </div>
    );
  };

  const getStatusSteps = () => {
    const steps = ["PLACED", "PAID", "SHIPPED", "DELIVERED"];
    const currentIndex = steps.indexOf(order?.status);

    return steps.map((step, index) => {
      const config = statusConfig[step];
      const Icon = config.icon;
      const isCompleted = index <= currentIndex;
      const isCurrent = index === currentIndex;
      const isCancelled = order?.status === "CANCELLED";

      return {
        ...config,
        Icon,
        isCompleted,
        isCurrent,
        isCancelled,
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-indigo-200 border-t-transparent rounded-full animate-pulse"></div>
          </div>
          <p className="mt-4 text-slate-500 font-medium">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={40} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Order Not Found
            </h2>
            <p className="text-slate-500 mt-2">
              {error || "The order you are looking for does not exist."}
            </p>
            <Link
              to="/seller/orders"
              className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-200 transition shadow-md"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const currentStatus = order.status;

  const canUpdate = !["DELIVERED", "CANCELLED"].includes(currentStatus);
  const statusSteps = getStatusSteps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/seller/orders"
              className="p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Package size={24} className="text-indigo-600" />
                Order #{order.orderId}
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                <Calendar size={14} className="text-gray-400" />
                {new Date(order.createdAt || Date.now()).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm">
              <Printer size={16} />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm">
              <Download size={16} />
              Invoice
            </button>
            {canUpdate && (
              <button
                onClick={() => {
                  setNewStatus(currentStatus);
                  setShowStatusModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-indigo-200 transition shadow-md"
              >
                <RefreshCw size={16} />
                Update Status
              </button>
            )}
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-6 shadow-xl shadow-indigo-200/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider">
                Order ID
              </p>
              <p className="text-lg font-bold mt-1">#{order.orderId}</p>
            </div>
            <div>
              <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider">
                Status
              </p>
              <div className="mt-1">{getStatusBadge(currentStatus)}</div>
            </div>
            <div>
              <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider">
                Total Amount
              </p>
              <p className="text-2xl font-bold mt-1">
                ₹{Number(order.price * order.quantity || 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider">
                Payment
              </p>
              <p className="text-lg font-bold mt-1 flex items-center gap-2">
                <Wallet size={18} className="text-emerald-300" />
                {currentStatus === "CANCELLED" ? "Refunded" : "Paid"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Clock size={18} className="text-indigo-600" />
                Order Progress
              </h3>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gray-200"></div>

                <div className="space-y-6">
                  {statusSteps.map((step, index) => {
                    const Icon = step.Icon;
                    const isActive = step.isCompleted || step.isCurrent;

                    return (
                      <div key={index} className="relative flex gap-4">
                        <div
                          className={`
                          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10
                          ${
                            step.isCompleted
                              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                              : step.isCurrent
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                                : "bg-gray-200 text-gray-400"
                          }
                          ${step.isCurrent ? "ring-4 ring-indigo-100" : ""}
                        `}
                        >
                          {step.isCompleted ? (
                            <Check size={18} />
                          ) : (
                            <Icon size={18} />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center gap-2">
                            <p
                              className={`font-medium ${isActive ? "text-gray-800" : "text-gray-400"}`}
                            >
                              {step.label}
                            </p>
                            {step.isCurrent && (
                              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                                Current
                              </span>
                            )}
                            {step.isCompleted && !step.isCurrent && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                                ✓ Done
                              </span>
                            )}
                          </div>
                          {step.isCurrent && (
                            <p className="text-sm text-gray-500 mt-0.5">
                              {step.label === "Order Placed" &&
                                "Your order has been confirmed"}
                              {step.label === "Payment Confirmed" &&
                                "Payment has been successfully processed"}
                              {step.label === "Order Shipped" &&
                                "Your order is on the way"}
                              {step.label === "Delivered" &&
                                "Order has been delivered to customer"}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag size={18} className="text-indigo-600" />
                Product Details
              </h3>

              <div className="flex items-start gap-5 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-gray-100">
                <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md bg-white border-2 border-white flex-shrink-0">
                  {order.imageUrl ? (
                    <img
                      src={order.imageUrl}
                      alt={order.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={32} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg">
                    {order.productName}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-semibold text-gray-800">
                        ₹{Number(order.price || 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-semibold text-gray-800">
                        {order.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Color</p>
                      <p className="font-semibold text-gray-800 flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{
                            backgroundColor:
                              order.color?.toLowerCase() || "#ccc",
                          }}
                        />
                        {order.color || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Subtotal</p>
                      <p className="font-bold text-indigo-600">
                        ₹
                        {Number(
                          order.price * order.quantity || 0,
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={18} className="text-indigo-600" />
                Customer Details
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-semibold text-sm flex-shrink-0">
                    {order.customerName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {order.customerName || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone size={14} className="text-gray-400" />
                      {order.customerPhone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-indigo-600" />
                Shipping Address
              </h3>

              <div className="space-y-2 text-sm">
                <p className="font-medium text-gray-800">
                  {order.customerName || "N/A"}
                </p>
                <p className="text-gray-600">{order.address || "N/A"}</p>
                <p className="text-gray-500 flex items-center gap-1">
                  <Phone size={14} className="text-gray-400" />
                  {order.customerPhone || "N/A"}
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-indigo-600" />
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    ₹
                    {Number(order.price * order.quantity || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium text-gray-800">₹0</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span className="text-gray-800">Total</span>
                  <span className="text-indigo-600">
                    ₹
                    {Number(order.price * order.quantity || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      <ConfirmModal
        isOpen={showStatusModal}
        onClose={() => {
          setShowStatusModal(false);
          setNewStatus("");
        }}
        onConfirm={handleStatusUpdate}
        title="Update Order Status"
        message={
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md bg-white border-2 border-white flex-shrink-0">
                  {order?.imageUrl ? (
                    <img
                      src={order.imageUrl}
                      alt={order.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package size={24} className="text-gray-300 m-3" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-800">#{order?.orderId}</p>
                  <p className="text-sm text-gray-600 font-medium">
                    {order?.productName}
                  </p>
                  <p className="text-xs text-gray-400">
                    Qty: {order?.quantity} • ₹{order?.price}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-500">Current Status</span>
              {order && getStatusBadge(currentStatus)}
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
    </div>
  );
};

export default OrderDetailsPage;
