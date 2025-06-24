import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarCheck, History, User, ShipWheel } from 'lucide-react';


export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#003459] border-t border-gray-200 dark:border-none py-2 px-4 z-50 shadow-md">
      <div className="flex justify-around items-center">
        <NavLink to="/dashboard" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#003459] dark:text-teal-400' : 'text-gray-500 dark:text-white hover:text-[#003459] dark:hover:text-teal-400'}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Inicio</span>
        </NavLink>

        <NavLink to="/mis-kayaks" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#003459] dark:text-teal-400' : 'text-gray-500 dark:text-white hover:text-[#003459] dark:hover:text-teal-400'}`}>
          <ShipWheel className="h-6 w-6" />
          <span className="text-xs mt-1">Mis Kayaks</span>
        </NavLink>

        <NavLink to="/MisReservas" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#003459] dark:text-teal-400' : 'text-gray-500 dark:text-white hover:text-[#003459] dark:hover:text-teal-400'}`}>
          <CalendarCheck className="h-6 w-6" />
          <span className="text-xs mt-1">Reservas</span>
        </NavLink>

        <NavLink to="/historial" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#003459] dark:text-teal-400' : 'text-gray-500 dark:text-white hover:text-[#003459] dark:hover:text-teal-400'}`}>
          <History className="h-6 w-6" />
          <span className="text-xs mt-1">Historial</span>
        </NavLink>

        <NavLink to="/configuracion" className={({ isActive }) => `flex flex-col items-center ${isActive ? 'text-[#003459] dark:text-teal-400' : 'text-gray-500 dark:text-white hover:text-[#003459] dark:hover:text-teal-400'}`}>
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Perfil</span>
        </NavLink>
      </div>
    </div>
  );
}