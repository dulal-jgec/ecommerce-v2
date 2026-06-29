// src/features/orders/components/BillingDetails.jsx
import React from 'react';
import { CreditCard, Building, User, MapPin, Phone, Mail, FileText } from 'lucide-react';

const BillingDetails = ({ billing, order }) => {
  if (!billing && !order) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
        No billing details available
      </div>
    );
  }

  // Use billing data or fallback to order data
  const billingData = billing || {
    fullName: order?.shippingAddress?.fullName || 'N/A',
    email: order?.userEmail || 'N/A',
    phone: order?.shippingAddress?.phone || 'N/A',
    address: order?.shippingAddress || {},
    paymentMethod: order?.paymentMethod || 'Card',
    paymentStatus: order?.paymentStatus || 'Pending',
    invoiceNumber: order?.invoiceNumber || `INV-${order?.id || '000'}`,
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={18} className="text-emerald-600" />
        <h3 className="font-semibold text-gray-800">Billing Details</h3>
        {billingData.invoiceNumber && (
          <span className="ml-auto text-xs text-gray-400">
            Invoice: {billingData.invoiceNumber}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Customer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <User size={14} />
              <span>Customer Name</span>
            </div>
            <p className="font-medium text-gray-800">{billingData.fullName}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Mail size={14} />
              <span>Email</span>
            </div>
            <p className="font-medium text-gray-800">{billingData.email}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Phone size={14} />
            <span>Phone</span>
          </div>
          <p className="font-medium text-gray-800">{billingData.phone}</p>
        </div>

        {/* Billing Address */}
        {billingData.address && (
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <MapPin size={14} />
              <span>Billing Address</span>
            </div>
            <p className="text-gray-800">
              {billingData.address.street}
              <br />
              {billingData.address.city}, {billingData.address.state} - {billingData.address.pincode}
            </p>
          </div>
        )}

        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <CreditCard size={14} />
              <span>Payment Method</span>
            </div>
            <p className="font-medium text-gray-800 capitalize">
              {billingData.paymentMethod || 'Card'}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Building size={14} />
              <span>Payment Status</span>
            </div>
            <span className={`font-medium ${
              billingData.paymentStatus === 'PAID' || billingData.paymentStatus === 'Completed'
                ? 'text-emerald-600' 
                : 'text-yellow-600'
            }`}>
              {billingData.paymentStatus || 'Pending'}
            </span>
          </div>
        </div>

        {/* GST/Tax Info (if available) */}
        {billingData.gstNumber && (
          <div className="p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Building size={14} />
              <span>GST Number</span>
            </div>
            <p className="font-medium text-gray-800">{billingData.gstNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingDetails;