// src/features/orders/components/OrderTimeline.jsx

import React from "react";
import {
  Check,
  Package,
  Truck,
  X,
  CreditCard,
  Calendar,
} from "lucide-react";

const OrderTimeline = ({ status, updatedAt }) => {
  const steps = [
    {
      id: "PLACED",
      label: "Order Placed",
      icon: Package,
      description: "Your order has been placed successfully",
    },
    {
      id: "PAID",
      label: "Payment Received",
      icon: CreditCard,
      description: "Payment completed successfully",
    },
    {
      id: "SHIPPED",
      label: "Shipped",
      icon: Truck,
      description: "Seller has shipped your order",
    },
    {
      id: "DELIVERED",
      label: "Delivered",
      icon: Check,
      description: "Order delivered successfully",
    },
  ];

  if (status === "CANCELLED") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-5">
          Order Timeline
        </h3>

        <div className="flex flex-col items-center py-10">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <X className="text-red-500" size={30} />
          </div>

          <h4 className="mt-4 text-lg font-semibold text-red-600">
            Order Cancelled
          </h4>

          <p className="text-sm text-gray-500 mt-2">
            This order has been cancelled.
          </p>

          {updatedAt && (
            <p className="mt-4 flex items-center gap-1 text-xs text-gray-400">
              <Calendar size={12} />
              {new Date(updatedAt).toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>
    );
  }

  const currentIndex = steps.findIndex((s) => s.id === status);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-800 mb-6">
        Order Timeline
      </h3>

      <div className="relative">

        {/* Vertical Line */}

        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200"></div>

        <div className="space-y-8">

          {steps.map((step, index) => {

            const completed = index < currentIndex;
            const current = index === currentIndex;

            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative flex gap-4"
              >

                {/* Circle */}

                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    z-10
                    transition-all

                    ${
                      completed
                        ? "bg-emerald-500 text-white"
                        : current
                        ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                        : "bg-gray-200 text-gray-400"
                    }
                  `}
                >
                  {completed ? (
                    <Check size={18} />
                  ) : (
                    <Icon size={18} />
                  )}
                </div>

                {/* Text */}

                <div className="flex-1 pt-1">

                  <div className="flex items-center gap-2">

                    <h4
                      className={`font-medium ${
                        completed || current
                          ? "text-gray-800"
                          : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </h4>

                    {current && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">
                        Current
                      </span>
                    )}

                  </div>

                  <p
                    className={`text-sm mt-1 ${
                      completed || current
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>

                  {current && updatedAt && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} />
                      Updated on{" "}
                      {new Date(updatedAt).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}

                </div>

              </div>
            );

          })}

        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;