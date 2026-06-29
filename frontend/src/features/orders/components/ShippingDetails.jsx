// src/features/orders/components/ShippingDetails.jsx
import React from 'react';
import { MapPin, User, Phone, Mail, Clock, Package } from 'lucide-react';

const ShippingDetails = ({ address, status, createdAt }) => {
  if (!address) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
        No shipping details available
      </div>
    );
  }

  const getStatusInfo = (status) => {
    const map = {
      'PENDING': { label: 'Order Placed', icon: Clock, color: 'text-orange-500' },
      'PROCESSING': { label: 'Processing', icon: Package, color: 'text-yellow-500' },
      'SHIPPED': { label: 'Shipped', icon: Package, color: 'text-blue-500' },
      'DELIVERED': { label: 'Delivered', icon: Package, color: 'text-emerald-500' },
      'CANCELLED': { label: 'Cancelled', icon: Package, color: 'text-red-500' },
    };
    return map[status] || map['PENDING'];
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={18} className="text-emerald-600" />
        <h3 className="font-semibold text-gray-800">Shipping Details</h3>
        {status && (
          <span className={`ml-auto text-sm font-medium ${statusInfo.color}`}>
            {statusInfo.icon && <statusInfo.icon size={14} className="inline mr-1" />}
            {statusInfo.label}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Address */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="font-medium text-gray-800">{address.fullName}</p>
          <p className="text-sm text-gray-600">{address.street}</p>
          <p className="text-sm text-gray-600">
            {address.city}, {address.state} - {address.pincode}
          </p>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Phone size={14} />
              {address.phone}
            </span>
            {address.email && (
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {address.email}
              </span>
            )}
          </div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-500">Order Date</p>
            <p className="font-medium text-gray-800">
              {createdAt ? new Date(createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }) : '-'}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <p className="text-gray-500">Status</p>
            <p className={`font-medium ${statusInfo.color}`}>
              {status || 'Pending'}
            </p>
          </div>
        </div>

        {/* Delivery Estimate */}
        {status !== 'DELIVERED' && status !== 'CANCELLED' && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl text-emerald-700 text-sm">
            <Clock size={16} />
            <span>Estimated delivery: 3-5 business days</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingDetails;