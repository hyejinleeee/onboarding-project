import { create } from "zustand";
import { AuthState } from "../types/auth.type";

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => {
    set({ accessToken: token });
    localStorage.setItem("accessToken", token);
  },
  removeAccessToken: () => {
    set({ accessToken: null });
    localStorage.removeItem("accessToken");
  },
}));

export default useAuthStore;
