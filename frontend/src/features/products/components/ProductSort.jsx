// src/features/products/components/ProductSort.jsx
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ProductSort = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "", label: "Sort By" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  const currentLabel = options.find((o) => o.value === sortBy)?.label || "Sort By";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition min-w-[160px] justify-between"
      >
        <span className="text-gray-700">{currentLabel}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition ${
                sortBy === option.value
                  ? "text-indigo-600 font-medium bg-indigo-50"
                  : "text-gray-700"
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