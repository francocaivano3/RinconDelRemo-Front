import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

// Páginas
import LandingPage from "../components/pages/landingPage/landingPage";
import Perfil from "../components/pages/perfil/Perfil";
import MyKayaks from "../components/pages/myKayaks/myKayaks";
import Register from "../components/pages/register/Register";
import Login from "../components/pages/login/Login";
import Dashboard from "../components/dashboard/Dashboard";
import SuperAdmin from "../components/pages/superAdmin/SuperAdmin";
import PerchasPage from "../components/pages/perchasPage/PerchasPage";
import NotFound from "../components/pages/notFound/NotFound";
import HistorialKayaks from "../components/pages/historialKayaks/HistorialKayaks";
import MisReservas from "../components/pages/misReservas/MisReservas";

import Configuracion from "../components/pages/configuracion/Configuracion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout con navbar
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/perfil", element: <Perfil /> },
      { path: "/configuracion", element: <Configuracion /> },
      { path: "/mis-kayaks", element: <MyKayaks /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/sysadmin", element: <SuperAdmin /> },
      { path: "/register", element: <Register /> },
      { path: "/historial", element: <HistorialKayaks /> },
      { path: "/perchas", element: <PerchasPage /> },
      { path: "*", element: <NotFound /> },
      { path: "/login", element: <Login /> },
      { path: "/MisReservas", element: <MisReservas /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
