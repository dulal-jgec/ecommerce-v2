// src/features/home/sections/FlashSale.jsx
import React, { useState, useEffect } from "react";
import { Clock, ShoppingCart, Star, Zap } from "lucide-react";
import { getFlashSaleProducts } from "../services/homeService";
import { Link } from "react-router-dom";

const FlashSale = () => {
  const [flashProducts, setFlashProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 12; minutes = 0; seconds = 0; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getFlashSaleProducts();
      setFlashProducts(data);
    } catch (error) {
      console.error("Error loading flash sale:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (value) => String(value).padStart(2, "0");

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  if (flashProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-200">
                <Zap size={20} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Flash Sale</h2>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <Clock size={16} className="text-emerald-600" />
              <div className="flex items-center gap-1 text-sm font-bold text-emerald-700">
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">
                  {formatTime(timeLeft.hours)}
                </span>
                <span>:</span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span>:</span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/products?type=flash-sale"
            className="text-emerald-600 font-medium hover:text-emerald-700 transition flex items-center gap-1 group"
          >
            See All Deals
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {flashProducts.slice(0, 6).map((product) => {
            const discount = product.originalPrice && product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-emerald-200"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative h-44 bg-gray-50 overflow-hidden">
                    <img
                      src={product.images?.[0]?.imageUrl || "/images/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                        -{discount}%
                      </span>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
                        Only {product.stock} left
                      </span>
                    )}
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-1 group-hover:text-emerald-600 transition">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-600">
                        {product.averageRating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.totalReviews || 0})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-emerald-600">
                      ₹{product.price?.toLocaleString() || 0}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;