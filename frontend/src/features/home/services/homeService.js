import apiClient from "../../../shared/services/apiClient";
import { REVIEW, BANNER ,PRODUCT } from "../../../shared/services/apiEndpoints";

export const getTestimonials = async () => {
  const response = await apiClient.get(REVIEW.TESTIMONIALS);
  return response.data.data;
};

export const getCategories = async () => {
  const response = await apiClient.get("/api/v1/categories");
  return response.data.data;
};

export const getActiveBanners = async () => {
  const response = await apiClient.get(BANNER.ACTIVE);
  return response.data.data;
};

export const getFlashSaleProducts = async () => {
  try {
    const response = await apiClient.get(PRODUCT.ALL);

    const products = response.data.data.content || [];

    return products
      .filter(product => product.stock > 0)
      .reverse()
      .slice(0, 6);          

  } catch (error) {
    console.error(error);
    return [];
  }
};