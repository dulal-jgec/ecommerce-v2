 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "./cartService";
 

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  return await getCart();
});

export const addItemToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity, color }) => {
    return await addToCart(productId, quantity, color);
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/update",
  async ({ cartItemId, quantity }) => {
    return await updateCartItem(cartItemId, quantity);
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/remove",
  async (cartItemId) => {
    await removeFromCart(cartItemId);
    return cartItemId;
  }
);

export const clearAllCart = createAsyncThunk(
  "cart/clear",
  async () => {
    await clearCart();
    return true;
  }
);

 

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  total: 0,
  loading: false,
  error: null,
};



const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    // Optimistic Add
    localAddItem: (state, action) => {
      const { productId, quantity, price, name, image } = action.payload;

      const existing = state.items.find(
        (item) => item.productId === productId
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          productId,
          quantity,
          price,
          productName: name,
          imageUrl: image,
        });
      }

      state.totalItems += quantity;
      state.subtotal += price * quantity;
      state.total = state.subtotal;
    },

    // Optimistic Remove
    localRemoveItem: (state, action) => {
      const cartItemId = action.payload;

      const item = state.items.find(
        (i) => i.cartItemId === cartItemId
      );

      if (item) {
        state.totalItems -= item.quantity;
        state.subtotal -= item.price * item.quantity;
        state.total = state.subtotal;

        state.items = state.items.filter(
          (i) => i.cartItemId !== cartItemId
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder

       

      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log("FETCH CART :", action.payload);

        state.loading = false;

        state.items = action.payload.items || [];

        state.totalItems =
          action.payload.items?.reduce(
            (sum, item) => sum + item.quantity,
            0
          ) || 0;

        state.subtotal = Number(action.payload.totalPrice || 0);
        state.total = Number(action.payload.totalPrice || 0);
      })

      .addCase(fetchCart.rejected, (state, action) => {
        console.log("FETCH CART ERROR :", action.error);

        state.loading = false;
        state.error = action.error.message;
      })

     

      .addCase(addItemToCart.fulfilled, (state, action) => {
        console.log("ADD CART :", action.payload);

        state.items = action.payload.items || [];

        state.totalItems =
          action.payload.items?.reduce(
            (sum, item) => sum + item.quantity,
            0
          ) || 0;

        state.subtotal = Number(action.payload.totalPrice || 0);
        state.total = Number(action.payload.totalPrice || 0);
      })

       

      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        console.log("UPDATE CART :", action.payload);

        state.items = action.payload.items || [];

        state.totalItems =
          action.payload.items?.reduce(
            (sum, item) => sum + item.quantity,
            0
          ) || 0;

        state.subtotal = Number(action.payload.totalPrice || 0);
        state.total = Number(action.payload.totalPrice || 0);
      })

    

      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const cartItemId = action.payload;

        state.items = state.items.filter(
          (item) => item.cartItemId !== cartItemId
        );

        state.totalItems = state.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        state.subtotal = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        state.total = state.subtotal;
      })

      

      .addCase(clearAllCart.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.subtotal = 0;
        state.total = 0;
      });
  },
});

export const {
  clearError,
  localAddItem,
  localRemoveItem,
} = cartSlice.actions;

export default cartSlice.reducer;