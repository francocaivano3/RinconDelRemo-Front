import React from "react";
import { NavLink } from "react-router-dom";
import { Home, CalendarCheck, History, User, ShipWheel } from "lucide-react";
import { useAuth } from "../../components/context/authContext/AuthContext";
import { useTranslate } from "../../hooks/useTranslate";

const determineUserType = (userInfo) => {
  if (!userInfo) return null;

  // Si tiene roles, usamos el primero (para admin y encargado)
  if (userInfo.roles && userInfo.roles.length > 0) {
    return userInfo.roles[0].toLowerCase(); // "admin" o "encargado"
  }

  // Si tiene tipo, usamos el tipo (para cliente y duenio)
  if (userInfo["Tipo de usuario"]) {
    const tipo = userInfo["Tipo de usuario"];
    if (tipo.toLowerCase() === "cliente") return "cliente";
    if (tipo.toLowerCase() === "dueniokayak") return "dueniokayak";
  }

  return null;
};

const NAV_ITEMS = {
  admin: [
    { path: "/dashboard", icon: Home, label: "Inicio" },
    { path: "/sysadmin", icon: History, label: "Administración" },
    { path: "/configuracion", icon: User, label: "Configuración" },
  ],
  encargado: [
    { path: "/dashboard", icon: Home, label: "Inicio" },
    { path: "/EncargadoChecks", icon: CalendarCheck, label: "Check-In/out" },
    { path: "/perchasDisponibles", icon: CalendarCheck, label: "Perchas" },
    { path: "/configuracion", icon: User, label: "Configuración" },
  ],
  cliente: [
    { path: "/dashboard", icon: Home, label: "Inicio" },

    {
      path: "/KayaksDisponibles",
      icon: CalendarCheck,
      label: "Kayaks Disponibles",
    },
    { path: "/configuracion", icon: User, label: "Configuración" },
  ],
  dueniokayak: [
    { path: "/dashboard", icon: Home, label: "Inicio" },
    { path: "/perchas", icon: CalendarCheck, label: "Mis Perchas" },
    { path: "/mis-kayaks", icon: ShipWheel, label: "Mis kayaks" },
    { path: "/configuracion", icon: User, label: "Configuración" },
  ],
};

export default function BottomNavbar() {
  const translate = useTranslate();
  const { userInfo, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#003459] border-t border-gray-200 dark:border-none py-2 px-4 z-50 shadow-md">
        <div className="flex justify-center items-center h-full">
          Cargando sesión...
        </div>
      </div>
    );
  }

  const userType = determineUserType(userInfo);

  if (!userType) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#003459] border-t border-gray-200 dark:border-none py-2 px-4 z-50 shadow-md">
        <div className="flex justify-center items-center h-full">
          Sesión no válida
        </div>
      </div>
    );
  }

  const navItems = NAV_ITEMS[userType];

  if (!navItems) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#003459] border-t border-gray-200 dark:border-none py-2 px-4 z-50 shadow-md">
        <div className="flex justify-center items-center h-full">
          No tienes permisos para acceder
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#003459] border-t border-gray-200 dark:border-none py-2 px-4 z-50 shadow-md">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive
                  ? "text-[#003459] dark:text-teal-400"
                  : "text-gray-500 dark:text-white hover:text-[#003459] dark:hover:text-teal-400"
              }`
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{translate(item.label)}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
