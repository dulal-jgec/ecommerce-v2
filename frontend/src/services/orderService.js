// orderService.js

import api from "./api";

export const placeOrder = async (addressId) => {
  const res = await api.post("/orders", {
    addressId,
  });

  return res.data.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders");

  return res.data.data;
};


export const getOrderById = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`);

  return res.data.data;
};

export const getAllOrders = async () => {
  const res = await api.get("/orders/admin");
  return res.data.data;
};

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const res = await api.put(
    `/orders/admin/${orderId}/status`,
    {
      status,
    }
  );

  return res.data.data;
};

export const getAdminOrderById = async (
  orderId
) => {
  const res = await api.get(
    `/orders/admin/${orderId}`
  );

  return res.data.data;
};

export const getSellerOrders = async () => {
  const res = await api.get("/orders/seller/orders");
  return res.data;
};

export const getSellerOrderDetails = async (
  orderItemId
) => {

  const res = await api.get(
    `/orders/seller/orders/${orderItemId}`
  );

  return res.data;
};

export const updateSellerOrderStatus = async (
  orderItemId,
  status
) => {
  const res = await api.put(
    `/orders/seller/orders/${orderItemId}/status`,
    {
      status,
    }
  );

  return res.data;
};