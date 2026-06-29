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
      const data = await getMyOrders(page, 10);
      setOrders(data.content || []);
      setTotalPages(data.totalPages || 0);
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
  }, [page]);

  return { orders, loading, error, page, totalPages, setPage, getOrder, cancel, loadOrders };
};