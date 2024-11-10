import axios from "axios";
import useAuthStore from "../store/auth.store";

const BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

export const authInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { removeAccessToken } = useAuthStore.getState();
      removeAccessToken();
      window.location.href = "/log-in";
      alert("로그인 만료");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default authInstance;
