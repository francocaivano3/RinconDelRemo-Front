import { Calendar, X } from "lucide-react";

function ReservaCard({ reserva }) {
  return (
    <div className="bg-white dark:bg-[#223849] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-none group">
      <div className="relative">
        <img
          src={reserva.detalles.imag || ""}
          alt="Reserva"
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <button className="p-2 bg-white/90 rounded-md text-red-600 hover:bg-white flex items-center">
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </button>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="inline-flex items-center justify-center rounded-md bg-blue-100 px-5 py-3 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20 cursor-pointer">
              Check-In
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20 cursor-pointer">
              Check-Out
            </button>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-white/80 text-gray-800 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur">
          Reservado por: {reserva.user.name} {reserva.user.lastname}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {reserva.detalles.nombre}
            </h3>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-200 font-semibold">
            <p>${reserva.total}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-600 dark:text-gray-300">
          <div>Modelo: {reserva.detalles.modelo}</div>
          <div>Color: {reserva.detalles.color}</div>
          <div>Longitud: {reserva.detalles.longitud}</div>
          <div>Capacidad: {reserva.detalles.capacidad}</div>
          <div>Material: {reserva.detalles.material}</div>
          <div>Percha: {reserva.percha || "No asignada"}</div>
          <div>Codigo: {reserva.codigo}</div>
        </div>

        <div className="mt-5 flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            Salida: {reserva.fechaSalida}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            Entrada: {reserva.fechaEntrada}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservaCard;
