import React from "react";
import {
  Users,
  Store,
  Package,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  const cards = [
    {
      title: "Users",
      value: stats.totalUsers ?? 0,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      change: "+12.5%",
      changeType: "up"
    },
    {
      title: "Sellers",
      value: stats.totalSellers ?? 0,
      icon: Store,
      color: "from-emerald-500 to-emerald-600",
      change: "+8.3%",
      changeType: "up"
    },
    {
      title: "Products",
      value: stats.totalProducts ?? 0,
      icon: Package,
      color: "from-purple-500 to-purple-600",
      change: "+5.7%",
      changeType: "up"
    },
    {
      title: "Orders",
      value: stats.totalOrders ?? 0,
      icon: ShoppingBag,
      color: "from-orange-500 to-orange-600",
      change: "+3.2%",
      changeType: "up"
    },
    {
      title: "Revenue",
      value: `₹${(stats.totalRevenue ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      change: "+18.7%",
      changeType: "up"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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