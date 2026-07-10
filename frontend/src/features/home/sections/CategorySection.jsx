// src/features/home/sections/CategorySection.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/homeService";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-5 md:py-7 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse text-gray-400">
            Loading Categories...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 md:py-7 bg-white">
      {" "}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Top Categories
          </h2>
          <Link
            to="/products"
            className="text-emerald-600 font-medium hover:text-emerald-700 transition text-sm"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category.name}`}
              className="group flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-sm">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-[11px] font-semibold text-gray-700 text-center group-hover:text-emerald-600 transition">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
