// src/features/products/components/ProductInfo.jsx
import { useState } from "react";
import { Heart, Star, Minus, Plus, Truck, RefreshCw, Shield } from "lucide-react";
import AddToCartButton from "./AddToCartButton";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : 0;

  return (
    <div className="space-y-5">
      {/* Category Badge */}
      <span className="inline-block bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-1 rounded-full">
        {product.category || "General"}
      </span>

      {/* Name */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
        {product.name}
      </h1>

      {/* Seller */}
      <p className="text-sm text-gray-500">
        Sold by <span className="text-gray-700 font-medium">{product.seller || "ShopLy"}</span>
      </p>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star size={18} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-lg">{product.averageRating || 0}</span>
        </div>
        <span className="text-gray-400">|</span>
        <span className="text-gray-500">{product.totalReviews || 0} Reviews</span>
        <span className="text-gray-400">|</span>
        <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
          {product.stock > 0 ? "✓ In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold text-indigo-600">
          ₹{product.price?.toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-lg text-gray-400 line-through">
            ₹{product.originalPrice?.toLocaleString()}
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white text-sm font-bold px-2.5 py-1 rounded-lg">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
        {product.description || "No description available."}
      </p>

      {/* Quantity */}
      <div className="flex items-center gap-4 pt-2">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-50 transition"
          >
            <Minus size={16} />
          </button>
          <span className="px-5 py-2 text-sm font-medium min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-gray-50 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        <AddToCartButton productId={product.id} />
        <button className="px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center gap-2">
          <Heart size={18} className="text-gray-600" />
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;