import apiClient from "../../../shared/services/apiClient";
import { REVIEW } from "../../../shared/services/apiEndpoints";

export const getTestimonials = async () => {
    const response = await apiClient.get(REVIEW.TESTIMONIALS);
    return response.data.data;
};

