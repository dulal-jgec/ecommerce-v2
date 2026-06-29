import apiClient from "../../../shared/services/apiClient";

import { PRODUCT } from "../../../shared/services/apiEndpoints";

export const getFeaturedProducts=async()=>{
  const response = await apiClient.get(PRODUCT.FEATURED);
  return response.data;
}

export const getBestSellerProducts = async()=>{
  const response = await apiClient.get(PRODUCT.BEST_SELLERS);
  return response.data;
}

export const getNewArrivalProducts = async () => {
  const response = await apiClient.get(PRODUCT.NEW_ARRIVALS);
  return response.data;
};

export const getTrendingProducts = async () => {
  const response = await apiClient.get(PRODUCT.TRENDING);
  return response.data;
};

export const getAllProducts = async (page = 0 , size = 12)=>{
  const response = await apiClient.get(
     `/api/v1/products?page=${page}&size=${size}`
  );
  return response.data;
}

export const getProductById = async (id) => {

    const response = await apiClient.get(
        `/api/v1/products/${id}`
    );

    return response.data.data;
};

export const getProductReviews = async (productId) => {

    const response = await apiClient.get(
        `/api/v1/reviews/products/${productId}`
    );

    return response.data.data;
};



export const searchProducts = async ({
    category,
    minPrice,
    maxPrice,
    page = 0,
    size = 12,
    sortBy,
}) => {

    let direction = "asc";
    let sort = "";

    if (sortBy === "price-asc") {
        sort = "price";
    } else if (sortBy === "price-desc") {
        sort = "price";
        direction = "desc";
    } else if (sortBy === "name-asc") {
        sort = "name";
    } else if (sortBy === "name-desc") {
        sort = "name";
        direction = "desc";
    }

    const response = await apiClient.get(
        "/api/v1/products/search",
        {
            params: {
                category,
                minPrice,
                maxPrice,
                page,
                size,
                sortBy: sort,
                direction,
            },
        }
    );

    return response.data.data;
};