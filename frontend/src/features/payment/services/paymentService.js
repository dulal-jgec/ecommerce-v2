// src/features/payment/services/paymentService.js
import apiClient from '../../../shared/services/apiClient';
import { PAYMENT, ORDERS } from '../../../shared/services/apiEndpoints';

export const createPayment = async (paymentData) => {
  const response = await apiClient.post(PAYMENT.CREATE, paymentData);
  return response.data.data;
};

export const verifyPayment = async (paymentData) => {
  const response = await apiClient.post(PAYMENT.VERIFY, paymentData);
  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await apiClient.get(ORDERS.DETAILS(orderId));
  return response.data.data;
};