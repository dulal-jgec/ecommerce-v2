import apiClient from '../../../shared/services/apiClient';
import { CART } from '../../../shared/services/apiEndpoints';

// Cart 
export const getCart = async () => {
  const response = await apiClient.get(CART.GET);
  return response.data.data || { items: [], total: 0, subtotal: 0 };
};

// Add to Cart
export const addToCart = async (productId, quantity = 1, color = null) => {

    const finalColor = color || 'Default';
  const response = await apiClient.post(CART.ADD, {
    productId,
    quantity,
    color: finalColor,
  });
  return response.data.data;
};

// Quantity Update
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await apiClient.put(CART.UPDATE, {
    cartItemId,
    quantity,
  });
  return response.data.data;
};

// Remove from Cart
export const removeFromCart = async (cartItemId) => {
  const response = await apiClient.delete(CART.REMOVE(cartItemId));
  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await apiClient.delete(CART.CLEAR);
  return response.data;
};