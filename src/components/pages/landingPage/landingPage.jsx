import React from "react";
import imagen from '../../../assets/imagen de dos kayaks desde arriba.jpg'
import Header from '../../../components/navbar/NavBar'

export default function LandingPage() {
  return (
  <>
  <Header/>
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-8 overflow-y-auto">
        <div className="w-full max-w-xl">
          <h1 className="text-4xl font-bold text-teal-900 mb-4 text-center">
            Rincón del Remo
          </h1>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Una plataforma innovadora para la gestión de perchas y alquileres de kayaks.
          </p>

          <h2 className="text-2xl font-semibold text-teal-800 mt-6 mb-2">¿Qué es Rincón del Remo?</h2>
          <p className="text-gray-700 mb-4">
            Rincón del Remo optimiza la administración de espacios en guarderías de kayaks, permitiendo a los propietarios gestionar sus taquillas y ofrecer en alquiler sus embarcaciones cuando no las usan. Todo con seguridad y transparencia, siendo el dueño del kayak quien tiene la ultima palabra.
          </p>

          <h2 className="text-2xl font-semibold text-teal-800 mt-6 mb-2">¿Qué ofrece nuestra app?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Gestión digital de taquillas para kayaks.</li>
            <li>Alquiler de kayaks con autorización del propietario.</li>
            <li>Sistema intuitivo para organizar y reservar embarcaciones.</li>
            <li>Control total sobre el uso de cada kayak.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-teal-800 mt-6 mb-2">Fomentando comunidad</h2>
          <p className="text-gray-700">
            Con esta app, promovemos una comunidad de amantes del kayak, facilitando el acceso a esta actividad sin necesidad de tener una embarcación propia y disfrutando de esto que todos amamos.
          </p>
        </div>
      </div>

      <div className="hidden md:block w-full md:w-1/2">
       <img src={imagen} alt="Imagen de kayaks" className="object-cover w-full h-full" />
      </div>
    </div>
    </>
  );
}
