import { useState, useContext } from "react";
import {
  User,
  CreditCard,
  Clock,
  MapPin,
  LifeBuoy,
  LogOut,
  Settings,
  Globe,
} from "lucide-react";
import Perfil from "../perfil/Perfil";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../hooks/useTranslate";
import { TranslateContext } from "../../../components/context/translationContext/TranslateLanguage";
import { useAuth } from "../../context/authContext/AuthContext";
export default function Configuracion() {
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const translate = useTranslate();


  const { userInfo, rol, logout } = useAuth();

  if (!userInfo) return <p className="p-4">Cargando datos...</p>;

  return (
    <div
      className={`min-h-screen w-full ${
        isDark ? "bg-[#003459] text-white" : "bg-white text-gray-900"
      }`}
    >
      {!editandoPerfil && (
        <div
          className={`py-6 px-4 text-white flex items-center ${
            isDark ? "bg-[#003459]" : "bg-[#003459]"
          } shadow-md`}
        >
          <div className="bg-white text-teal-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
            {userInfo.name?.slice(0, 2).toUpperCase() || "US"}
          </div>
          <div>
            <p className="font-semibold text-lg">{userInfo.name}</p>
            <p className="text-sm">{userInfo.preferred_username}</p>
            <p className="text-sm font-medium">{rol}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-4">
        {!editandoPerfil ? (
          <>
            <SectionItem
              icon={<User />}
              title={translate("Editar perfil")}
              subtitle={translate("Actualiza tu información personal")}
              onClick={() => setEditandoPerfil(true)}
            />
            <SectionItem
              icon={<CreditCard />}
              title={translate("Métodos de pago")}
              subtitle={translate("Gestiona tus tarjetas y métodos de pago")}
            />
            <SectionItem
              icon={<Clock />}
              title={translate("Historial de alquileres")}
              subtitle={translate("Revisa tus alquileres anteriores")}
              onClick={() => navigate("/historial")}
            />
            <SectionItem
              icon={<MapPin />}
              title={translate("Ubicaciones favoritas")}
              subtitle={translate("Gestiona tus ubicaciones preferidas")}
            />

            <div
              className={`rounded-lg shadow p-4 transition-colors duration-300 ${
                isDark ? "bg-sky-900" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-2">{translate("Preferencias")}</h3>
              <ToggleItem
                title="Modo oscuro"
                isDark={isDark}
                setIsDark={setIsDark}
              />
              <ToggleItem title="Idioma" />
            </div>

            <SectionItem
              icon={<LifeBuoy />}
              title={translate("Centro de ayuda")}
              subtitle={translate("Preguntas frecuentes y soporte")}
            />

            <button onClick={logout} className="w-full border border-red-500 text-red-500 py-2 rounded-lg flex items-center justify-center mt-4  cursor-pointer hover:bg-red-500 hover:text-white">
              <LogOut className="mr-2" size={16} />
              {translate("Cerrar sesión")}
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
      className="bg-white dark:bg-sky-900 rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-[#003459] transition-colors duration-200"
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
              : "Active para cambiar el idioma a Inglés"}
          </p>
        </div>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer peer2"
          checked={isModeToggle ? isDark : language === "en"}
          onChange={
            isModeToggle ? () => setIsDark(!isDark) : handleLanguageToggle
          }
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 transition-all duration-200 relative">
          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ball"></div>
        </div>
      </label>
    </div>
  );
}
