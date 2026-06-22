import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSellerOrderDetails,
  updateSellerOrderStatus,
} from "../../../services/orderService";
const SellerOrderDetails = () => {
  const { orderItemId } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, [orderItemId]);

  const loadOrder = async () => {
    try {
      const data = await getSellerOrderDetails(orderItemId);

      console.log(data);

      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const handleStatusChange = async (status) => {
    try {
      await updateSellerOrderStatus(order.orderItemId, status);

      fetchOrder();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/seller/orders")}
        className="mb-5 bg-black text-white px-4 py-2 rounded"
      >
        Back
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={order.imageUrl}
          alt={order.productName}
          className="w-48 h-48 object-cover rounded mb-5"
        />

        <h1 className="text-2xl font-bold mb-4">{order.productName}</h1>

        <p>
          <strong>Order Item Id:</strong> {order.orderItemId}
        </p>

        <p>
          <strong>Order Id:</strong> {order.orderId}
        </p>

        <p>
          <strong>Color:</strong> {order.color}
        </p>

        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>

        <p>
          <strong>Price:</strong> ₹{order.price}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <hr className="my-5" />

        <h2 className="text-xl font-bold mb-3">Customer Details</h2>

        <p>
          <strong>Name:</strong> {order.customerName}
        </p>

        <p>
          <strong>Phone:</strong> {order.customerPhone}
        </p>

        <p>
          <strong>Address:</strong> {order.address}
        </p>

        <select
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="PAID">PAID</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
    </div>
  );
};

export default SellerOrderDetails;
