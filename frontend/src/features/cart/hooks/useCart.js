// src/features/cart/hooks/useCart.js
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCart, 
  addItemToCart, 
  updateItemQuantity, 
  removeItemFromCart, 
  clearAllCart,
  localAddItem,
  localRemoveItem
} from '../services/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, totalItems, subtotal, total, loading, error } = useSelector((state) => state.cart);

  const loadCart = () => {
    dispatch(fetchCart());
  };

  
  const addToCart = async (productId, quantity = 1, color = null) => {
    try {
      const result = await dispatch(addItemToCart({ productId, quantity, color })).unwrap();
      return result;
    } catch (error) {
      console.error('Add to cart failed:', error);
      throw error;
    }
  };

 
  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const result = await dispatch(updateItemQuantity({ cartItemId, quantity })).unwrap();
      return result;
    } catch (error) {
      console.error('Update quantity failed:', error);
      throw error;
    }
  };

 
  const removeItem = async (cartItemId) => {
    try {
      await dispatch(removeItemFromCart(cartItemId)).unwrap();
    } catch (error) {
      console.error('Remove item failed:', error);
      throw error;
    }
  };
 
  const clearCart = async () => {
    try {
      await dispatch(clearAllCart()).unwrap();
    } catch (error) {
      console.error('Clear cart failed:', error);
      throw error;
    }
  };


  const optimisticAdd = (product) => {
    dispatch(localAddItem({
      productId: product.id,
      quantity: 1,
      price: product.price,
      name: product.name,
      image: product.images?.[0]?.imageUrl,
    }));
  };


  const optimisticRemove = (cartItemId) => {
    dispatch(localRemoveItem(cartItemId));
  };

  return {
    items,
    totalItems,
    subtotal,
    total,
    loading,
    error,
    loadCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    optimisticAdd,
    optimisticRemove,
  };
};