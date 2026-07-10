// src/features/orders/components/OrderStatusBadge.jsx

import React from "react";
import {
  Package,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const statusConfig = {
  PLACED: {
    icon: Package,
    color: "bg-gray-100 text-gray-700 border border-gray-200",
    label: "Placed",
  },

  PAID: {
    icon: CreditCard,
    color: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    label: "Paid",
  },

  SHIPPED: {
    icon: Truck,
    color: "bg-blue-100 text-blue-700 border border-blue-200",
    label: "Shipped",
  },

  DELIVERED: {
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    label: "Delivered",
  },

  CANCELLED: {
    icon: XCircle,
    color: "bg-red-100 text-red-700 border border-red-200",
    label: "Cancelled",
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.PLACED;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;