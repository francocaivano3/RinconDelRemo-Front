import { Outlet, useLocation } from "react-router-dom";
import BottomNavbar from "./components/navbar/NavBar";
import ThemeBtn from "./components/ThemeBtn/ThemeBtn";
import { ThemeProvider } from "./components/context/themeContext/ThemeContext";
import AlertProvider from "./components/context/alertContext/AlertContext";
import SimpleAlert from "./components/alert/Alert";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/register", "/login"]; 
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <ThemeProvider>
      <AlertProvider>
        <SimpleAlert />
        <div className="pb-15">
          <Outlet />
        </div>
        {!shouldHideNavbar && <BottomNavbar />}
        <ThemeBtn />
      </AlertProvider>
    </ThemeProvider>
  );
}


