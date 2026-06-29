// src/features/seller/components/StoreProfileForm.jsx
import React from 'react';
import { Store, User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

const StoreProfileForm = ({ profile, setProfile }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Store size={16} className="inline mr-2 text-emerald-500" />
            Store Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="storeName"
            value={profile.storeName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <User size={16} className="inline mr-2 text-emerald-500" />
            Owner Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ownerName"
            value={profile.ownerName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Mail size={16} className="inline mr-2 text-emerald-500" />
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Phone size={16} className="inline mr-2 text-emerald-500" />
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <MapPin size={16} className="inline mr-2 text-emerald-500" />
          Address
        </label>
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <Globe size={16} className="inline mr-2 text-emerald-500" />
          Website
        </label>
        <input
          type="text"
          name="website"
          value={profile.website}
          onChange={handleChange}
          placeholder="www.yourstore.com"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <FileText size={16} className="inline mr-2 text-emerald-500" />
          Store Description
        </label>
        <textarea
          name="description"
          value={profile.description}
          onChange={handleChange}
          rows="4"
          placeholder="Tell customers about your store..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>
    </div>
  );
};

export default StoreProfileForm;