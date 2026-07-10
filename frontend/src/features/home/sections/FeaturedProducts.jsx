// src/features/home/sections/FeaturedProducts.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Heart, Sparkles } from "lucide-react";
import { getFeaturedProducts } from "../../products/services/productService";
import AddToCartButton from "../../products/components/AddToCartButton";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await getFeaturedProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-2 bg-emerald-100/50 rounded-full animate-pulse">
            <span className="text-emerald-600 text-sm font-medium">Loading Featured Products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-xl">
              <Sparkles size={20} className="text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
              <p className="text-sm text-gray-500">Handpicked just for you</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/products?type=featured")}
            className="text-emerald-600 font-medium hover:text-emerald-700 transition flex items-center gap-1 group"
          >
            View All
            <span className="group-hover:translate-x-1 transition">→</span>
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const discount = product.originalPrice && product.originalPrice > product.price
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100/80 hover:border-yellow-300/80"
              >
                {/* Image - Clickable Link */}
                <Link to={`/products/${product.id}`}>
                  <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex justify-center items-center h-48 relative overflow-hidden cursor-pointer">
                    <img
                      src={product.images?.[0]?.imageUrl || "/images/product-placeholder.png"}
                      alt={product.name}
                      className="h-40 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white shadow-sm transition hover:shadow-md">
                      <Heart size={18} className="text-gray-400 hover:text-rose-500 transition" />
                    </button>

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm shadow-rose-200">
                        -{discount}%
                      </span>
                    )}

                    {/* Featured Badge */}
                    <span className="absolute top-3 left-3 bg-yellow-400 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm shadow-yellow-200 flex items-center gap-1">
                      <Sparkles size={10} />
                      Featured
                    </span>
                  </div>
                </Link>

                {/* Details */}
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 text-sm truncate group-hover:text-emerald-600 transition cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-600">
                      {product.averageRating ?? 0}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({product.totalReviews ?? 0})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-emerald-600">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <AddToCartButton
                    productId={product.id}
                    product={product}
                    color={product.images?.[0]?.color || "Default"}
                    variant="primary"
                    className="w-full mt-3"
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

export default FeaturedProducts;