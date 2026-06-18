// src/customer/components/HomeSection/HomeCard.jsx
import React, { useState } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";

import { useNavigate } from "react-router-dom";

const HomeCard = ({ product, onQuickView, onAddToCart }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={
            product.images?.[0]?.imageUrl
              ? `http://localhost:5454${product.images[0].imageUrl}`
              : "https://via.placeholder.com/400"
          }
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Quick Actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transform transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
              className="flex-1 bg-white text-gray-900 py-2 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add To Cart
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
              className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-black/70 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Brand */}
        {/* {product.brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {product.brand}
          </p>
        )} */}

        {/* Title */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Rating
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount || 0})
            </span>
          </div>
        )} */}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.price?.toLocaleString("en-IN")}
              </span>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader
export const HomeCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-4 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

export default HomeCard;
