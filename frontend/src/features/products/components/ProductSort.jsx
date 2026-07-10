// src/features/products/components/ProductSort.jsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const ProductSort = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Best Rating" },
    { value: "popularity", label: "Popularity" },
    { value: "discount", label: "Highest Discount" },
  ];

  const currentLabel = options.find((o) => o.value === sortBy)?.label || "Name: A to Z";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition min-w-[140px] justify-between"
      >
        <span className="text-gray-700 truncate">{currentLabel}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 text-sm transition ${
                sortBy === option.value
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSort;