// src/customer/components/HomeSection/HomeSection.jsx
import React from "react";
import HomeSectionCarousel from "./HomeSectionCarousel";
import { useNavigate } from "react-router-dom";

const HomeSection = ({
  title,
  subtitle,
  products,
  loading,
  onQuickView,
  onAddToCart,
  type,
}) => {
  const navigate = useNavigate();
  return (
    <section className="py-12 md:py-16 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              {subtitle}
            </p>
          )}
        </div>

        <button
          onClick={() => {
            console.log("TYPE =", type);

            navigate(`/products?type=${type}`);
          }}
        >
          View All
        </button>
      </div>

      <HomeSectionCarousel
        products={products}
        loading={loading}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};

export default HomeSection;
