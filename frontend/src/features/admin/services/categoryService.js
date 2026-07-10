import apiClient from "../../../shared/services/apiClient";
import { CATEGORY } from "../../../shared/services/apiEndpoints";

export const getCategories = async () => {
  const response = await apiClient.get(CATEGORY.ALL);
  return response.data.data;
};

export const createCategory = async (formData) => {
  const response = await apiClient.post(
    CATEGORY.CREATE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};