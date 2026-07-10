// src/features/products/components/ProductFilter.jsx
import React from "react";
import { Search, RotateCcw } from "lucide-react";

const ProductFilter = ({ filters, setFilters, onSearch }) => {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
      outOfStock: false,
      featured: false,
      trending: false,
      bestSeller: false,
      newArrival: false,
      minRating: 0,
      discount: 0,
    });
    if (onSearch) onSearch();
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
          Search
        </label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
          Category
        </label>
        <input
          type="text"
          placeholder="Electronics..."
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition"
        />
      </div>

      {/* Price */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
          Availability
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => updateFilter("inStock", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            In Stock
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={filters.outOfStock}
              onChange={(e) => updateFilter("outOfStock", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            Out of Stock
          </label>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
          Tags
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => updateFilter("featured", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            Featured
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={filters.trending}
              onChange={(e) => updateFilter("trending", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            Trending
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={filters.bestSeller}
              onChange={(e) => updateFilter("bestSeller", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            Best Seller
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={filters.newArrival}
              onChange={(e) => updateFilter("newArrival", e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />
            New Arrival
          </label>
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
          Min Rating
        </label>
        <select
          value={filters.minRating}
          onChange={(e) => updateFilter("minRating", Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition"
        >
          <option value={0}>All</option>
          <option value={4}>4★ & Above</option>
          <option value={3}>3★ & Above</option>
          <option value={2}>2★ & Above</option>
        </select>
      </div>

      {/* Discount */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1.5">
          Min Discount
        </label>
        <select
          value={filters.discount}
          onChange={(e) => updateFilter("discount", Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none text-sm transition"
        >
          <option value={0}>All</option>
          <option value={10}>10%+</option>
          <option value={20}>20%+</option>
          <option value={30}>30%+</option>
          <option value={40}>40%+</option>
          <option value={50}>50%+</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pt-2">
        <button
          onClick={onSearch}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium text-sm transition shadow-sm shadow-emerald-200"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm text-gray-600 flex items-center justify-center gap-2"
        >
          <RotateCcw size={14} />
          Clear
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;