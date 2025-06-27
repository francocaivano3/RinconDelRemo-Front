import React from "react";
import { NavLink } from "react-router-dom";
import { Home, CalendarCheck, History, User, ShipWheel } from "lucide-react";
import { useAuth } from "../../components/context/authContext/AuthContext";

// Definir la función para determinar el tipo de usuario
const determineUserType = (userInfo) => {
  if (!userInfo) return null;
  if (userInfo.tipo) return userInfo.tipo;
  if (userInfo["Tipo de usuario"]) return userInfo["Tipo de usuario"];
  if (userInfo.roles && userInfo.roles.length > 0) return userInfo.roles[0];
  return null;
};


const NAV_ITEMS = {
  admin: [
    { path: "/dashboard", icon: Home, label: "Inicio" },
  
  ],
  encargado: [
    { path: "/dashboard", icon: Home, label: "Inicio" },

  ],
  Cliente: [
    { path: "/dashboard", icon: Home, label: "Inicio" },
    { path: "/MisReservas", icon: CalendarCheck, label: "Mis reservas" },
    { path: "/configuracion", icon: User, label: "Configuración" },

  ],
  DuenioKayak: [
    { path: "/dashboard", icon: Home, label: "Inicio" },

  ]
};

export default function BottomNavbar() {
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
 

  // Determinar el tipo de usuario
  const userType = determineUserType(userInfo);

  // Si no hay tipo de usuario válido, mostrar mensaje de error
  if (!userType) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#003459] border-t border-gray-200 dark:border-none py-2 px-4 z-50 shadow-md">
        <div className="flex justify-center items-center h-full">
          Sesión no válida
        </div>
      </div>
    );
  }

  // Obtener los items de navegación para el tipo de usuario
  const navItems = NAV_ITEMS[userType];

  // Si no hay items para este tipo de usuario, mostrar mensaje de error
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
            className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#003459] dark:text-teal-400' : 'text-gray-500 dark:text-white hover:text-[#003459] dark:hover:text-teal-400'}`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}