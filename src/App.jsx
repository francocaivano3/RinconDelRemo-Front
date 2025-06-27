import { Outlet, useLocation } from "react-router-dom";
import BottomNavbar from "./components/navbar/NavBar";
import ThemeBtn from "./components/ThemeBtn/ThemeBtn";
import { ThemeProvider } from "./components/context/themeContext/ThemeContext";
import AlertProvider from "./components/context/alertContext/AlertContext";
import SimpleAlert from "./components/alert/Alert";
import {MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate} from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../authConfig";
import { loginRequest } from "../authConfig";
const msalInstance = new PublicClientApplication(msalConfig);
import { TranslateProvider } from "./components/context/translationContext/TranslateLanguage";


export default function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/register", "/login", "/"]; 
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <MsalProvider instance={msalInstance}>
      <TranslateProvider>
      <ThemeProvider>
      <AlertProvider>
        <SimpleAlert />
        <div className={shouldHideNavbar ? "" : "pb-15"}>
          <Outlet />
        </div>
        {!shouldHideNavbar && <BottomNavbar />}
      </AlertProvider>
      </ThemeProvider>
      </TranslateProvider>
    </MsalProvider>
  );
}


