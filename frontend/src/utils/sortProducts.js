export const sortProducts = (products, sortOption) => {
  const result = [...products]; // copy array

  switch (sortOption.name) {
    case "Price: Low to High":
      return result.sort((a, b) => a.price - b.price);

    case "Price: High to Low":
      return result.sort((a, b) => b.price - a.price);

    case "Newest First":
      return result.sort((a, b) => b.id - a.id);

    default:
      return result;
  }
};