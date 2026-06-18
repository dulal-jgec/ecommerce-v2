// OrderTracker.jsx
import React from "react";

const OrderTracker = ({ order }) => {
  const steps = [
    {
      key: "PLACED",
      label: "Order Placed",
      description: "Your order has been received",
    },
    {
      key: "PAID",
      label: "Payment Confirmed",
      description: "Payment has been verified",
    },
    {
      key: "SHIPPED",
      label: "Shipped",
      description: "Your order is on the way",
    },
    {
      key: "DELIVERED",
      label: "Delivered",
      description: "Order has been delivered",
    },
  ];

  const currentStepIndex = steps.findIndex((step) => step.key === order.status);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Order Progress
      </h3>

      <div className="relative mb-8">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={idx} className="relative">
              <div
                className={`rounded-xl p-4 transition-all ${
                  isCompleted
                    ? "bg-gray-50 border border-gray-200"
                    : "bg-white border border-gray-100 opacity-60"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${
                    isCompleted
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <span className="text-sm font-medium">{idx + 1}</span>
                  )}
                </div>
                <p
                  className={`font-semibold text-sm ${
                    isCompleted ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{step.description}</p>
                {isCurrent && (
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-600">
                      Current Status
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
