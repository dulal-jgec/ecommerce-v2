import { useMemo, useState, useEffect } from "react";
import { filterProducts } from "../filterProducts";
import { sortProducts } from "../sortProducts";
import { useSearchParams, useNavigate } from "react-router-dom";

export const useFilter = (products, defaultSort) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    category: [],
    size: [],
    price: [],
  });

 const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedSort, setSelectedSort] = useState(defaultSort);

  
useEffect(() => {
  const params = new URLSearchParams(searchParams);

  Object.entries(selectedFilters).forEach(([key, values]) => {
    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }
  });

  if (selectedSort?.name) {
    params.set("sort", selectedSort.name);
  }

  navigate(`?${params.toString()}`, {
    replace: true,
  });
}, [selectedFilters, selectedSort]);


useEffect(() => {
  const sortFromURL = searchParams.get("sort");

  const newFilters = {
    color: searchParams.get("color")?.split(",") || [],
    category: searchParams.get("category")?.split(",") || [],
    size: searchParams.get("size")?.split(",") || [],
    price: searchParams.get("price")?.split(",") || [],
  };

  setSelectedFilters(newFilters);

   
  if (sortFromURL) {
    setSelectedSort({ name: sortFromURL });
  }
}, []);

  const clearAllFilters = () => {
    setSelectedFilters({
      color: [],
      category: [],
      size: [],
      price: [],
    });
    setPriceRange([0, 100000]);
  };

  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, selectedFilters, priceRange);
    result = sortProducts(result, selectedSort);
    return result;
  }, [products, selectedFilters, priceRange, selectedSort]);


const toggleFilter = (sectionId, value) => {
  setSelectedFilters(prev => ({
    ...prev,
    [sectionId]: prev[sectionId].includes(value)
      ? prev[sectionId].filter(v => v !== value)
      : [...prev[sectionId], value]
  }));
};

  return {
    filteredProducts,
    selectedFilters,
    toggleFilter,
    clearAllFilters,
    priceRange,
    setPriceRange,
    selectedSort,
    setSelectedSort,
  };
};