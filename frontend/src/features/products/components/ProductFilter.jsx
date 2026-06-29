// src/features/products/components/ProductFilter.jsx
import { Search, X } from "lucide-react";

const ProductFilter = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          Category
        </label>
        <input
          type="text"
          placeholder="e.g. Electronics, Clothing..."
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,
              category: e.target.value,
            })
          }
          className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          Price Range
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({
                ...filters,
                minPrice: e.target.value,
              })
            }
            className="w-1/2 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({
                ...filters,
                maxPrice: e.target.value,
              })
            }
            className="w-1/2 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <button
        onClick={onSearch}
        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3.5 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilter;