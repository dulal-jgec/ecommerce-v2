// src/features/products/components/ProductCard.jsx
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // List View
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/80 hover:border-indigo-200">
        <div className="flex flex-col sm:flex-row">
          <Link
            to={`/products/${product.id}`}
            className="sm:w-56 h-56 bg-gray-50 flex-shrink-0"
          >
            <img
              src={product.images?.[0]?.imageUrl || "/images/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-contain p-6"
            />
          </Link>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition text-lg">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.averageRating || 0}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  {product.totalReviews || 0} reviews
                </span>
                <span className="text-gray-400">•</span>
                <span
                  className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <p className="text-gray-500 mt-3 line-clamp-2 text-sm">
                {product.description || "No description available"}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div>
                <span className="text-2xl font-bold text-gray-800">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-3">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="ml-3 bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-lg">
                    {discount}% OFF
                  </span>
                )}
              </div>
              <AddToCartButton productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/80 hover:border-indigo-200/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div className="relative h-64 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
          <img
            src={product.images?.[0]?.imageUrl || "/images/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 ${
              isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
          </button>

          {/* Quick View Overlay */}
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center transition-all duration-400 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link
              to={`/products/${product.id}`}
              className="bg-white text-gray-800 px-6 py-3 rounded-xl font-medium text-sm hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <Eye size={18} />
              Quick View
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {discount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                {discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                New
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition line-clamp-1 text-base">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1.5">
          <Star size={15} className="fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.averageRating || 0}</span>
          <span className="text-xs text-gray-400 ml-1">
            ({product.totalReviews || 0})
          </span>
        </div>

        <div className="flex items-center gap-2 mt-2.5">
          <span className="text-xl font-bold text-gray-800">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        <AddToCartButton 
        productId={product.id}
        color = {product.images?.[0]?.color || 'Default'}
         />
      </div>
    </div>
  );
};

export default ProductCard;