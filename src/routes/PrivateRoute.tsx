import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const PrivateRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
