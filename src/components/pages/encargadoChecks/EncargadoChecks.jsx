// import { Calendar, X, Search, Filter, ChevronDown } from "lucide-react";
// import { useEffect, useState } from "react";
// import ReservaCard from "./ReservaCard";

// import { getCheckInCheckOut } from "../../../service/encargadoChck";
// function EncargadoChecks() {

//   const [checks, setChecks] = useState([]);

//   const handleGetKayaksDisponibles = async () => {
//     try {
//       const response = await getCheckInCheckOut();
//       console.log(response);
//       const normalized = response.map((k) => ({
//         id: k.id,
//         kayakId: k.kayakId,
//         tenantId: k.tenantId,
//         fechaInicio: k.fechaInicio,
//         fechaFin: k.fechaFin,
//         statusReservation: k.statusReservation,
//       }));
//       setChecks(normalized);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     handleGetKayaksDisponibles();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#003459]">
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         <div className="mb-10 relative">
//           <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#71c4ca] to-blue-500/20 dark:from-green-600 dark:to-blue-500 rounded-full blur-xl"></div>
//           <div className="absolute -bottom-4 -right-6 w-32 h-32 bg-gradient-to-tr from-[#71c4ca] to-blue-500/20 dark:from-green-600 dark:to-blue-500 rounded-full blur-xl"></div>
//           <h1 className="relative text-4xl font-extrabold text-[#007178] tracking-tight dark:text-white">
//             Encargado Check-In / Check-Out
//           </h1>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//           {checks.map((reserva) => (
//             <ReservaCard key={reserva.id} reserva={reserva} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EncargadoChecks;
import { Calendar, Search, Filter, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import ReservaCard from "./ReservaCard";
import {
  getCheckInCheckOut,
  getAvailableKayakId,
} from "../../../service/encargadoChck";

function EncargadoChecks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [estado, setEstado] = useState(""); // NUEVO filtro por estado
  const [checks, setChecks] = useState([]);
  const [aplicarFiltro, setAplicarFiltro] = useState(false);

  const handleApplyFilters = () => {
    setAplicarFiltro(!aplicarFiltro);
    setFilterOpen(false);
  };

  const handleGetKayaksDisponibles = async () => {
    try {
      const response = await getCheckInCheckOut();
      const normalized = await Promise.all(
        response.map(async (k) => {
          const kayakData = await getAvailableKayakId(k.kayakId);
          return {
            ...k,
            detalles: kayakData,
          };
        })
      );
      setChecks(normalized);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetKayaksDisponibles();
  }, []);

  const filteredKayaks = checks.filter((reserva) => {
    const term = searchTerm.toLowerCase();
    const kayak = reserva.detalles || {};
    const matchSearch =
      kayak.name?.toLowerCase().includes(term) ||
      kayak.color?.toLowerCase().includes(term) ||
      kayak.material?.toLowerCase().includes(term);

    const matchColor = color
      ? kayak.color?.toLowerCase() === color.toLowerCase()
      : true;
    const matchMaterial = material
      ? kayak.material?.toLowerCase().includes(material.toLowerCase())
      : true;
    const matchCapacidad = capacidad
      ? String(kayak.capacity) === capacidad
      : true;
    const matchEstado = estado ? reserva.statusReservation === estado : true;

    return (
      matchSearch &&
      matchColor &&
      matchMaterial &&
      matchCapacidad &&
      matchEstado
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#003459]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl font-extrabold text-[#007178] dark:text-white mb-10">
          Encargado Check-In / Check-Out
        </h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, color o material..."
              className="pl-12 pr-4 py-3 w-full dark:bg-[#003459] dark:text-white bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007178]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center px-4 py-3 bg-white dark:bg-[#003459] border rounded-xl shadow-sm"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtros
              <ChevronDown
                className={`ml-2 transition-transform ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {filterOpen && (
              <div className="absolute right-0 z-10 mt-2 w-72 p-5 bg-white dark:bg-[#003459] rounded-xl shadow-lg">
                <div className="space-y-4 text-sm">
                  {/* Color */}
                  <div>
                    <label className="block mb-1">Color</label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full p-2 rounded"
                    >
                      <option value="">Todos</option>
                      <option value="Rojo">Rojo</option>
                      <option value="Azul">Azul</option>
                      <option value="Verde">Verde</option>
                      <option value="Amarillo">Amarillo</option>
                      <option value="Naranja">Naranja</option>
                    </select>
                  </div>
                  {/* Material */}
                  <div>
                    <label className="block mb-1">Material</label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full p-2 rounded"
                    >
                      <option value="">Todos</option>
                      <option value="Polietileno">Polietileno</option>
                      <option value="Fibra de vidrio">Fibra de vidrio</option>
                      <option value="Kevlar">Kevlar</option>
                      <option value="Carbono">Carbono</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>
                  {/* Capacidad */}
                  <div>
                    <label className="block mb-1">Capacidad</label>
                    <select
                      value={capacidad}
                      onChange={(e) => setCapacidad(e.target.value)}
                      className="w-full p-2 rounded"
                    >
                      <option value="">Todas</option>
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3">3 o más personas</option>
                    </select>
                  </div>
                  {/* Estado de reserva */}
                  <div>
                    <label className="block mb-1">Estado</label>
                    <select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="w-full p-2 rounded"
                    >
                      <option value="">Todos los estados</option>
                      <option value="Active">Activo</option>
                      <option value="Finished">Finalizado</option>
                      <option value="Canceled">Cancelado</option>
                    </select>
                  </div>
                  {/* Botón aplicar */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleApplyFilters}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-lg"
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredKayaks.map((reserva) => (
            <ReservaCard key={reserva.id} reserva={reserva} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EncargadoChecks;
