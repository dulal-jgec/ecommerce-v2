import React, { useEffect, useState } from "react";
import { getSellerOrders } from "../../../services/orderService";

import { useNavigate } from "react-router-dom";

const SellerOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getSellerOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Orders</h1>

      {orders.map((order) => (
        <div key={order.orderItemId} className="border rounded p-4 mb-4">
          <img
            src={order.imageUrl}
            alt={order.productName}
            className="w-24 h-24 object-cover rounded"
          />
          <h2>{order.productName}</h2>

          <p>Order ID: {order.orderId}</p>

          <p>Color: {order.color}</p>

          <p>Qty: {order.quantity}</p>

          <p>Status: {order.status}</p>

          <p className="font-semibold text-green-600">₹{order.price}</p>

          <button
            onClick={() => navigate(`/seller/orders/${order.orderItemId}`)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            View Details
          </button>

          <p>Customer: {order.customerName}</p>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
