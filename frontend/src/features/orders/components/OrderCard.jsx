import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowUpRight,
  Check,
  CreditCard,
  Truck,
  Package,
} from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderCard = ({ order }) => {
  const totalItems =
    order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  // Overall Order Status (Backend calculated)
  const currentStatus = order.status;

  const statusSteps = ["PLACED", "PAID", "SHIPPED", "DELIVERED"];

  const currentStep = statusSteps.indexOf(currentStatus);

  return (
    <Link to={`/orders/${order.orderId}`}>
      <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200/50 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-slate-800 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                #{order.orderId}
              </span>

              <OrderStatusBadge status={currentStatus} />
            </div>

            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
              <Calendar size={14} />
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Items
              </p>
              <p className="font-semibold text-slate-700">{totalItems}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider">
                Total
              </p>
              <p className="font-bold text-indigo-600 text-lg">
                ₹{order.totalPrice?.toLocaleString()}
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 flex items-center justify-center group-hover:from-indigo-500 group-hover:to-indigo-600 transition-all duration-300 shadow-sm group-hover:shadow-lg">
              <ArrowUpRight
                size={18}
                className="text-indigo-500 group-hover:text-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          {currentStatus === "CANCELLED" ? (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-center">
              <span className="text-red-600 font-semibold">
                Order Cancelled
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => {
                let Icon = Package;

                if (step === "PAID") Icon = CreditCard;
                if (step === "SHIPPED") Icon = Truck;
                if (step === "DELIVERED") Icon = Check;

                const active = index <= currentStep;

                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center ${
                          active
                            ? "bg-emerald-500 text-white"
                            : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        <Icon size={16} />
                      </div>

                      <span
                        className={`text-[11px] mt-2 font-medium ${
                          active
                            ? "text-emerald-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step}
                      </span>
                    </div>

                    {index !== statusSteps.length - 1 && (
                      <div
                        className={`flex-1 h-1 rounded ${
                          index < currentStep
                            ? "bg-emerald-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Images */}
        {order.items?.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100/50">
            {order.items.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {order.items.length > 5 && (
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-medium">
                +{order.items.length - 5}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default OrderCard;