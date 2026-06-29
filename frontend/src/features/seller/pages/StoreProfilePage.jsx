// src/features/seller/pages/StoreProfilePage.jsx
import React, { useState } from 'react';
import { Save, Upload, Store, User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import StoreProfileForm from '../components/StoreProfileForm';

const StoreProfilePage = () => {
  const [profile, setProfile] = useState({
    storeName: 'EcoStore India',
    ownerName: 'Priya Patel',
    email: 'eco@example.com',
    phone: '+91 98765 43211',
    address: '123, Green Street, Bangalore, India',
    website: 'www.ecostore.in',
    description: 'Your one-stop shop for eco-friendly and sustainable products.',
    logo: null,
    banner: null,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Store Profile</h1>
          <p className="text-gray-500 text-sm">Manage your store information</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* Store Preview */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
            🌿
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.storeName}</h2>
            <p className="text-emerald-100">{profile.ownerName}</p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <StoreProfileForm profile={profile} setProfile={setProfile} />
      </div>
    </div>
  );
};

export default StoreProfilePage;