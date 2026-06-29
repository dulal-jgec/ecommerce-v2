// src/features/payment/components/CardForm.jsx
import React, { useState } from 'react';
import { CreditCard, Lock, Calendar, User } from 'lucide-react';

const CardForm = ({ onSubmit, loading }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      setCardData({ ...cardData, cardNumber: formatted });
      return;
    }

    setCardData({ ...cardData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!cardData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Enter a valid 16-digit card number';
    }
    if (!cardData.cardHolder) {
      newErrors.cardHolder = 'Card holder name is required';
    }
    if (!cardData.expiryMonth || !cardData.expiryYear) {
      newErrors.expiry = 'Expiry date is required';
    }
    if (!cardData.cvv || !cardData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Enter a valid CVV';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...cardData,
        cardNumber: cardData.cardNumber.replace(/\s/g, ''),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-6">
          <CreditCard size={28} className="text-emerald-400" />
          <span className="text-xs text-gray-400">Secure</span>
        </div>
        <p className="text-xl font-mono tracking-wider">
          {cardData.cardNumber || '•••• •••• •••• ••••'}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs text-gray-400">Card Holder</p>
            <p className="font-medium">{cardData.cardHolder || 'YOUR NAME'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Expires</p>
            <p className="font-medium">
              {cardData.expiryMonth || 'MM'}/{cardData.expiryYear || 'YY'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <CreditCard size={16} className="inline mr-2 text-emerald-500" />
          Card Number
        </label>
        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleChange}
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          className={`
            w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition
            ${errors.cardNumber ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-emerald-500 focus:border-transparent'}
          `}
        />
        {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <User size={16} className="inline mr-2 text-emerald-500" />
          Card Holder Name
        </label>
        <input
          type="text"
          name="cardHolder"
          value={cardData.cardHolder}
          onChange={handleChange}
          placeholder="John Doe"
          className={`
            w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition
            ${errors.cardHolder ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-emerald-500 focus:border-transparent'}
          `}
        />
        {errors.cardHolder && <p className="text-xs text-red-500 mt-1">{errors.cardHolder}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Calendar size={16} className="inline mr-2 text-emerald-500" />
            Expiry Date
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="expiryMonth"
              value={cardData.expiryMonth}
              onChange={handleChange}
              placeholder="MM"
              maxLength="2"
              className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
            />
            <input
              type="text"
              name="expiryYear"
              value={cardData.expiryYear}
              onChange={handleChange}
              placeholder="YY"
              maxLength="2"
              className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
            />
          </div>
          {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Lock size={16} className="inline mr-2 text-emerald-500" />
            CVV
          </label>
          <input
            type="password"
            name="cvv"
            value={cardData.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength="4"
            className={`
              w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 outline-none transition
              ${errors.cvv ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-emerald-500 focus:border-transparent'}
            `}
          />
          {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </>
        ) : (
          <>
            <Lock size={18} />
            Pay Now
          </>
        )}
      </button>
    </form>
  );
};

export default CardForm;