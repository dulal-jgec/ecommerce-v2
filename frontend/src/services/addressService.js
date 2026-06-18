import api from "./api";

export const getMyAddresses = async () => {
  const res = await api.get("/addresses");
  return res.data.data;
};

export const createAddress = async (data) => {
  const res = await api.post("/addresses", data);
  return res.data.data;
};

export const updateAddress = async (id, data) => {
  const res = await api.put(`/addresses/${id}`, data);
  return res.data.data;
};

export const deleteAddress = async (id) => {
  return api.delete(`/addresses/${id}`);
};

export const setDefaultAddress = async (id) => {
  const res = await api.patch(`/addresses/${id}/default`);
  return res.data.data;
};