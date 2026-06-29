// src/features/orders/components/OrderItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ item }) => {
  return (
    <Link to={`/products/${item.productId}`}>
      <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition px-3 -mx-3 rounded-xl">
        <img
          src={item.image || '/images/placeholder.png'}
          alt={item.name}
          className="w-16 h-16 rounded-xl object-cover bg-gray-100"
        />
        <div className="flex-1">
          <p className="font-medium text-gray-800">{item.name}</p>
          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          {item.variant && (
            <p className="text-xs text-gray-400">Variant: {item.variant}</p>
          )}
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
          <p className="text-xs text-gray-400">₹{item.price} each</p>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;