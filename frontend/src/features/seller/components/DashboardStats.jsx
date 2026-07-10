// src/features/seller/components/DashboardStats.jsx
import React from "react";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Clock3,
  CheckCircle,
} from "lucide-react";
import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Revenue",
      value: `₹${Number(stats?.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      change: "Live",
      changeType: "up",
    },
    {
      title: "Total Orders",
      value: Number(stats?.totalOrders || 0).toLocaleString(),
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
      change: "Live",
      changeType: "up",
    },
    {
      title: "Total Products",
      value: Number(stats?.totalProducts || 0).toLocaleString(),
      icon: Package,
      color: "from-purple-500 to-purple-600",
      change: "Live",
      changeType: "up",
    },
    {
      title: "Pending Orders",
      value: Number(stats?.pendingOrders || 0).toLocaleString(),
      icon: Clock3,
      color: "from-orange-500 to-orange-600",
      change: "Pending",
      changeType: "up",
    },
    {
      title: "Delivered Orders",
      value: Number(stats?.deliveredOrders || 0).toLocaleString(),
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      change: "Completed",
      changeType: "up",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
      {cards.map((card, index) => (
        <StatCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          change={card.change}
          changeType={card.changeType}
        />
      ))}
    </div>
  );
};

export default DashboardStats;