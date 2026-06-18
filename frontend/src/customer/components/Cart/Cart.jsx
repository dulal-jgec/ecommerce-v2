import React from "react";
import CartItem from "./CartItems.jsx";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems = [], updateQuantity, removeFromCart } = useCart();

    console.log("CART ITEMS =", cartItems);

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0,
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBagIcon className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBagIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-8">
              Add some products to continue shopping.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <CartItem
                  key={item?.id || index}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout/address")}
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-semibold transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
