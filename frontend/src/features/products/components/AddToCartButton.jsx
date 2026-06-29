import React, { useState } from "react";
import { ShoppingCart, Loader, Check } from "lucide-react";
import { useCart } from "../../cart/hooks/useCart";

const AddToCartButton = ({
  productId,
  product,
  quantity = 1,
  color = null,
  variant = "primary",
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

      // if (product) {
      //   optimisticAdd({ ...product, color: finalColor });
      // }

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
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-emerald-600 hover:bg-emerald-700 text-white",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`
        w-full py-2.5 rounded-xl font-medium text-sm
        transition-all duration-300 flex items-center justify-center gap-2
        ${styles[variant] || styles.primary}
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"}
        ${success ? "bg-emerald-600 hover:bg-emerald-600" : ""}
      `}
    >
      {loading ? (
        <Loader size={16} className="animate-spin" />
      ) : success ? (
        <>
          <Check size={16} />
          Added!
        </>
      ) : (
        <>
          <ShoppingCart size={16} />
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
