// src/features/seller/components/BankDetailsForm.jsx
import React from 'react';
import { User, CreditCard, Building, Hash, Globe, FileText } from 'lucide-react';

const BankDetailsForm = ({ bankDetails, setBankDetails }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <User size={16} className="inline mr-2 text-emerald-500" />
          Account Holder Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="accountHolderName"
          value={bankDetails.accountHolderName}
          onChange={handleChange}
          placeholder="Enter account holder name"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <CreditCard size={16} className="inline mr-2 text-emerald-500" />
            Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="accountNumber"
            value={bankDetails.accountNumber}
            onChange={handleChange}
            placeholder="Enter account number"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <CreditCard size={16} className="inline mr-2 text-emerald-500" />
            Confirm Account Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="confirmAccountNumber"
            value={bankDetails.confirmAccountNumber}
            onChange={handleChange}
            placeholder="Re-enter account number"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Building size={16} className="inline mr-2 text-emerald-500" />
            Bank Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankName"
            value={bankDetails.bankName}
            onChange={handleChange}
            placeholder="Enter bank name"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <Hash size={16} className="inline mr-2 text-emerald-500" />
            IFSC Code <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="ifscCode"
            value={bankDetails.ifscCode}
            onChange={handleChange}
            placeholder="Enter IFSC code"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          <Globe size={16} className="inline mr-2 text-emerald-500" />
          UPI ID (Optional)
        </label>
        <input
          type="text"
          name="upiId"
          value={bankDetails.upiId}
          onChange={handleChange}
          placeholder="Enter UPI ID"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <FileText size={16} className="inline mr-2 text-emerald-500" />
            PAN Number
          </label>
          <input
            type="text"
            name="panNumber"
            value={bankDetails.panNumber}
            onChange={handleChange}
            placeholder="Enter PAN number"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            <FileText size={16} className="inline mr-2 text-emerald-500" />
            GST Number
          </label>
          <input
            type="text"
            name="gstNumber"
            value={bankDetails.gstNumber}
            onChange={handleChange}
            placeholder="Enter GST number"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-700">
        <p className="font-medium">⚠️ Important</p>
        <p className="text-yellow-600 mt-1">Please ensure all details are correct. Incorrect information may delay your payments.</p>
      </div>
    </div>
  );
};

export default BankDetailsForm;