import React, { useEffect, useState } from "react";
import { getMyOrders } from "../../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600";

      case "SHIPPED":
        return "text-blue-600";

      case "CANCELLED":
        return "text-red-600";

      default:
        return "text-yellow-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-lg p-5 mb-5 bg-white shadow"
          >
            <h2 className="font-bold text-lg mb-2">
              Order #{order.orderId}
            </h2>

            <p className="mb-4">
              Total: ₹{order.totalPrice}
            </p>

            <div className="space-y-3">

              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="border rounded p-3"
                >
                  <p>
                    <strong>Product:</strong>{" "}
                    {item.productName}
                  </p>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {item.quantity}
                  </p>

                  <p>
                    <strong>Color:</strong>{" "}
                    {item.color}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹
                    {item.price}
                  </p>

                  <p
                    className={`font-bold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    Status : {item.status}
                  </p>
                </div>
              ))}

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;