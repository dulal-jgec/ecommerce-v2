import apiClient from "../../../shared/services/apiClient";
import { PRODUCT } from "../../../shared/services/apiEndpoints";


export const getMyProducts = async () => {
  const response = await apiClient.get(PRODUCT.MY_PRODUCTS);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await apiClient.post(PRODUCT.CREATE, productData);
  return response.data;
};
export const getProductById = async (id) => {
  const response = await apiClient.get(PRODUCT.DETAILS(id));
  return response.data.data;
};

export const updateProduct = async (id, productData) => {
  const response = await apiClient.put(
    PRODUCT.UPDATE(id),
    productData
  );

  return response.data.data;
};

export const uploadProductImage = async (productId, formData) => {
  const response = await apiClient.post(
    PRODUCT.IMAGES(productId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const getVariants = async (productId) => {
  const response = await apiClient.get(
    PRODUCT.VARIANTS(productId)
  );

  return response.data.data;
};

export const addVariant = async (productId, variantData) => {
  const response = await apiClient.post(
    PRODUCT.VARIANTS(productId),
    variantData
  );

  return response.data.data;
};
export const setMainImage = async (imageId) => {
  const response = await apiClient.patch(
    PRODUCT.SET_MAIN_IMAGE(imageId)
  );

  return response.data.data;
};
export const deleteProductImage = async (imageId) => {
  await apiClient.delete(PRODUCT.DELETE_IMAGE(imageId));
};