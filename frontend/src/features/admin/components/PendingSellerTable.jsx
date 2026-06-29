// src/features/admin/components/PendingSellerTable.jsx
import React, { useState, useEffect } from "react";
import { Eye, Check, X } from "lucide-react";
import {
  getPendingSellers,
  approveSeller,
  rejectSeller,
} from "../services/adminService";

const PendingSellerTable = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSellers();
  }, []);

  const loadSellers = async () => {
    try {
      const data = await getPendingSellers();
      setSellers(data);
    } catch (error) {
      console.error("Error loading pending sellers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveSeller(id);
      loadSellers();
    } catch (error) {
      console.error("Error approving seller:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectSeller(id);
      loadSellers();
    } catch (error) {
      console.error("Error rejecting seller:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse text-center">Loading...</div>
      </div>
    );
  }

  if (sellers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">
          Pending Seller Approvals
        </h3>
        <p className="text-gray-500 text-center py-4">
          No pending seller applications
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800">
            Pending Seller Approvals
          </h3>
          <p className="text-sm text-gray-400">
            {sellers.length} sellers waiting for approval
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-3">Store Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Type</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <tr
                key={seller.id}
                className="border-b border-gray-50 last:border-0"
              >
                <td className="py-3 font-medium text-gray-800 text-sm">
                  {seller.storeName || seller.shopName || "N/A"}
                </td>
                <td className="py-3 text-gray-500 text-sm">{seller.email}</td>
                <td className="py-3 text-gray-500 text-sm">
                  {seller.createdAt
                    ? new Date(seller.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                    {seller.businessType || "Sole Prop"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleApprove(seller.id)}
                      className="p-1.5 bg-green-50 hover:bg-green-100 rounded-lg transition text-green-600"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => handleReject(seller.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition text-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingSellerTable;
