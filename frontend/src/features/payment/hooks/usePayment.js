// src/features/payment/hooks/usePayment.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPayment, verifyPayment, getOrderDetails } from '../services/paymentService';

export const usePayment = (orderId) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const data = await getOrderDetails(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePayment = async (paymentDetails) => {
    setLoading(true);
    setError(null);
    try {
      const paymentData = {
        orderId,
        method: paymentDetails.method,
        amount: order?.total,
        ...paymentDetails,
      };
      
      const result = await createPayment(paymentData);
      
      // Verify payment
      const verification = await verifyPayment({
        orderId,
        paymentId: result.id,
        ...paymentDetails,
      });
      
      if (verification.success) {
        setPaymentStatus('success');
        navigate(`/orders/success/${orderId}`);
      } else {
        setPaymentStatus('failed');
        navigate(`/payment/failed/${orderId}`);
      }
      
      return result;
    } catch (err) {
      setError(err.message);
      setPaymentStatus('failed');
      navigate(`/payment/failed/${orderId}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    order,
    paymentStatus,
    handlePayment,
  };
};