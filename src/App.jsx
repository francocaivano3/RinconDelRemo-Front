
import { useState } from 'react'
import { ThemeProvider } from './components/context/themeContext/ThemeContext';
import ThemeBtn from './components/ThemeBtn/ThemeBtn';
import LandingPage from './components/pages/landingPage/landingPage'; 
import Register from "../src/components/pages/register/Register";
import Perfil from "./components/pages/perfil/Perfil";

function App() {
  return (
    <ThemeProvider>
      <Register/>
      <ThemeBtn/>
    </ThemeProvider>
  );
}

export default App;
