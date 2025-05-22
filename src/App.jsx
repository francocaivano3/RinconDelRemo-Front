import { ThemeProvider } from "./components/context/themeContext/ThemeContext";
import ThemeBtn from "./components/ThemeBtn/ThemeBtn";
import AlertProvider from "./components/context/alertContext/AlertContext";
import SimpleAlert from "./components/alert/Alert";
import LandingPage from "./components/pages/landingPage/landingPage";
import Register from "../src/components/pages/register/Register";
import Perfil from "./components/pages/perfil/Perfil";
import Dashboard from "./components/dashboard/Dashboard";
import MyKayaks from "./components/pages/myKayaks/myKayaks";
import AppRouter from "./routers/AppRouters";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <SimpleAlert/>
        <AppRouter/>
        <ThemeBtn/>  
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
