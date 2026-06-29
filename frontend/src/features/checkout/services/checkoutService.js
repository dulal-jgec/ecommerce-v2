// src/features/checkout/services/checkoutService.js
import apiClient from '../../../shared/services/apiClient';
import { ADDRESS, ORDERS, PAYMENT, CART } from '../../../shared/services/apiEndpoints';

export const getAddresses = async () => {
  const response = await apiClient.get(ADDRESS.ALL);
  return response.data.data || [];
};

export const addAddress = async (addressData) => {
  const response = await apiClient.post(ADDRESS.CREATE, addressData);
  return response.data.data;
};

export const updateAddress = async (id, addressData) => {
  const response = await apiClient.put(ADDRESS.UPDATE(id), addressData);
  return response.data.data;
};

export const deleteAddress = async (id) => {
  const response = await apiClient.delete(ADDRESS.DELETE(id));
  return response.data;
};

export const setDefaultAddress = async (id) => {
  const response = await apiClient.patch(ADDRESS.DEFAULT(id));
  return response.data.data;
};

export const getCart = async () => {
  const response = await apiClient.get(CART.GET);
  return response.data.data || { items: [], total: 0 };
};

export const clearCart = async () => {
  const response = await apiClient.delete(CART.CLEAR);
  return response.data;
};

export const applyCoupon = async (couponCode) => {
  const response = await apiClient.post('/api/v1/coupons/apply', { code: couponCode });
  return response.data.data;
};

export const placeOrder = async (orderData) => {
  const response = await apiClient.post(ORDERS.CREATE, orderData);
  return response.data.data;
};

export const createPayment = async (paymentData) => {
  const response = await apiClient.post(PAYMENT.CREATE, paymentData);
  return response.data.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await apiClient.post(PAYMENT.VERIFY, paymentData);
  return response.data;
};