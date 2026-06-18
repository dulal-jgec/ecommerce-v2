// FilterData.js
export const sortOptions = [
  { name: "Most Popular", current: true },
  { name: "Best Rating", current: false },
  { name: "Newest First", current: false },
  { name: "Price: Low to High", current: false },
  { name: "Price: High to Low", current: false },
];

export const subCategories = [
  { name: "Pathani Kurtas" },
  { name: "Embroidered Kurtas" },
  { name: "Linen Kurtas" },
  { name: "Silk Kurtas" },
  { name: "Festive Collection" },
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", color: "#f8f1e3" },
      { value: "beige", label: "Beige", color: "#d4c3aa" },
      { value: "blue", label: "Royal Blue", color: "#1e3a8a" },
      { value: "black", label: "Black", color: "#1f2937" },
      { value: "green", label: "Olive Green", color: "#166534" },
      { value: "mustard", label: "Mustard", color: "#ca8a04" },
    ],
  },
  {
    id: "category",
    name: "Style",
    options: [
      { value: "pathani", label: "Pathani" },
      { value: "embroidered", label: "Embroidered" },
      { value: "linen", label: "Linen" },
      { value: "silk", label: "Silk" },
      { value: "chikankari", label: "Chikankari" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
      { value: "XXL", label: "XXL" },
    ],
  },
  {
    id: "price",
    name: "Price Range",
    options: [
      { value: "0-999", label: "Under ₹999" },
      { value: "1000-1999", label: "₹1000 - ₹1999" },
      { value: "2000-2999", label: "₹2000 - ₹2999" },
      { value: "3000+", label: "₹3000 & Above" },
    ],
  },
];