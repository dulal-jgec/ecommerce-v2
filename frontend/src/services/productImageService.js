import api from "./api";

// Upload single image
export const uploadProductImage = async (productId, color, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    `/products/${productId}/images?color=${encodeURIComponent(color)}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Upload multiple images at once
export const uploadMultipleProductImages = async (productId, images) => {
  const formData = new FormData();
  
  images.forEach(({ color, file }) => {
    formData.append("files", file);
    formData.append("colors", color);
  });

  const response = await api.post(
    `/products/${productId}/images/batch`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get all images for a product
export const getProductImages = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
};

// Delete an image
export const deleteProductImage = async (productId, imageId) => {
  try {
    const response = await api.delete(`/products/${productId}/images/${imageId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};