import api from "./api";

export const createPayment = async (orderId) => {
  const res = await api.post("/payments", {
    orderId,
  });

  return res.data.data;
};

export const verifyPayment = async (paymentData) => {
  const res = await api.post("/payments/verify", paymentData);

  return res.data;
};

