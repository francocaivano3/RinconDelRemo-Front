import React from "react";
import { Search, Calendar } from "lucide-react";
import Clime from "../clime/Clime";

const Dashboard = () => {
  return (
    <>
      <section className="bg-gradient-to-r from-teal-700 to-teal-500 text-white py-28 px-6">
        <div className="max-w-5xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
            Encuentra tu kayak perfecto
          </h1>
          <p className="text-base md:text-lg mb-8 max-w-xl py-4">
            Explora nuestro catálogo de kayaks disponibles para alquilar y vive
            una experiencia única en el agua.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 py-4 ">
            <button
              className="bg-white text-teal-700 px-6 py-2 rounded-md font-medium hover:bg-teal-900 hover:text-teal-50  w-fit cursor-pointer"
              onClick={() => alert("....")}
            >
              Ver kayaks disponibless
            </button>
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 mt-2">
        <Clime />
      </section>
      <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {/* Fecha */}
          <div className="buscador">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Fecha
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 ">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="date"
                className="w-full outline-none text-sm text-gray-700"
              />
            </div>
          </div>

          {/* Botón de búsqueda */}
          <div className="flex items-end">
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md flex justify-center items-center cursor-pointer">
              <Search className="w-4 h-4 mr-2" />
              Buscar kayaks
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
