import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import MyPage from "../pages/MyPage";
import Layout from "../components/common/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "sign-up",
        element: <PublicRoute />,
        children: [
          {
            path: "",
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: "log-in",
        element: <PublicRoute />,
        children: [
          {
            path: "",
            element: <LogInPage />,
          },
        ],
      },
      {
        path: "my",
        element: <PrivateRoute />,
        children: [
          {
            path: "",
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
