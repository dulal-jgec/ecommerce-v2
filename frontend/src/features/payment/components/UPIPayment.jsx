// src/features/payment/components/UPIPayment.jsx
import React, { useState } from 'react';
import { Smartphone, Copy, Check, ExternalLink, Loader } from 'lucide-react';

const UPIPayment = ({ onSubmit, loading, amount }) => {
  const [upiId, setUpiId] = useState('');
  const [copied, setCopied] = useState(false);
  const [method, setMethod] = useState('upi-id');

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: '🟢' },
    { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
    { id: 'paytm', name: 'Paytm', icon: '🔵' },
    { id: 'amazon', name: 'Amazon Pay', icon: '🟠' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('shoply@upi');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === 'upi-id' && upiId) {
      onSubmit({ method: 'upi', upiId });
    } else if (method === 'qr') {
      onSubmit({ method: 'upi', upiId: 'shoply@upi' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm bg-emerald-50 text-emerald-700 p-3 rounded-xl">
        <Smartphone size={18} />
        <span>Pay using any UPI app</span>
      </div>

      {/* Method Selection */}
      <div className="flex gap-2">
        <button
          onClick={() => setMethod('upi-id')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${
            method === 'upi-id'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Enter UPI ID
        </button>
        <button
          onClick={() => setMethod('qr')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition ${
            method === 'qr'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Scan QR Code
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {method === 'upi-id' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Enter UPI ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                required
              />
              <button
                type="submit"
                disabled={loading || !upiId}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader size={18} className="animate-spin" /> : 'Pay'}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">e.g., example@upi, 9876543210@upi</p>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-2xl mx-auto flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
                  <Smartphone size={48} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-400 mt-2">Scan with any UPI app</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-sm text-gray-500">Pay to:</span>
              <span className="font-mono font-semibold text-emerald-600">shoply@upi</span>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-emerald-600"
              >
                {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : 'Confirm Payment'}
            </button>
          </div>
        )}

        {/* UPI Apps */}
        <div>
          <p className="text-xs text-gray-400 text-center mb-3">Pay with your favorite UPI app</p>
          <div className="flex justify-center gap-4">
            {upiApps.map((app) => (
              <button
                key={app.id}
                type="button"
                className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-xl transition"
              >
                <span className="text-2xl">{app.icon}</span>
                <span className="text-xs text-gray-500">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UPIPayment;