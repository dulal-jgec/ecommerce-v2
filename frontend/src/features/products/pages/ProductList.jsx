// src/features/products/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Grid3x3, List, ChevronLeft, ChevronRight, X } from "lucide-react";

import ProductGrid from "../components/ProductGrid";
import ProductFilter from "../components/ProductFilter";
import ProductSort from "../components/ProductSort";
import { getAllProducts, searchProducts } from "../services/productService";
import {
  getFeaturedProducts,
  getBestSellerProducts,
  getNewArrivalProducts,
  getTrendingProducts,
} from "../../products/services/productService";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);

      if (type === "featured") {
        const data = await getFeaturedProducts();
        setProducts(data);
        setTotalPages(1);
        return;
      }

      if (type === "best-sellers") {
        const data = await getBestSellerProducts();
        setProducts(data);
        setTotalPages(1);
        return;
      }

      if (type === "new-arrivals") {
        const data = await getNewArrivalProducts();
        setProducts(data);
        setTotalPages(1);
        return;
      }

      if (type === "trending") {
        const data = await getTrendingProducts();
        setProducts(data);
        setTotalPages(1);
        return;
      }

      if (filters.category || filters.minPrice || filters.maxPrice || sortBy) {
        const response = await searchProducts({
          ...filters,
          page,
          size: 12,
          sortBy,
        });
        setProducts(response.content || []);
        setTotalPages(response.totalPages || 0);
      } else {
        const response = await getAllProducts(page, 12);
        setProducts(response.content || []);
        setTotalPages(response.totalPages || 0);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            {type
              ? type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")
              : "Shop All Products"}
          </h1>
          <p className="text-indigo-100 mt-2 text-lg">
            {products.length} products available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filter Bar - Glass Effect */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-4 md:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-sm"
              />
              <button
                onClick={loadProducts}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Search
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="lg:hidden flex items-center gap-2 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
              >
                <Filter size={18} />
                Filters
              </button>

              <div className="hidden sm:flex bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 px-4 transition ${
                    viewMode === "grid"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 px-4 transition ${
                    viewMode === "list"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>

              <ProductSort sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>

          {/* Active Filters */}
          {(filters.category || filters.minPrice || filters.maxPrice) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">Active Filters:</span>
              {filters.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                  {filters.category}
                  <button
                    onClick={() => setFilters({ ...filters, category: "" })}
                    className="hover:text-indigo-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {filters.minPrice && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                  Min: ₹{filters.minPrice}
                  <button
                    onClick={() => setFilters({ ...filters, minPrice: "" })}
                    className="hover:text-indigo-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {filters.maxPrice && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full">
                  Max: ₹{filters.maxPrice}
                  <button
                    onClick={() => setFilters({ ...filters, maxPrice: "" })}
                    className="hover:text-indigo-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              <button
                onClick={() =>
                  setFilters({ search: "", category: "", minPrice: "", maxPrice: "" })
                }
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filter Sidebar */}
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowMobileFilter(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <ProductFilter
                filters={filters}
                setFilters={setFilters}
                onSearch={() => {
                  loadProducts();
                  setShowMobileFilter(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Products */}
        <ProductGrid
          products={products}
          loading={loading}
          viewMode={viewMode}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12 pb-8">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                let pageNum = i;
                if (totalPages > 5 && page > 2) {
                  pageNum = page - 2 + i;
                }
                if (pageNum >= totalPages) return null;
                return (
                  <button
                    key={i}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-xl font-medium transition ${
                      page === pageNum
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "border border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
            </div>

            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;