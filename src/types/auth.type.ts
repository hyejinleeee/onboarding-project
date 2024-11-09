export type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  removeAccessToken: () => void;
};
