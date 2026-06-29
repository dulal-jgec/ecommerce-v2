// src/features/orders/components/OrderStatusBadge.jsx
import React from 'react';
import { Clock, Truck, Check, X, Package } from 'lucide-react';

const OrderStatusBadge = ({ status }) => {
  const config = {
    'PENDING': { icon: Clock, color: 'bg-orange-100 text-orange-700' },
    'PROCESSING': { icon: Package, color: 'bg-yellow-100 text-yellow-700' },
    'SHIPPED': { icon: Truck, color: 'bg-blue-100 text-blue-700' },
    'DELIVERED': { icon: Check, color: 'bg-emerald-100 text-emerald-700' },
    'CANCELLED': { icon: X, color: 'bg-red-100 text-red-700' },
  };

  const { icon: Icon, color } = config[status] || config['PENDING'];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${color}`}>
      <Icon size={12} />
      {status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || 'Pending'}
    </span>
  );
};

export default OrderStatusBadge;