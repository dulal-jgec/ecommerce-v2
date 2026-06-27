import apiClient from "../../../shared/services/apiClient";

import { PRODUCT } from "../../../shared/services/apiEndpoints";

export const getFeaturedProducts=async()=>{
  const response = await apiClient.get(PRODUCT.FEATURED);
  return response.data.data;
}

export const getBestSellerProducts = async()=>{
  const response = await apiClient.get(PRODUCT.BEST_SELLERS);
  return response.data.data;
}

export const getNewArrivalProducts = async () => {
  const response = await apiClient.get(PRODUCT.NEW_ARRIVALS);
  return response.data.data;
};

export const getTrendingProducts = async () => {
  const response = await apiClient.get(PRODUCT.TRENDING);
  return response.data.data;
};