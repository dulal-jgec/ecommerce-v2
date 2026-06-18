"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useLocation } from "react-router-dom";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/20/solid";

import ProductCard from "../../components/Product/ProductCard";

import { sortOptions, filters } from "../../components/Product/FilterData";

import { useFilter } from "../../../utils/hooks/useFilter";

import {
  getProducts,
  getFeaturedProducts,
  getNewArrivalProducts,
  getBestSellerProducts,
  getTrendingProducts,
} from "../../../services/productService";

export default function Product() {


  const location = useLocation();

console.log("FULL URL =", location.pathname + location.search);
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  console.log("TYPE =", type);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let data = [];

        if (type === "featured") {
          data = await getFeaturedProducts();
        } else if (type === "new-arrivals") {
          data = await getNewArrivalProducts();
        } else if (type === "best-sellers") {
          data = await getBestSellerProducts();
        } else if (type === "trending") {
          data = await getTrendingProducts();
        } else {
          data = await getProducts();
        }

        console.log("PRODUCTS =", data);

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [type]);

  const {
    filteredProducts,
    selectedFilters,
    toggleFilter,
    clearAllFilters,
    priceRange,
    setPriceRange,
    selectedSort,
    setSelectedSort,
  } = useFilter(products, sortOptions[0]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[linear-gradient(to_bottom,var(--light-bg),#ecfdf5)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProducts.length} premium styles
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* SORT */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-x-2 bg-white border border-gray-200 hover:border-emerald-300 rounded-3xl px-6 py-3 text-sm font-medium">
                {selectedSort.name}
                <ChevronDownIcon className="w-4 h-4" />
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-xl border py-2 z-50">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    <button
                      onClick={() => setSelectedSort(option)}
                      className="block w-full px-6 py-3 text-left text-sm hover:bg-emerald-50"
                    >
                      {option.name}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            {/* MOBILE FILTER BTN */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-x-2 bg-white border rounded-3xl px-5 py-3 text-sm font-medium"
            >
              <FunnelIcon className="w-5 h-5" />
              Filter
            </button>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          {/* SIDEBAR */}
          <div className="hidden lg:block w-72">
            <div className="sticky top-6 bg-white border rounded-3xl p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FunnelIcon className="w-5 h-5 text-emerald-600" />
                  Filters
                </h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-500"
                >
                  Clear All
                </button>
              </div>

              {/* PRICE */}
              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <DisclosureButton className="flex justify-between w-full mb-3">
                      Price Range
                      {open ? (
                        <MinusIcon className="w-5 h-5" />
                      ) : (
                        <PlusIcon className="w-5 h-5" />
                      )}
                    </DisclosureButton>

                    <DisclosurePanel>
                      <input
                        type="range"
                        min="0"
                        max="100000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([0, Number(e.target.value)])
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm">
                        <span>₹0</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>

              {/* FILTERS */}
              {filters.map((section) => (
                <Disclosure key={section.id} defaultOpen>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full border-t py-6">
                        {section.name}
                        {open ? (
                          <MinusIcon className="w-5 h-5" />
                        ) : (
                          <PlusIcon className="w-5 h-5" />
                        )}
                      </DisclosureButton>

                      <DisclosurePanel className="space-y-4 pb-6">
                        {section.options.map((option) => (
                          <label key={option.value} className="flex gap-3">
                            <input
                              type="checkbox"
                              checked={selectedFilters[section.id]?.includes(
                                option.value,
                              )}
                              onChange={() =>
                                toggleFilter(section.id, option.value)
                              }
                            />
                            {option.label}
                          </label>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            {/* ✅ FILTER CHIPS */}
            {Object.values(selectedFilters).some((arr) => arr.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(selectedFilters).map(([key, values]) =>
                  values.map((val) => (
                    <div
                      key={`${key}-${val}`}
                      className="flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full"
                    >
                      <span>{val}</span>
                      <button onClick={() => toggleFilter(key, val)}>✕</button>
                    </div>
                  )),
                )}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE DRAWER */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/60" />

        <div className="fixed inset-0 flex justify-end">
          <DialogPanel className="w-full max-w-xs bg-white flex flex-col">
            <div className="p-6 border-b flex justify-between">
              <h2>Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {filters.map((section) => (
                <Disclosure key={section.id} defaultOpen>
                  <DisclosureButton>{section.name}</DisclosureButton>
                  <DisclosurePanel>
                    {section.options.map((option) => (
                      <label key={option.value} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFilters[section.id]?.includes(
                            option.value,
                          )}
                          onChange={() =>
                            toggleFilter(section.id, option.value)
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </div>

            {/* ✅ MOBILE BUTTONS */}
            <div className="border-t p-4 space-y-3">
              <button
                onClick={clearAllFilters}
                className="w-full border text-red-500 py-3 rounded-xl"
              >
                Clear All Filters
              </button>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
