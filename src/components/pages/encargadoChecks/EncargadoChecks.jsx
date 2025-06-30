import { Calendar, X, Search, Filter, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ReservaCard from "./ReservaCard";
//import { getAvailableKayak } from "../../../service/kayakDisponibles";
//import cardImg from "../../../assets/imagen-de-dos-kayaks-desde-arriba.jpg";
import { getCheckInCheckOut } from "../../../service/encargadoChck";
function EncargadoChecks() {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filterOpen, setFilterOpen] = useState(false);
  // const [color, setColor] = useState("");
  // const [material, setMaterial] = useState("");
  // const [capacidad, setCapacidad] = useState("");
  // const [percha, setPercha] = useState("");
  //const [aplicarFiltro, setAplicarFiltro] = useState(false);
  const [checks, setChecks] = useState([]);
  // const handleApplyFilters = () => {
  //   setAplicarFiltro(!aplicarFiltro);
  //   setFilterOpen(false);
  // };

  const handleGetKayaksDisponibles = async () => {
    try {
      const response = await getCheckInCheckOut();
      console.log(response);
      const normalized = response.map((k) => ({
        id: k.id,
        kayakId: k.kayakId,
        tenantId: k.tenantId,
        fechaInicio: k.fechaInicio,
        fechaFin: k.fechaFin,
        statusReservation: k.statusReservation,
      }));
      //  const normalized = response.map((k) => ({
      //   id: k.id,
      //   nombre: k.name,
      //   modelo: k.model,
      //   color: k.color,
      //   capacidad: k.capacity,
      //   longitud: k.length,
      //   material: k.material,
      //   imagen: cardImg,
      // }));
      setChecks(normalized);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetKayaksDisponibles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#003459]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-10 relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#71c4ca] to-blue-500/20 dark:from-green-600 dark:to-blue-500 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-6 w-32 h-32 bg-gradient-to-tr from-[#71c4ca] to-blue-500/20 dark:from-green-600 dark:to-blue-500 rounded-full blur-xl"></div>
          <h1 className="relative text-4xl font-extrabold text-[#007178] tracking-tight dark:text-white">
            Encargado Check-In / Check-Out
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {checks.map((reserva) => (
            <ReservaCard key={reserva.id} reserva={reserva} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EncargadoChecks;
