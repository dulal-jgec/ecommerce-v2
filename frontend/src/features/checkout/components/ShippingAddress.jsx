// src/features/checkout/components/ShippingAddress.jsx
import React, { useState } from 'react';
import { Plus, Check, MapPin, Edit, Trash2 } from 'lucide-react';

const ShippingAddress = ({ addresses, selected, onSelect, onAdd, onSetDefault }) => {
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(newAddress);
    setNewAddress({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition"
        >
          <Plus size={16} />
          {showForm ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {/* Address List */}
      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            onClick={() => onSelect(address)}
            className={`
              p-4 border-2 rounded-xl cursor-pointer transition-all
              ${selected?.id === address.id 
                ? 'border-emerald-600 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {selected?.id === address.id ? (
                    <Check size={18} className="text-emerald-600" />
                  ) : (
                    <MapPin size={18} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{address.fullName}</p>
                  <p className="text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-gray-500">{address.phone}</p>
                  {address.isDefault && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Full Name"
              value={newAddress.fullName}
              onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              className="col-span-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
              required
            />
            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition text-sm"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newAddress.isDefault}
              onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <label className="text-sm text-gray-600">Set as default address</label>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition"
          >
            Save Address
          </button>
        </form>
      )}
    </div>
  );
};

export default ShippingAddress;