import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../routers/ProtectedRoute";

// Páginas
import LandingPage from "../components/pages/landingPage/landingPage";
import Perfil from "../components/pages/perfil/Perfil";
import MyKayaks from "../components/pages/myKayaks/myKayaks";
import Dashboard from "../components/dashboard/Dashboard";
import SuperAdmin from "../components/pages/superAdmin/SuperAdmin";
import PerchasPage from "../components/pages/perchasPage/PerchasPage";
import NotFound from "../components/pages/notFound/NotFound";
import HistorialKayaks from "../components/pages/historialKayaks/HistorialKayaks";
import MisReservas from "../components/pages/misReservas/MisReservas";
import Configuracion from "../components/pages/configuracion/Configuracion";
import KayaksDisponibles from "../components/pages/kayaksDisponibles/KayaksDisponibles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Ruta pública
      { path: "/", element: <LandingPage /> },

      // Rutas protegidas
      {
        path: "/perfil",
        element: (
          <ProtectedRoute userType="cliente">
            <Perfil />
          </ProtectedRoute>
        ),
      },
      {
        path: "/configuracion",
        element: (
          <ProtectedRoute userType="cliente" allowAllAuthenticated={true}>
            <Configuracion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/mis-kayaks",
        element: (
          <ProtectedRoute userType="dueniokayak">
            <MyKayaks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute userType="cliente" allowAllAuthenticated={true}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sysadmin",
        element: (
          <ProtectedRoute userType="admin">
            <SuperAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/historial",
        element: (
          <ProtectedRoute userType="cliente">
            <HistorialKayaks />
          </ProtectedRoute>
        ),
      },
      {
        path: "/perchas",
        element: (
          <ProtectedRoute userType="encargado">
            <PerchasPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/MisReservas",
        element: (
          <ProtectedRoute userType="cliente">
            <MisReservas />
          </ProtectedRoute>
        ),
      },

      // Ruta 404
      { path: "*", element: <NotFound /> },

      { path: "/login", element: <Login /> },
      { path: "/MisReservas", element: <MisReservas /> },
      { path: "/KayaksDisponibles", element: <KayaksDisponibles /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
