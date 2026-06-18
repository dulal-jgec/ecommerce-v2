import { createContext, useContext, useState, useEffect } from "react";
import {
  addToCart as addToCartApi,
  getCart,
  updateCartQuantity,
  removeCartItem,
  clearCart as clearCartApi,
} from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    loadCart();
  }
}, []);

  const loadCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      console.log("CART RESPONSE =", data);

      setCartItems(data.items || []);
    } catch (error) {
      console.error("Failed to load cart", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      await addToCartApi(product.id, product.quantity || 1,product.color);
      await loadCart();
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;

    try {
      await updateCartQuantity(cartItemId, quantity);
      await loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      await loadCart();
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartApi();
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
