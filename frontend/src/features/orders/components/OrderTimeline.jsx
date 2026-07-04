// src/features/orders/components/OrderTimeline.jsx
import React from 'react';
import { Check, Clock, Package, Truck, X, Calendar } from 'lucide-react';

const OrderTimeline = ({ status, createdAt, updatedAt }) => {
  const steps = [
    { id: 'PENDING', label: 'Order Placed', icon: Clock, description: 'Your order has been confirmed', color: 'text-orange-500' },
    { id: 'PROCESSING', label: 'Processing', icon: Package, description: 'We are preparing your order', color: 'text-yellow-500' },
    { id: 'SHIPPED', label: 'Shipped', icon: Truck, description: 'Your order is on the way', color: 'text-blue-500' },
    { id: 'DELIVERED', label: 'Delivered', icon: Check, description: 'Your order has been delivered', color: 'text-emerald-500' },
  ];

  const currentIndex = steps.findIndex(s => s.id === status);
  const isCompleted = status === 'DELIVERED';
  const isCancelled = status === 'CANCELLED';

  if (isCancelled) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Clock size={18} className="text-gray-500" />
          Order Timeline
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <X size={30} className="text-red-500" />
          </div>
          <p className="text-lg font-medium text-red-600">Order Cancelled</p>
          <p className="text-sm text-gray-500 mt-1">This order has been cancelled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Clock size={18} className="text-emerald-600" />
        Order Timeline
      </h3>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-5 top-3 bottom-3 w-0.5 bg-gray-200"></div>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative flex gap-4">
                {/* Icon */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10
                  ${isActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                    : 'bg-gray-200 text-gray-400'}
                  ${isCurrent ? 'ring-4 ring-emerald-100' : ''}
                `}>
                  {isActive ? <Check size={18} /> : <Icon size={18} />}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                    {step.description}
                  </p>
                  {isCurrent && updatedAt && (
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(updatedAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
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