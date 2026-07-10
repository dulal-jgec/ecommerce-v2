// src/features/products/components/ProductGrid.jsx
import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, loading, viewMode = "grid" }) => {
  if (loading) {
    return (
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`animate-pulse bg-gray-100 rounded-2xl border border-gray-200 ${
              viewMode === "grid" ? "h-96" : "h-48"
            }`}
          >
            <div className="h-full bg-gray-200 rounded-2xl"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🌿</div>
        <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
        <p className="text-gray-400 mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          : "space-y-4"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default ProductGrid;