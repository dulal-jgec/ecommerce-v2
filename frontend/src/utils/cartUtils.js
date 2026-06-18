// utils/cartUtils.js

export const calculateSubtotal = (cartItems) => {
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].quantity;
  }

  return total;
};

export const calculateShipping = (subtotal) => {
  if (subtotal > 100) return 0;
  return 10;
};

export const calculateTax = (subtotal) => {
  return subtotal * 0.08;
};

export const calculateTotal = (subtotal, shipping, tax, discount) => {
  return subtotal + shipping + tax - discount;
};