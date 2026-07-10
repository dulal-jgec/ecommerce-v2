// src/features/orders/pages/OrderSuccessPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Check,
  Package,
  Truck,
  Clock,
  Mail,
  Download,
  Printer,
  ShoppingBag,
  Home,
  Heart,
  ArrowRight,
  Sparkles,
  Shield,
  CreditCard,
  Gift,
} from "lucide-react";
import { getOrderDetails } from "../services/orderService";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
      } catch (error) {
        console.error("Error loading order:", error);
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };
    if (id) loadOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-emerald-200 border-t-transparent rounded-full animate-pulse"></div>
          </div>
          <p className="mt-4 text-slate-500 font-medium">
            Confirming your order...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50/80 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-300/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-100/10 rounded-full blur-3xl"></div>

          {/* Success Icon */}
          <div className="relative z-10">
            <div className="w-28 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-200">
              <Check size={52} className="text-white" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-emerald-200/20 rounded-full blur-2xl"></div>
          </div>

          <h1 className="text-3xl font-bold text-slate-800 relative z-10 flex items-center justify-center gap-2">
            Order Successfully Placed!
            <Sparkles size={24} className="text-emerald-500" />
          </h1>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto relative z-10">
            Your order has been confirmed. You can track your order status
            anytime from My Orders.
          </p>

          {/* Order Number */}
          <div className="relative z-10 mt-6 p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100/50">
            <p className="text-sm text-slate-400">Order Number</p>
            <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              #{order?.orderId || id}
            </p>
          </div>

          {/* Order Summary */}
          {order && (
            <div className="relative z-10 mt-6 text-left bg-gradient-to-r from-slate-50 to-white rounded-2xl p-4 border border-slate-100/50">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Total Amount</span>
                <span className="font-bold text-emerald-600 text-lg">
                  ₹{order.totalPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500 text-sm">Payment</span>
                <span className="text-slate-700 capitalize text-sm flex items-center gap-1">
                  <CreditCard size={14} className="text-indigo-500" />
                  {order.paymentMethod || "Card"}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500 text-sm">Current Status</span>

                <span className="text-slate-700 text-sm">
                  {order.items?.[0]?.status || order.status}
                </span>
              </div>
            </div>
          )}

          {/* Delivery Steps */}
          <div className="relative z-10 mt-6">
            <div className="flex items-center justify-between">
              {["PLACED", "PAID", "SHIPPED", "DELIVERED"].map((step, index) => {
                const current = [
                  "PLACED",
                  "PAID",
                  "SHIPPED",
                  "DELIVERED",
                ].indexOf(order.items?.[0]?.status || order.status);

                const active = index <= current;

                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center

                        ${
                          active
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <p className="text-xs mt-2">{step}</p>
                    </div>

                    {index !== 3 && (
                      <div
                        className={`flex-1 h-1 rounded

                        ${index < current ? "bg-emerald-500" : "bg-gray-200"}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to={`/orders/${order?.orderId || id}`}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-indigo-200 transition shadow-lg"
            >
              View Order
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl font-medium text-slate-700 hover:bg-white hover:shadow-lg transition"
            >
              <Home size={18} />
              Continue Shopping
            </Link>
          </div>

          {/* Email & Trust */}
          <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-slate-400">
              <Mail size={16} />
             Order Confirmed
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-2 text-slate-400">
              <Shield size={16} className="text-emerald-500" />
              Secure checkout
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-2 text-slate-400">
              <Gift size={16} className="text-amber-500" />
              Happy shopping!
            </span>
          </div>
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
            <Heart size={14} className="text-emerald-400" />
            Need help?{" "}
            <Link
              to="/contact"
              className="text-indigo-600 font-medium hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
