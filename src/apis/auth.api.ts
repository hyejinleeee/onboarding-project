import axios from "axios";

const BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const fetchUserData = async (accessToken: string) => {
  const response = await instance.get(`/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const updateProfile = async (
  formData: FormData,
  accessToken: string
) => {
  const response = await instance.patch(`/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
