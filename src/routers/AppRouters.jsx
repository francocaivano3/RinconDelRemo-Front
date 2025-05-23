import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../components/pages/landingPage/landingPage";
import Register from "../components/pages/register/Register";
import Perfil from "../components/pages/perfil/Perfil";
import Dashboard from "../components/dashboard/Dashboard";
import MyKayaks from "../components/pages/myKayaks/myKayaks";
import SuperAdmin from "../components/pages/superAdmin/SuperAdmin";
import NotFound from "../components/pages/notFound/NotFound";
import Login from "../components/pages/login/Login";
import PerchasPage from "../components/pages/perchasPage/PerchasPage";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/perfil",
      element: <Perfil />,
    },
    {
      path: "/Dashboard",
      element: <Dashboard />,
    },
    {
      path: "/my-kayaks",
      element: <MyKayaks />,
    },
    {
      path: "/sysadmin",
      element: <SuperAdmin />,
    },
    {
      path: "/perchas",
      element: <PerchasPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default AppRouter;
