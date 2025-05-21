
import { useState } from 'react'
import { ThemeProvider } from './components/context/themeContext/ThemeContext';
import ThemeBtn from './components/ThemeBtn/ThemeBtn';
import LandingPage from './components/pages/landingPage/landingPage'; 
import Register from "../src/components/pages/register/Register";
import Perfil from "./components/pages/perfil/Perfil";
import GridPerchas from './components/perchasGrid/perchasGrid';

function App() {
  return (
    <ThemeProvider>
      <GridPerchas/>
   </ThemeProvider>
  );
}

export default App;
//<Register/>
//<ThemeBtn/>