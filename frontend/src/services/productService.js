import api from "./api";

// =============================
// PRODUCT CRUD
// =============================

export const getProducts = async (
  page = 0,
  size = 20
) => {
  const response = await api.get(
    `/products?page=${page}&size=${size}`
  );

  return response.data.data.content;
};

export const getProductById = async (id) => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data.data;
};

export const createProduct = async (
  productData
) => {
  const response = await api.post(
    "/products",
    productData
  );

  return response.data;
};

export const updateProduct = async (
  id,
  productData
) => {
  const response = await api.put(
    `/products/${id}`,
    productData
  );

  return response.data;
};

export const deleteProduct = async (
  id
) => {
  const response = await api.delete(
    `/products/${id}`
  );

  return response.data;
};

// =============================
// HOME PAGE SECTIONS
// =============================

export const getFeaturedProducts =
  async () => {
    const res = await api.get(
      "/products/featured"
    );

    return res.data;
  };

export const getNewArrivalProducts =
  async () => {
    const res = await api.get(
      "/products/new-arrivals"
    );

    return res.data;
  };

export const getBestSellerProducts =
  async () => {
    const res = await api.get(
      "/products/best-sellers"
    );

    return res.data;
  };

export const getTrendingProducts =
  async () => {
    const res = await api.get(
      "/products/trending"
    );

    return res.data;
  };

  export const getMyProducts = async () => {
  const response = await api.get(
    "/products/my-products"
  );

  return response.data;
};