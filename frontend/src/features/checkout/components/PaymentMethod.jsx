// src/features/checkout/components/PaymentMethod.jsx
import React from 'react';
import { CreditCard, Smartphone, Banknote, Shield } from 'lucide-react';

const PaymentMethod = ({ selected, onSelect }) => {
  const methods = [
    { 
      id: 'card', 
      label: 'Credit/Debit Card', 
      icon: CreditCard, 
      description: 'Visa, Mastercard, RuPay' 
    },
    { 
      id: 'upi', 
      label: 'UPI', 
      icon: Smartphone, 
      description: 'Google Pay, PhonePe, Paytm' 
    },
    { 
      id: 'cod', 
      label: 'Cash on Delivery', 
      icon: Banknote, 
      description: 'Pay when you receive' 
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
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
              p-4 border-2 rounded-xl text-left transition-all
              ${selected === method.id 
                ? 'border-emerald-600 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                p-2 rounded-xl
                ${selected === method.id ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}
              `}>
                <method.icon size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{method.label}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
              {selected === method.id && (
                <span className="ml-auto text-emerald-600">✓</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;