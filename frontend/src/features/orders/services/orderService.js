// src/features/orders/services/orderService.js
import apiClient from '../../../shared/services/apiClient';
import { ORDERS } from '../../../shared/services/apiEndpoints';

export const getMyOrders = async (page = 0, size = 10) => {
  const response = await apiClient.get(ORDERS.MY_ORDERS, {
    params: { page, size }
  });
  return response.data.data || { content: [], totalPages: 0 };
};

export const getOrderDetails = async (orderId) => {
  const response = await apiClient.get(ORDERS.DETAILS(orderId));
  return response.data.data;
};

export const cancelOrder = async (orderId) => {
  const response = await apiClient.post(`/api/v1/orders/${orderId}/cancel`);
  return response.data;
};