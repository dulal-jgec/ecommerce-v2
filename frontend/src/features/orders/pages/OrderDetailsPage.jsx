// src/features/orders/pages/OrderDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Package,
  Truck,
  Check,
  Clock,
  X,
  Download,
  Printer,
  ChevronRight,
  MapPin,
  CreditCard,
  Calendar,
  User,
  Phone,
  Mail,
  Shield,
  Wallet,
  Sparkles,
} from "lucide-react";
import { getOrderDetails, cancelOrder } from "../services/orderService";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderTimeline from "../components/OrderTimeline";
import ShippingDetails from "../components/ShippingDetails";
import ConfirmModal from "../../admin/components/ConfirmModal";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

 

  useEffect(() => {
    loadOrder();

    const interval = setInterval(() => {
      loadOrder();
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  const loadOrder = async () => {
    setLoading(true);
    try {
      const data = await getOrderDetails(id);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(id);
      setShowCancelModal(false);
      loadOrder();
    } catch (err) {
      setError(err.message);
    }
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
              to="/orders"
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

  const canCancel = currentStatus === "PLACED" || currentStatus === "PAID";

  const statusColors = {
    PLACED: "from-gray-500 to-gray-600",
    PAID: "from-yellow-500 to-yellow-600",
    SHIPPED: "from-blue-500 to-blue-600",
    DELIVERED: "from-emerald-500 to-emerald-600",
    CANCELLED: "from-red-500 to-red-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <Link
                to="/orders"
                className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition backdrop-blur-sm"
              >
                <ArrowLeft size={20} className="text-white" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles size={20} className="text-yellow-300" />
                  Order #{order.orderId}
                </h1>
                <p className="text-indigo-100 text-sm flex items-center gap-1 mt-1">
                  <Calendar size={14} />
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/30 transition border border-white/20">
                <Download size={16} />
                Invoice
              </button>
              {canCancel && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-red-600 transition shadow-lg shadow-red-500/30"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. Status Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${statusColors[currentStatus] || "from-gray-500 to-gray-600"} flex items-center justify-center shadow-lg`}
              >
                {currentStatus === "DELIVERED" && (
                  <Check size={24} className="text-white" />
                )}
                {currentStatus === "SHIPPED" && (
                  <Truck size={24} className="text-white" />
                )}
                {currentStatus === "PLACED" && (
                  <Package size={24} className="text-white" />
                )}
                {currentStatus === "PAID" && (
                  <CreditCard size={24} className="text-white" />
                )}
                {currentStatus === "CANCELLED" && (
                  <X size={24} className="text-white" />
                )}
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Order Status
                </p>
                <div className="flex items-center gap-2">
                  <OrderStatusBadge status={currentStatus} />
                  <span className="text-sm text-slate-400">
                    {currentStatus === "DELIVERED"
                      ? "Completed ✓"
                      : "In Progress"}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Total Amount</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ₹{order.totalPrice?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* 4. Order Items with Status Badge */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-indigo-500" />
                  Order Items
                  <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    {order.items?.length || 0} items
                  </span>
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-5 p-4 bg-slate-50/80 rounded-2xl hover:bg-white transition border border-slate-100/50"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-inner">
                      <img
                        src={item.imageUrl || "/images/placeholder.png"}
                        alt={item.productName}
                        className="w-16 h-16 object-contain rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      {/* Product Name with Status Badge */}
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-800">
                          {item.productName}
                        </p>
                        <OrderStatusBadge status={item.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-slate-500">
                          Qty: {item.quantity}
                        </span>
                        {item.variant && (
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {item.variant}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-indigo-600">
                        ₹{item.price * item.quantity}
                      </p>
                      <p className="text-xs text-slate-400">
                        ₹{item.price} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="px-6 py-4 border-t border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="space-y-2 max-w-xs ml-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-700 font-medium">
                      ₹{order.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Shipping</span>
                    <span className="text-slate-700 font-medium">
                      ₹{order.shippingCost || 0}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Discount</span>
                      <span>-₹{order.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
                    <span>Total</span>
                    <span className="text-indigo-600 text-xl">
                      ₹{order.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-indigo-500" />
                Payment Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    Method
                  </p>
                  <p className="font-medium text-slate-800 mt-1 capitalize flex items-center gap-2">
                    <Wallet size={16} className="text-indigo-500" />
                    {order.paymentMethod || "Card"}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    Status
                  </p>
                  <span
                    className={`font-medium mt-1 inline-block px-3 py-1 rounded-full text-sm ${
                      order.paymentStatus === "PAID"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {order.paymentStatus || "Success"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* 5. Timeline - Fixed */}
            <OrderTimeline
              status={order.status}
              createdAt={order.createdAt}
              updatedAt={order.updatedAt}
            />

            {/* 6. ShippingDetails - Fixed */}
            <ShippingDetails
              address={{
                fullName: order.shippingFullName,
                phoneNumber: order.shippingPhoneNumber,
                street: order.shippingAddressLine1,
                addressLine2: order.shippingAddressLine2,
                city: order.shippingCity,
                state: order.shippingState,
                postalCode: order.shippingPostalCode,
                country: order.shippingCountry,
              }}
              status={order.status}
              createdAt={order.createdAt}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Yes, Cancel Order"
        type="danger"
      />
    </div>
  );
};

export default OrderDetailsPage;
