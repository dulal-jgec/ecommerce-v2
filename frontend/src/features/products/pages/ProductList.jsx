// src/features/products/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Filter,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

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
    inStock: false,
    outOfStock: false,
    featured: false,
    trending: false,
    bestSeller: false,
    newArrival: false,
    minRating: 0,
    discount: 0,
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
        setLoading(false);
        return;
      }
      if (type === "best-sellers") {
        const data = await getBestSellerProducts();
        setProducts(data);
        setTotalPages(1);
        setLoading(false);
        return;
      }
      if (type === "new-arrivals") {
        const data = await getNewArrivalProducts();
        setProducts(data);
        setTotalPages(1);
        setLoading(false);
        return;
      }
      if (type === "trending") {
        const data = await getTrendingProducts();
        setProducts(data);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      const hasBackendFilter =
        filters.search ||
        filters.category ||
        filters.minPrice ||
        filters.maxPrice ||
        sortBy;

      let response;

      if (hasBackendFilter) {
        response = await searchProducts({
          ...filters,
          page,
          size: 12,
          sortBy,
        });
      } else {
        response = await getAllProducts(page, 12);
      }

      let filteredProducts = response.content || [];

      if (filters.inStock) {
        filteredProducts = filteredProducts.filter((p) => p.stock > 0);
      }
      if (filters.outOfStock) {
        filteredProducts = filteredProducts.filter((p) => p.stock === 0);
      }
      if (filters.featured) {
        filteredProducts = filteredProducts.filter((p) => p.featured === true);
      }
      if (filters.trending) {
        filteredProducts = filteredProducts.filter((p) => p.trending === true);
      }
      if (filters.bestSeller) {
        filteredProducts = filteredProducts.filter(
          (p) => p.bestSeller === true
        );
      }
      if (filters.newArrival) {
        filteredProducts = filteredProducts.filter(
          (p) => p.newArrival === true
        );
      }
      if (filters.minRating > 0) {
        filteredProducts = filteredProducts.filter(
          (p) => (p.averageRating || 0) >= filters.minRating
        );
      }
      if (filters.discount > 0) {
        filteredProducts = filteredProducts.filter(
          (p) => (p.discount || 0) >= filters.discount
        );
      }

      setProducts(filteredProducts);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, sortBy, type]);

  const applyFilters = () => {
    setPage(0);
    loadProducts();
  };

  const clearAllFilters = () => {
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
    setPage(0);
    setTimeout(() => loadProducts(), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold">
            {type
              ? type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")
              : "All Products"}
          </h1>
          <p className="text-emerald-100 mt-2 text-sm md:text-lg">
            {products.length} products available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* ===== MOBILE TOP BAR ===== */}
        <div className="flex items-center justify-between gap-3 mb-4 lg:hidden">
          <button
            onClick={() => setShowMobileFilter(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium"
          >
            <Filter size={16} />
            Filters
          </button>
          <ProductSort sortBy={sortBy} setSortBy={setSortBy} />
          <div className="flex bg-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 px-3 transition ${
                viewMode === "grid"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 px-3 transition ${
                viewMode === "list"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* LEFT SIDEBAR - FILTERS (Desktop Only) */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-rose-500 hover:text-rose-600 font-medium"
                >
                  Clear All
                </button>
              </div>
              <ProductFilter
                filters={filters}
                setFilters={setFilters}
                onSearch={applyFilters}
              />
            </div>
          </div>

          {/* RIGHT - PRODUCTS */}
          <div className="flex-1 min-w-0">
            {/* Desktop Top Bar */}
            <div className="hidden lg:flex items-center justify-between gap-3 mb-6">
              <ProductSort sortBy={sortBy} setSortBy={setSortBy} />
              <div className="flex items-center gap-2">
                <div className="flex bg-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 px-3 transition ${
                      viewMode === "grid"
                        ? "bg-emerald-600 text-white"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 px-3 transition ${
                      viewMode === "list"
                        ? "bg-emerald-600 text-white"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <ProductGrid products={products} loading={loading} viewMode={viewMode} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10 pb-4">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  className="px-5 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition text-sm"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages - 1}
                  onClick={() => setPage(page + 1)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MOBILE FILTER SIDEBAR ===== */}
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
                setPage(0);
                loadProducts();
                setShowMobileFilter(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;