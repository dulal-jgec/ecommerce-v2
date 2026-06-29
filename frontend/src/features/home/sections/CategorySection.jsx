// src/features/home/sections/CategorySection.jsx
import React, { useEffect, useState } from "react";
import {
  Smartphone,
  Laptop,
  Watch,
  Headphones,
  Shirt,
  ShoppingBag,
  Home,
  Gamepad2,
  Camera,
  Tv,
  Volume2, // ← Speakers এর পরিবর্তে Volume2
  Cpu,
} from "lucide-react";

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
      <section className="py-12 text-center">Loading Categories...</section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Top Categories
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="group flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className="p-3 rounded-xl bg-gray-100 shadow">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center group-hover:text-blue-600 transition">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
