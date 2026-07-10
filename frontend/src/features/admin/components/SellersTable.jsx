import React from "react";
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Mail,
  Phone,
} from "lucide-react";

const SellersTable = ({ sellers }) => {
  
  const getFullName = (seller) => {
    return `${seller.firstName || ""} ${seller.lastName || ""}`.trim() || "N/A";
  };

   
  const getInitial = (seller) => {
    if (seller.firstName) return seller.firstName.charAt(0).toUpperCase();
    if (seller.fullName && seller.fullName.trim() !== " ") {
      return seller.fullName.charAt(0).toUpperCase();
    }
    return "S";
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      APPROVED: {
        icon: <CheckCircle size={14} />,
        color: "bg-emerald-50 text-emerald-700",
        label: "Approved",
      },
      PENDING: {
        icon: <Clock size={14} />,
        color: "bg-yellow-50 text-yellow-700",
        label: "Pending",
      },
      REJECTED: {
        icon: <XCircle size={14} />,
        color: "bg-red-50 text-red-700",
        label: "Rejected",
      },
    };
    const s = statusMap[status] || statusMap["PENDING"];
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}
      >
        {s.icon}
        {s.label}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Seller
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sellers.map((seller) => (
            <tr key={seller.id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-sm shadow-sm">
                    {getInitial(seller)}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {getFullName(seller)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {seller.email || "N/A"}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail size={14} className="text-gray-400" />
                    {seller.email || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Phone size={12} className="text-gray-400" />
                    {seller.phoneNumber || "N/A"}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                  {seller.role || "SELLER"}
                </span>
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(seller.status || "PENDING")}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {sseller.appliedAt
                  ? new Date(seller.appliedAt).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellersTable;
