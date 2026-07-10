// src/features/products/components/ProductInfo.jsx
import { useState } from "react";
import { Heart, Star, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      <span className="inline-block bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-1 rounded-full border border-emerald-200">
        {product.category || "General"}
      </span>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      <p className="text-gray-500 text-sm">
        Sold by <span className="text-emerald-600 font-medium">{product.seller || "ShopLy"}</span>
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star size={18} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-lg text-gray-800">{product.averageRating || 0}</span>
        </div>
        <span className="text-gray-300">|</span>
        <span className="text-gray-500">{product.totalReviews || 0} Reviews</span>
        <span className="text-gray-300">|</span>
        <span className={`text-sm font-medium ${product.stock > 0 ? "text-emerald-600" : "text-rose-500"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-emerald-600">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-rose-500 text-white text-sm font-bold px-2.5 py-1 rounded-full shadow-sm shadow-rose-200">
              {discount}% OFF
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
      </div>

      <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
        {product.description || "No description available."}
      </p>

      <div className="flex items-center gap-4 pt-2">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-50 transition text-gray-600"
          >
            <Minus size={16} />
          </button>
          <span className="px-5 py-2 text-sm font-medium min-w-[40px] text-center text-gray-800">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-gray-50 transition text-gray-600"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <AddToCartButton productId={product.id} />
        <button className="px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600 hover:text-emerald-600 flex items-center gap-2">
          <Heart size={18} className="text-gray-400" />
          Wishlist
        </button>
      </div>
    </motion.div>
  );
};

export default ProductInfo;