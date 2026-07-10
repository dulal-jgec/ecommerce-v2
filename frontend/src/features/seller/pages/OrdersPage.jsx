// src/features/seller/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  Filter,
  Eye,
  RefreshCw,
  Download,
  Package,
  Truck,
  Check,
  Clock,
  X,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import OrderTable from "../components/OrderTable";
import {
  getSellerOrders,
  updateSellerOrderStatus,
} from "../services/orderService";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Stats calculation
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white",
      icon: ShoppingBag,
      desc: "All orders",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "PLACED" || o.status === "PAID")
        .length,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white",
      icon: Clock,
      desc: "Waiting for action",
    },
    {
      label: "Shipped",
      value: orders.filter((o) => o.status === "SHIPPED").length,
      color: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      icon: Truck,
      desc: "On the way",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "DELIVERED").length,
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white",
      icon: Check,
      desc: "Completed",
    },
  ];

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getSellerOrders();
      const ordersData = data?.data || data || [];
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderItemId, newStatus) => {
    try {
      const result = await updateSellerOrderStatus(orderItemId, newStatus);
      await loadOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const handleViewDetails = (order) => {
    navigate(`/seller/orders/${order.orderItemId}`);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId?.toString().includes(searchTerm) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" || currentStatus === filterStatus.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingBag size={24} />
              Orders
            </h1>
            <p className="text-indigo-100 text-sm mt-1">
              Manage all your orders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadOrders}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/30 transition border border-white/20"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium hover:bg-white/30 transition border border-white/20">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.color} rounded-xl p-5 shadow-lg shadow-indigo-100/50`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm font-medium opacity-90">{stat.label}</p>
                  <p className="text-xs opacity-75 mt-0.5">{stat.desc}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by Order ID, Customer, Product..."
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
                <option value="placed">Placed</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
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
      <OrderTable
        orders={filteredOrders}
        onStatusUpdate={handleStatusUpdate}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};

export default OrdersPage;
