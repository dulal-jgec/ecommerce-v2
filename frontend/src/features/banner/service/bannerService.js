import apiClient from "../../../shared/services/apiClient";
import { BANNER } from "../../../shared/services/apiEndpoints";

export const getActiveBanners = async () => {
  const response = await apiClient.get(BANNER.ACTIVE);
  return response.data.data;
};

export const getAllBanners = async () => {
  const response = await apiClient.get(BANNER.ADMIN_ALL);
  return response.data.data;
};

export const getBanner = async (id) => {
  const response = await apiClient.get(BANNER.ADMIN_DETAILS(id));
  return response.data.data;
};

export const createBanner = async (banner) => {
  const response = await apiClient.post(BANNER.CREATE, banner);
  return response.data.data;
};

export const updateBanner = async (id, banner) => {
  const response = await apiClient.put(BANNER.UPDATE(id), banner);
  return response.data.data;
};

export const toggleBanner = async (id) => {
  const response = await apiClient.patch(BANNER.TOGGLE(id));
  return response.data.data;
};

export const deleteBanner = async (id) => {
  const response = await apiClient.delete(BANNER.DELETE(id));
  return response.data;
};