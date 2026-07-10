// src/features/seller/services/orderService.js
import apiClient from '../../../shared/services/apiClient';
import { ORDERS } from '../../../shared/services/apiEndpoints';

// Get seller orders
export const getSellerOrders = async () => {
  const response = await apiClient.get(ORDERS.SELLER_ALL);
  return response.data.data || response.data;
};

// Update seller order status
export const updateSellerOrderStatus = async (orderItemId, status) => {
  const response = await apiClient.put(
    ORDERS.SELLER_STATUS(orderItemId),
    { status }
  );
  return response.data;
};
export const getSellerOrderDetails = async (orderItemId) => {
  const response = await apiClient.get(ORDERS.SELLER_DETAILS(orderItemId));
  return response.data.data || response.data;
};