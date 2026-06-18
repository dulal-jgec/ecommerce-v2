import { filters } from "../customer/components/Product/FilterData"
import Product from "../customer/components/Product/Product"
export const filterProducts = (products, filters, priceRange) => {
  return products.filter((product) => {

    // COLOR FILTER
    const matchColor =
      filters.color.length === 0 ||
      filters.color.includes(product.color);

    // CATEGORY FILTER
    const matchCategory =
      filters.category.length === 0 ||
      filters.category.includes(product.category);

    // SIZE FILTER
    const matchSize =
      filters.size.length === 0 ||
      filters.size.includes(product.size);

    // PRICE SLIDER
    const matchPriceRange =
      product.price >= priceRange[0] &&
      product.price <= priceRange[1];

    // PRICE CHECKBOX FILTER
    let matchPriceOption = true;

    if (filters.price.length) {
      matchPriceOption = filters.price.some((range) => {
        if (range === "0-999")
          return product.price <= 999;

        if (range === "1000-1999")
          return product.price >= 1000 &&
                 product.price <= 1999;

        if (range === "2000-2999")
          return product.price >= 2000 &&
                 product.price <= 2999;

        if (range === "3000+")
          return product.price >= 3000;

        return false;
      });
    }

    return (
      matchColor &&
      matchCategory &&
      matchSize &&
      matchPriceRange &&
      matchPriceOption
    );
  });
};