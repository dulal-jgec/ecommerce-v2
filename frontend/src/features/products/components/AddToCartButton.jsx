// src/features/products/components/AddToCartButton.jsx
import React, { useState } from "react";
import { ShoppingCart, Loader, Check } from "lucide-react";
import { useCart } from "../../cart/hooks/useCart";

const AddToCartButton = ({
  productId,
  product,
  quantity = 1,
  color = null,
  variant = "primary",
  className = "",
}) => {
  const { addToCart, optimisticAdd } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setLoading(true);
    setSuccess(false);

    try {
      const finalColor = color || "Default";

      if (product) {
        optimisticAdd({ ...product, color: finalColor });
      }

      await addToCart(productId, quantity, finalColor);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-200",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
    success: "bg-emerald-600 text-white",
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`
        py-2.5 px-4 rounded-xl font-medium text-sm
        transition-all duration-300 flex items-center justify-center gap-2
        ${success ? styles.success : styles[variant] || styles.primary}
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-emerald-200"}
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader size={16} className="animate-spin" />
          <span>Adding...</span>
        </>
      ) : success ? (
        <>
          <Check size={16} />
          <span>Added!</span>
        </>
      ) : (
        <>
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;