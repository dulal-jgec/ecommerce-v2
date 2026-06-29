// src/features/home/sections/BestSellers.jsx
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { getBestSellerProducts } from "../../products/services/productService";
import { useNavigate } from "react-router-dom";

const BestSellers = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getBestSellerProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading best sellers:", error);
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
          <div className="animate-pulse">Loading Best Sellers...</div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          No best sellers available.
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">⭐ Best Sellers</h2>
          <button
            onClick={() => navigate("/products?type=best-sellers")}
            className="text-blue-600 font-medium hover:text-blue-700 transition"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 text-center cursor-pointer group hover:-translate-y-1"
            >
              <div className="bg-gray-100 rounded-xl p-4 flex justify-center h-32">
                <img
                  src={
                    product.images?.[0]?.imageUrl || "/images/placeholder.png"
                  }
                  alt={product.name}
                  className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-sm mt-3 truncate">
                {product.name}
              </h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">
                  {product.averageRating || 0}
                </span>
              </div>
              <p className="text-blue-600 font-bold mt-1">
                ₹{product.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
