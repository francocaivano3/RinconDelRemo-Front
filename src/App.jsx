import { ThemeProvider } from "./components/context/themeContext/ThemeContext";
import ThemeBtn from "./components/ThemeBtn/ThemeBtn";
import AlertProvider from "./components/context/alertContext/AlertContext";
import SimpleAlert from "./components/alert/Alert";
import LandingPage from "./components/pages/landingPage/landingPage";
import Register from "../src/components/pages/register/Register";
import Perfil from "./components/pages/perfil/Perfil";

function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <SimpleAlert />
        <Register />
        <ThemeBtn />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
