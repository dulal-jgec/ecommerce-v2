import apiClient from "../../../shared/services/apiClient";
import { REVIEW } from "../../../shared/services/apiEndpoints";

export const getTestimonials = async () => {
    const response = await apiClient.get(REVIEW.TESTIMONIALS);
    return response.data.data;
};

export const getCategories = async () => {
  const response = await apiClient.get("/api/v1/categories");
  return response.data.data;
};

