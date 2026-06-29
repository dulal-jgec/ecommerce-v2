// src/features/payment/components/PaymentMethods.jsx
import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, Shield, Check } from 'lucide-react';

const PaymentMethods = ({ selected, onSelect }) => {
  const methods = [
    { 
      id: 'card', 
      label: 'Credit/Debit Card', 
      icon: CreditCard, 
      description: 'Visa, Mastercard, RuPay',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'upi', 
      label: 'UPI', 
      icon: Smartphone, 
      description: 'Google Pay, PhonePe, Paytm',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'cod', 
      label: 'Cash on Delivery', 
      icon: Banknote, 
      description: 'Pay when you receive',
      color: 'from-emerald-500 to-emerald-600'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Select Payment Method</h2>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Shield size={14} className="text-emerald-600" />
          Secure
        </span>
      </div>

      <div className="grid gap-3">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={`
              relative p-4 border-2 rounded-2xl text-left transition-all
              ${selected === method.id 
                ? 'border-emerald-600 bg-emerald-50 shadow-lg shadow-emerald-100' 
                : 'border-gray-200 hover:border-gray-300 bg-white'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-3 rounded-xl bg-gradient-to-br ${method.color} text-white shadow-lg
                ${selected === method.id ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}
              `}>
                <method.icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{method.label}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              {selected === method.id && (
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;