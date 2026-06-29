// src/features/seller/pages/BankDetailsPage.jsx
import React, { useState } from 'react';
import { Save, CreditCard, Building, User, Banknote, ShieldCheck } from 'lucide-react';
import BankDetailsForm from '../components/BankDetailsForm';

const BankDetailsPage = () => {
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: 'EcoStore India',
    accountNumber: '1234567890',
    confirmAccountNumber: '1234567890',
    bankName: 'State Bank of India',
    ifscCode: 'SBIN0001234',
    upiId: 'ecostore@upi',
    panNumber: 'ABCDE1234F',
    gstNumber: '22ABCDE1234F1Z1',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bank Details</h1>
          <p className="text-gray-500 text-sm">Manage your payment information</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">
          <Save size={16} />
          Save Changes
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-medium">Your payment details are secure</p>
          <p className="text-blue-600">We use industry-standard encryption to protect your financial information.</p>
        </div>
      </div>

      {/* Bank Details Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <BankDetailsForm bankDetails={bankDetails} setBankDetails={setBankDetails} />
      </div>
    </div>
  );
};

export default BankDetailsPage;