import { Outlet, useLocation } from "react-router-dom";
import BottomNavbar from "./components/navbar/NavBar";
import ThemeBtn from "./components/ThemeBtn/ThemeBtn";
import { ThemeProvider } from "./components/context/themeContext/ThemeContext";
import AlertProvider from "./components/context/alertContext/AlertContext";
import SimpleAlert from "./components/alert/Alert";
import LandingPage from "./components/pages/landingPage/landingPage";
import Register from "../src/components/pages/register/Register";
import Perfil from "./components/pages/perfil/Perfil";
import GridPerchas from './components/perchasGrid/perchasGrid';
import Dashboard from "./components/dashboard/Dashboard";
import MyKayaks from "./components/pages/myKayaks/myKayaks";
import AppRouter from "./routers/AppRouters";

export default function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/register", "/login"]; 
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <ThemeProvider>
      <AlertProvider>
        <SimpleAlert />
        <div className="pb-20">
          <Outlet />
        </div>
        {!shouldHideNavbar && <BottomNavbar />}
        <ThemeBtn />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;

