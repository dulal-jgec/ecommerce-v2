// src/features/cart/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Tag,
  Loader,
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../../auth/hooks/useAuth";

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    items,
    totalItems,
    subtotal,
    total,
    loading,
    loadCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated]);

  const handleQuantityChange = async (cartItemId, currentQty, change) => {
    const newQty = Math.max(1, currentQty + change);
    if (newQty === currentQty) return;

    setUpdating(cartItemId);
    try {
      await updateQuantity(cartItemId, newQty);
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    if (window.confirm("Remove this item from cart?")) {
      await removeItem(cartItemId);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Clear all items from cart?")) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate("/checkout");
    }
  };

  // Empty Cart
  if (!loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mt-2">
              Start shopping to add items to your cart
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log("Cart Items:", items);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="p-2 hover:bg-gray-100 rounded-xl transition"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Shopping Cart
              </h1>
              <p className="text-sm text-gray-500">
                {totalItems} items in your cart
              </p>
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size={32} className="animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4"
                >
                  {/* Image */}
                  <img
                    src={item.imageUrl || "/images/placeholder.png"}
                    alt={item.productName}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <Link to={`/products/${item.productId}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition">
                        {item.productName}
                      </h3>
                    </Link>
                    {item.color && (
                      <p className="text-sm text-gray-500">
                        Color: {item.color}
                      </p>
                    )}
                    <p className="text-lg font-bold text-indigo-600 mt-1">
                      ₹{item.price?.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.cartItemId,
                            item.quantity,
                            -1,
                          )
                        }
                        disabled={
                          updating === item.cartItemId || item.quantity <= 1
                        }
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-medium w-8 text-center">
                        {updating === item.cartItemId ? "..." : item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.cartItemId,
                            item.quantity,
                            1,
                          )
                        }
                        disabled={updating === item.cartItemId}
                        className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() => handleRemoveItem(item.cartItemId)}
                        className="ml-auto p-2 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-800">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="text-gray-800">
                      ₹{subtotal?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-emerald-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                    <span className="text-gray-800">Total</span>
                    <span className="text-indigo-600">
                      ₹{total?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                  className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>

                <p className="text-xs text-gray-400 text-center mt-3">
                  Secure checkout • 100% encrypted
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
