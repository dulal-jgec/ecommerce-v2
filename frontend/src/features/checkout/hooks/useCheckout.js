
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCart,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  placeOrder,
  createPayment,
  verifyPayment,
  clearCart,
  applyCoupon,
} from "../services/checkoutService";

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
const handleDeleteAddress = async (id) => {
  try {
    await deleteAddress(id);

    const updatedAddresses = addresses.filter(
      (address) => address.id !== id
    );

    setAddresses(updatedAddresses);

    if (selectedAddress?.id === id) {
      setSelectedAddress(updatedAddresses[0] || null);
    }
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
    setError("Please select a shipping address");
    return;
  }

  try {
    setLoading(true);
    setError(null);

    const order = await placeOrder({
      addressId: selectedAddress.id,
    });

    setOrderId(order.orderId);

    return order;

  } catch (err) {
    setError(err.response?.data?.message || err.message);
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
  handleDeleteAddress,   

  handleApplyCoupon,
  handlePlaceOrder,
  loadCheckoutData,
};
};