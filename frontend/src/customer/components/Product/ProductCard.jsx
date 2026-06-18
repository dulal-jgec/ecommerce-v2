import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group"
    >
      <div className="h-[220px] overflow-hidden">
        <img
          src={
            product.images?.length > 0
              ? `https://ecommerce-v2-backend-g92n.onrender.com${product.images[0].imageUrl}`
              : "/placeholder.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-3">
          <span style={{ color: "var(--primary-green)" }} className="font-bold">
            ₹{product.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                quantity: 1,
              });
            }}
            style={{ backgroundColor: "var(--primary-green)" }}
            className="text-xs px-3 py-1.5 rounded-full text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;