import api from "./api";

export const getPendingSellers = async () => {
  const response = await api.get(
    "/seller/pending"
  );

  return response.data;
};

export const approveSeller = async (id) => {
  return api.put(
    `/seller/${id}/approve`
  );
};

export const rejectSeller = async (id) => {
  return api.put(
    `/seller/${id}/reject`
  );
};