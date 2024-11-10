import authInstance from "./api";

export const fetchUserData = async (accessToken: string) => {
  const response = await authInstance.get(`/user`, {
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
  const response = await authInstance.patch(`/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const logIn = async (formData: { id: string; password: string }) => {
  const response = await authInstance.post(`/login?expiresIn=10m`, formData);

  return response.data;
};

export const signUp = async (formData: {
  id: string;
  password: string;
  nickname: string;
}) => {
  const response = await authInstance.post(`/register`, formData);

  return response.data;
};
