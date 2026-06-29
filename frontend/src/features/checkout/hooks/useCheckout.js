// src/features/checkout/hooks/useCheckout.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCart, 
  getAddresses, 
  addAddress, 
  setDefaultAddress,
  placeOrder,
  createPayment,
  verifyPayment,
  clearCart,
  applyCoupon
} from '../services/checkoutService';

export const useCheckout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({ items: [], total: 0, subtotal: 0 });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [orderId, setOrderId] = useState(null);

  const loadCheckoutData = async () => {
    setLoading(true);
    try {
      const [cartData, addressesData] = await Promise.all([
        getCart(),
        getAddresses(),
      ]);
      setCart(cartData);
      setAddresses(addressesData);
      const defaultAddr = addressesData.find(a => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr);
      else if (addressesData.length > 0) setSelectedAddress(addressesData[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (addressData) => {
    try {
      const newAddress = await addAddress(addressData);
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress);
      return newAddress;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await setDefaultAddress(id);
      const updated = addresses.map(a => ({ ...a, isDefault: a.id === id }));
      setAddresses(updated);
      setSelectedAddress(updated.find(a => a.id === id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleApplyCoupon = async (code) => {
    try {
      const result = await applyCoupon(code);
      setCoupon(result);
      setDiscount(result.discount || 0);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const orderData = {
        addressId: selectedAddress.id,
        shippingMethod,
        paymentMethod,
        couponCode: coupon?.code || null,
      };
      const order = await placeOrder(orderData);
      setOrderId(order.id);
      return order;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (paymentDetails) => {
    if (!orderId) {
      setError('No order found. Please place order first.');
      return;
    }
    setLoading(true);
    try {
      const paymentData = {
        orderId,
        method: paymentMethod,
        ...paymentDetails,
      };
      const result = await createPayment(paymentData);
      // Verify payment
      await verifyPayment({ orderId, paymentId: result.id });
      await clearCart();
      navigate(`/orders/success/${orderId}`);
      return result;
    } catch (err) {
      setError(err.message);
      navigate(`/payment/failed/${orderId}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTotal = () => {
    const subtotal = cart.subtotal || 0;
    const shipping = shippingMethod === 'express' ? 100 : 0;
    return subtotal + shipping - discount;
  };

  useEffect(() => {
    loadCheckoutData();
  }, []);

  return {
    loading,
    error,
    cart,
    addresses,
    selectedAddress,
    setSelectedAddress,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    coupon,
    discount,
    orderId,
    total: getTotal(),
    handleAddAddress,
    handleSetDefaultAddress,
    handleApplyCoupon,
    handlePlaceOrder,
    handlePayment,
    loadCheckoutData,
  };
};