// src/features/admin/pages/OrdersPage.jsx
import React, { useState, useEffect } from "react";
import {
  Search,
  Eye,
  ChevronDown,
  Filter,
  Truck,
  Check,
  Clock,
  X,
  RefreshCw,
  Download,
  Printer,
} from "lucide-react";
import { getAllOrders, updateOrderStatus } from "../services/adminService";
import ConfirmModal from "../components/ConfirmModal";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const statusOptions = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  useEffect(() => {
    loadOrders();
  }, [page]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders(page, 10);
      setOrders(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return;
    try {
      await updateOrderStatus(selectedOrder.id, newStatus);
      setShowStatusModal(false);
      setSelectedOrder(null);
      setNewStatus("");
      loadOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status || "PENDING");
    setShowStatusModal(true);
  };

  const stats = [
    {
      label: "Total Orders",
      value: orders.length || 0,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "PENDING").length,
      color: "bg-yellow-50 text-yellow-700",
    },
    {
      label: "Processing",
      value: orders.filter((o) => o.status === "PROCESSING").length,
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "DELIVERED").length,
      color: "bg-emerald-50 text-emerald-700",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id?.toString().includes(searchTerm) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusMap = {
      DELIVERED: {
        icon: <Check size={14} />,
        color: "bg-emerald-100 text-emerald-700",
      },
      SHIPPED: {
        icon: <Truck size={14} />,
        color: "bg-blue-100 text-blue-700",
      },
      PROCESSING: {
        icon: <Clock size={14} />,
        color: "bg-yellow-100 text-yellow-700",
      },
      PENDING: {
        icon: <Clock size={14} />,
        color: "bg-orange-100 text-orange-700",
      },
      CANCELLED: { icon: <X size={14} />, color: "bg-red-100 text-red-700" },
    };
    const s = statusMap[status] || statusMap["PENDING"];
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}
      >
        {s.icon}
        {status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() ||
          "Pending"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading orders...</p>
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
            Orders Management
          </h1>
          <p className="text-gray-500 text-sm">Manage all customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadOrders}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-xl p-4 text-center`}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm font-medium">{stat.label}</p>
          </div>
        ))}
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
              placeholder="Search orders by ID, customer name, email..."
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
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()}
                  </option>
                ))}
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

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        {order.customerName || "N/A"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.email || "N/A"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{order.total?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-indigo-600">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openStatusModal(order)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600"
                      >
                        <Clock size={16} />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-gray-600">
                        <Printer size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found matching your filters
          </div>
        )}

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredOrders.length} orders
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

      {/* Status Update Modal */}
      <ConfirmModal
        isOpen={showStatusModal}
        onClose={() => {
          setShowStatusModal(false);
          setSelectedOrder(null);
          setNewStatus("");
        }}
        onConfirm={handleUpdateStatus}
        title="Update Order Status"
        message={
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">
              Update status for order{" "}
              <span className="font-semibold text-gray-800">
                #{selectedOrder?.id}
              </span>
            </p>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        }
        confirmText="Update Status"
        type="info"
      />
    </div>
  );
};

export default OrdersPage;
