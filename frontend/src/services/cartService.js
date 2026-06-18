// services/cartService.js
import api from "./api"; // your axios instance with token interceptor

export const addToCart = async (productId, quantity = 1,color) => {
  const res = await api.post("/cart", { productId, quantity,color });
  return res.data.data;
};

export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data.data;
};

export const updateCartQuantity = async (cartItemId, quantity) => {
  const res = await api.put("/cart/quantity", { cartItemId, quantity });
  return res.data.data;
};

export const removeCartItem = async (cartItemId) => {
  await api.delete(`/cart/items/${cartItemId}`);
};

export const clearCart = async () => {
  await api.delete("/cart/clear");
};