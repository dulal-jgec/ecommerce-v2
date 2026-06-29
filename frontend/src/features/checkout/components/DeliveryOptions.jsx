// src/features/checkout/components/DeliveryOptions.jsx
import React from 'react';
import { Truck, Zap, Clock } from 'lucide-react';

const DeliveryOptions = ({ selected, onSelect }) => {
  const options = [
    { 
      id: 'standard', 
      label: 'Standard Delivery', 
      icon: Truck, 
      price: 0, 
      time: '5-7 business days',
      description: 'Free delivery on orders above ₹499'
    },
    { 
      id: 'express', 
      label: 'Express Delivery', 
      icon: Zap, 
      price: 100, 
      time: '2-3 business days',
      description: 'Priority shipping with tracking'
    },
    { 
      id: 'same-day', 
      label: 'Same Day Delivery', 
      icon: Clock, 
      price: 200, 
      time: 'Within 24 hours',
      description: 'Available in select cities'
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800">Delivery Options</h2>
      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`
              p-4 border-2 rounded-xl text-left transition-all
              ${selected === option.id 
                ? 'border-emerald-600 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`
                  p-2 rounded-xl
                  ${selected === option.id ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}
                `}>
                  <option.icon size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{option.label}</p>
                  <p className="text-sm text-gray-500">{option.time}</p>
                  <p className="text-xs text-gray-400">{option.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${option.price === 0 ? 'text-emerald-600' : 'text-gray-800'}`}>
                  {option.price === 0 ? 'FREE' : `₹${option.price}`}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;