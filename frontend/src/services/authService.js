import api from "./api";

export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const logoutUser = async (refreshToken) =>{
  return api.post("/auth/logout",{
    refreshToken,
  });
};