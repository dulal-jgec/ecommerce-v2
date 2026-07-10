import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/services/authSlice';
import cartReducer from '../../features/cart/services/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

