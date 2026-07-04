// src/features/admin/pages/SellersPage.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Package,
  Star,
  RefreshCw,
  Store,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  getAllSellers,
  approveSeller,
  rejectSeller,
} from "../services/adminService";
import ConfirmModal from "../components/ConfirmModal";

const SellersPage = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [modalAction, setModalAction] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    loadSellers();
  }, [page]);

  const loadSellers = async () => {
    setLoading(true);
    try {
      const data = await getAllSellers();
      setSellers(data);
      setTotalPages(Math.ceil(data.length / 10));
    } catch (error) {
      console.error("Error loading sellers:", error);
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

  const openModal = (seller, action) => {
    setSelectedSeller(seller);
    setModalAction(action);
    setShowModal(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedSeller) return;

    if (modalAction === "approve") {
      await handleApprove(selectedSeller.id);
    } else if (modalAction === "reject") {
      await handleReject(selectedSeller.id);
    }

    setShowModal(false);
    setSelectedSeller(null);
  };

  const stats = [
    {
      label: "Total Sellers",
      value: sellers.length,
      color: "bg-indigo-50 text-indigo-700",
      icon: Store,
    },
    {
      label: "Pending",
      value: sellers.filter((s) => s.status === "PENDING" || !s.status).length,
      color: "bg-yellow-50 text-yellow-700",
      icon: Clock,
    },
    {
      label: "Approved",
      value: sellers.filter((s) => s.status === "APPROVED").length,
      color: "bg-emerald-50 text-emerald-700",
      icon: CheckCircle,
    },
    {
      label: "Rejected",
      value: sellers.filter((s) => s.status === "REJECTED").length,
      color: "bg-red-50 text-red-700",
      icon: XCircle,
    },
  ];

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch =
      (seller.storeName || seller.shopName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      seller.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (seller.ownerName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (seller.firstName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (seller.lastName || "").toLowerCase().includes(searchTerm.toLowerCase());

    const sellerStatus = seller.status || "PENDING";
    const matchesStatus =
      filterStatus === "all" || sellerStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading sellers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Sellers Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage all sellers and their store applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadSellers}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            <UserPlus size={16} />
            Add Seller
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.color} rounded-xl p-4 text-center transition hover:shadow-md`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Icon size={18} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search sellers by store name, owner, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition appearance-none"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm hover:bg-gray-100 transition flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller / Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-semibold text-sm shadow-sm">
                        {(seller.storeName || seller.shopName || "S")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {seller.storeName || seller.shopName || "N/A"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {seller.ownerName ||
                            `${seller.firstName || ""} ${seller.lastName || ""}` ||
                            "N/A"}
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
                        {seller.phone || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                    <Package size={14} className="text-gray-400" />
                    {seller.products || 0}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800 flex items-center gap-1">
                    <DollarSign size={14} className="text-emerald-500" />
                    {seller.revenue || "₹0"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {seller.createdAt
                      ? new Date(seller.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(seller.status || "PENDING")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(seller, "view")}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600"
                      >
                        <Eye size={16} />
                      </button>
                      {seller.status !== "APPROVED" && (
                        <button
                          onClick={() => openModal(seller, "approve")}
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition text-emerald-600 hover:text-emerald-700"
                          title="Approve Seller"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                      {seller.status !== "REJECTED" &&
                        seller.status !== "APPROVED" && (
                          <button
                            onClick={() => openModal(seller, "reject")}
                            className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition text-red-600 hover:text-red-700"
                            title="Reject Seller"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      {seller.status === "APPROVED" && (
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600">
                          <Edit size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No sellers found matching your filters
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredSellers.length} of {sellers.length} sellers
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedSeller(null);
        }}
        onConfirm={handleConfirmAction}
        title={
          modalAction === "approve"
            ? "Approve Seller"
            : modalAction === "reject"
              ? "Reject Seller"
              : "Seller Details"
        }
        message={
          modalAction === "approve" ? (
            `Are you sure you want to approve "${selectedSeller?.storeName || selectedSeller?.shopName}" as a seller? They will get full access to the seller dashboard.`
          ) : modalAction === "reject" ? (
            `Are you sure you want to reject "${selectedSeller?.storeName || selectedSeller?.shopName}" seller application? This action cannot be undone.`
          ) : (
            <div className="text-left space-y-2">
              <p>
                <strong>Store:</strong>{" "}
                {selectedSeller?.storeName || selectedSeller?.shopName}
              </p>
              <p>
                <strong>Owner:</strong>{" "}
                {selectedSeller?.ownerName ||
                  `${selectedSeller?.firstName} ${selectedSeller?.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {selectedSeller?.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedSeller?.phone || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedSeller?.status || "PENDING"}
              </p>
            </div>
          )
        }
        confirmText={
          modalAction === "approve"
            ? "Approve Seller"
            : modalAction === "reject"
              ? "Reject Seller"
              : "Close"
        }
        type={
          modalAction === "approve"
            ? "success"
            : modalAction === "reject"
              ? "danger"
              : "info"
        }
      />
    </div>
  );
};

export default SellersPage;
