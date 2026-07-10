// src/features/home/sections/BestSellers.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Award } from "lucide-react";
import { getBestSellerProducts } from "../../products/services/productService";
import AddToCartButton from "../../products/components/AddToCartButton";

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
          <div className="inline-block px-4 py-2 bg-amber-50/50 rounded-full animate-pulse">
            <span className="text-amber-600 text-sm font-medium">Loading Best Sellers...</span>
          </div>
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Award size={20} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Best Sellers</h2>
              <p className="text-sm text-gray-500">Most loved by customers</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/products?type=best-sellers")}
            className="text-amber-600 font-medium hover:text-amber-700 transition flex items-center gap-1 group"
          >
            View All
            <span className="group-hover:translate-x-1 transition">→</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product) => {
            const discount = product.originalPrice && product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-gray-50 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100/80 hover:border-amber-200/80"
              >
                {/* Image - Clickable Link */}
                <Link to={`/products/${product.id}`}>
                  <div className="bg-gray-100 rounded-xl p-4 flex justify-center h-32 relative overflow-hidden cursor-pointer">
                    <img
                      src={product.images?.[0]?.imageUrl || "/images/placeholder.png"}
                      alt={product.name}
                      className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-rose-200">
                        -{discount}%
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-amber-200 flex items-center gap-1">
                      <Award size={10} />
                      Top
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="mt-3 text-center">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-sm text-gray-800 truncate group-hover:text-amber-600 transition cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-600">
                      {product.averageRating || 0}
                    </span>
                  </div>
                  <p className="text-amber-600 font-bold mt-1">
                    ₹{product.price?.toLocaleString()}
                  </p>
                  <AddToCartButton
                    productId={product.id}
                    product={product}
                    color={product.images?.[0]?.color || "Default"}
                    variant="secondary"
                    className="w-full mt-2 text-xs py-1.5"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;