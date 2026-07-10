// src/features/orders/hooks/useOrders.js
import { useState, useEffect } from 'react';
import { getMyOrders, getOrderDetails, cancelOrder } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getMyOrders();
      setOrders(data);
      setTotalPages(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (id) => {
    try {
      return await getOrderDetails(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const cancel = async (id) => {
    try {
      await cancelOrder(id);
      await loadOrders();
      return true;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

useEffect(() => {
  loadOrders();

  const interval = setInterval(() => {
    loadOrders();
  }, 10000);

  return () => clearInterval(interval);

}, [page]);

  return { orders, loading, error, page, totalPages, setPage, getOrder, cancel, loadOrders };
};