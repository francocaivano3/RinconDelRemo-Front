import { useState, useContext } from "react";
import { User, CreditCard, Clock, MapPin, LifeBuoy, ShieldCheck, LogOut, Settings, Globe } from "lucide-react";
import Perfil from "../perfil/Perfil";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import { useNavigate } from "react-router-dom";
import { TranslateContext } from "../../context/translationContext/TranslateLanguage";

export default function Configuracion() {
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);
  let navigate = useNavigate();

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className={`py-6 px-4 text-white flex items-center ${isDark ? "bg-gray-800" : "bg-teal-600"}`}>
        <div className="bg-white text-teal-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4"> 
          JP 
        </div>
        <div>
          <p className="font-semibold text-lg">Juan Pérez</p>
          <p className="text-sm">juanperez@gmail.com</p>
          <p className="text-sm">+34 123334444</p>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-4">
        {!editandoPerfil ? (
          <>
            <SectionItem icon={<User />} title="Editar perfil" subtitle="Actualiza tu información personal" onClick={() => setEditandoPerfil(true)} />
            <SectionItem icon={<CreditCard />} title="Métodos de pago" subtitle="Gestiona tus tarjetas y métodos de pago" />
            <SectionItem icon={<Clock />} title="Historial de alquileres" subtitle="Revisa tus alquileres anteriores" onClick={() => {navigate("/historial")}} />
            <SectionItem icon={<MapPin />} title="Ubicaciones favoritas" subtitle="Gestiona tus ubicaciones preferidas" />

            <div className={`rounded-lg shadow p-4 ${isDark ? "bg-gray-800" : "bg-white"}`}>
              <h3 className="text-lg font-semibold mb-2">Preferencias</h3>
              <ToggleItem title="Modo oscuro" isDark={isDark} setIsDark={setIsDark} />
              <ToggleItem title="Idioma" />
            </div>

            <SectionItem icon={<LifeBuoy />} title="Centro de ayuda" subtitle="Preguntas frecuentes y soporte" />
            

            <button className="w-full border border-red-500 text-red-500 py-2 rounded-lg flex items-center justify-center mt-4 hover:bg-red-50 dark:hover:bg-red-900">
              <LogOut className="mr-2" size={16} />
              Cerrar sesión
            </button>
          </>
        ) : (
          <Perfil onVolver={() => setEditandoPerfil(false)} />
        )}
      </div>
    </div>
  );
}

function SectionItem({ icon, title, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <div className="flex items-center">
        <div className="text-teal-600 mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-300">{subtitle}</p>
        </div>
      </div>
      <span className="text-gray-400">›</span>
    </div>
  );
}

function ToggleItem({ title, isDark, setIsDark }) {
  const isModeToggle = title === "Modo oscuro";

  const { language, changeLanguage } = useContext(TranslateContext);

  const handleLanguageToggle = () => {
    const newLang = language === "es" ? "en" : "es";
    changeLanguage(newLang);
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center">
        <div className="text-teal-600 mr-3">
          {isModeToggle ? <Settings /> : <Globe />}
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {isModeToggle
              ? "Activa el tema claro u oscuro"
              : "Active para cambiar el Idioma a Ingles"}
          </p>
        </div>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isModeToggle ? isDark : language === "en"}
          onChange={
            isModeToggle
              ? () => setIsDark(!isDark)
              : handleLanguageToggle
          }
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 relative">
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
        </div>
      </label>
    </div>
  );
}
