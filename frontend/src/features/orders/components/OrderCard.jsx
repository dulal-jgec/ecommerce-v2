// src/features/orders/components/OrderCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, Calendar, ShoppingBag, ArrowUpRight } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

const OrderCard = ({ order }) => {
  const totalItems = order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <Link to={`/orders/${order.orderId}`}>
      <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200/50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-bold text-slate-800 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                #{order.orderId}
              </span>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
              <Calendar size={14} />
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Items</p>
              <p className="font-semibold text-slate-700">{totalItems}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider">Total</p>
              <p className="font-bold text-indigo-600 text-lg">₹{order.totalPrice?.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 flex items-center justify-center group-hover:from-indigo-500 group-hover:to-indigo-600 transition-all duration-300 shadow-sm group-hover:shadow-lg">
              <ArrowUpRight size={18} className="text-indigo-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
        
        {/* Items Preview */}
        {order.items?.length > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100/50">
            {order.items.slice(0, 5).map((item) => (
              <div key={item.id} className="relative group/item">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border border-slate-200/50 group-hover/item:border-indigo-300 transition shadow-sm">
                  <img
                    src={item.imageUrl || '/images/placeholder.png'}
                    alt={item.productName}
                    className="w-8 h-8 object-contain rounded-lg"
                  />
                </div>
              </div>
            ))}
            {order.items.length > 5 && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-medium text-slate-500 border border-slate-200/50">
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