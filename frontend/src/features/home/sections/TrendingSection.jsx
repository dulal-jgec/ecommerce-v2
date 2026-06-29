// src/features/home/sections/TrendingSection.jsx
import React, { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { getTrendingProducts } from "../../products/services/productService";

const TrendingSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getTrendingProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading trending:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading Trending Products...</div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📈 Trending Now</h2>
          <button
            onClick={() => navigate("/products?type=trending")}
            className="text-blue-600 font-medium hover:text-blue-700 transition"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="bg-gray-100 p-6 flex justify-center items-center h-48">
                <img
                  src={
                    product.images?.[0]?.imageUrl || "/images/placeholder.png"
                  }
                  alt={product.name}
                  className="h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-gray-800">
                    ₹{product.price?.toLocaleString()}
                  </span>
                </div>
                <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
