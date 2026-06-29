// src/features/orders/components/OrderCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

const OrderCard = ({ order }) => {
  const totalItems = order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <Link to={`/orders/${order.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-800">#{order.id}</span>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="font-semibold">{totalItems}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-bold text-emerald-600">₹{order.total?.toLocaleString()}</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
        {/* Items Preview */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          {order.items?.slice(0, 4).map((item) => (
            <img
              key={item.id}
              src={item.image || '/images/placeholder.png'}
              alt={item.name}
              className="w-10 h-10 rounded-lg object-cover bg-gray-100"
            />
          ))}
          {order.items?.length > 4 && (
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
              +{order.items.length - 4}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;