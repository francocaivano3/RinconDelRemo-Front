import { Calendar, X } from "lucide-react";
import {
  getAvailableKayakId,
  postCheckInId,
  postCheckInOut,
  cancelarReserva,
} from "../../../service/encargadoChck";
import { useEffect, useState } from "react";
import imag from "../../../assets/imagen-de-dos-kayaks-desde-arriba.jpg";
function ReservaCard({ reserva }) {
  const [checks, setChecks] = useState([]);
  const [reservaData, setReservaData] = useState(reserva);

  const handleCheckIn = async () => {
    try {
      const checkIn = await postCheckInId(reservaData.id);
      console.log("########## Check-In ##########");
      console.log(checkIn);

      // Actualiza el estado local si el backend devuelve uno nuevo
      setReservaData((prev) => ({
        ...prev,
        statusReservation: checkIn.statusReservation || "Finished",
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckOut = async () => {
    try {
      const checkOut = await postCheckInOut(reservaData.id);
      console.log("########## Check-Out ##########");
      console.log(checkOut);

      // Actualiza el estado local si el backend devuelve uno nuevo
      setReservaData((prev) => ({
        ...prev,
        statusReservation: checkOut.statusReservation || "Finished",
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelarReserva = async () => {
    try {
      const cancelar = await cancelarReserva(reservaData.id);
      console.log("########## Reserva Cancelada ##########");
      console.log(cancelar);
    } catch (err) {
      console.error(err);
    }
  }

  const handleGetKayaksDisponibles = async () => {
    try {
      const response = await getAvailableKayakId(reservaData.kayakId);
      setChecks(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetKayaksDisponibles();
  }, []);

  const isDisabled =
    reservaData.statusReservation === "Finished" ||
    reservaData.statusReservation === "Canceled";

  return (
    <div className="bg-white dark:bg-[#223849] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-none group">
      <div className="relative">
        <img
          src={reservaData.imagen || imag}
          alt="Reserva"
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <button
          disabled={isDisabled}
          onClick={handleCancelarReserva} 
          className={`p-2 bg-white/90 rounded-md text-red-600 hover:bg-white flex items-center ${isDisabled
                ? "bg-gray-200 text-gray-500 ring-gray-300 cursor-not-allowed"
                : ""}`}>
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {checks.name}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-600 dark:text-gray-300">
          <div>Modelo: {checks.name}</div>
          <div>Color: {checks.color}</div>
          <div>Longitud: {checks.length}</div>
          <div>Capacidad: {checks.capacity}</div>
          <div>Material: {checks.material}</div>
          <div>Estado: {reservaData.statusReservation}</div>
        </div>

        <div className="mt-5 flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            Inicio: {reservaData.fechaInicio?.slice(0, 10)} <br></br>{reservaData.fechaInicio?.slice(11, 16)}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            Entrada: {reservaData.fechaFin?.slice(0, 10)} - {reservaData.fechaFin?.slice(11, 16)}
          </div>
        </div>


        <div className="mt-5 flex justify-between text-sm text-gray-700 dark:text-gray-300">
          <button
            disabled={isDisabled}
            onClick={handleCheckIn}
            className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-xs font-medium ring-1 ring-inset transition-colors ${isDisabled
                ? "bg-gray-200 text-gray-500 ring-gray-300 cursor-not-allowed"
                : "bg-blue-100 text-blue-800 ring-blue-600/20 cursor-pointer"
              }`}
          >
            Check-In
          </button>

          <button
            disabled={isDisabled}
            onClick={handleCheckOut}
            className={`inline-flex items-center justify-center rounded-md px-4.5 py-3 text-xs font-medium ring-1 ring-inset transition-colors ${isDisabled
                ? "bg-gray-200 text-gray-500 ring-gray-300 cursor-not-allowed"
                : "bg-red-100 text-red-800 ring-red-600/20 cursor-pointer"
              }`}
          >
            Check-Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservaCard;
