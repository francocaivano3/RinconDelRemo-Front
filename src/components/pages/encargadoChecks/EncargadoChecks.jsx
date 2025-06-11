import { Calendar, X, Search, Filter, ChevronDown } from "lucide-react";
import { useState } from "react";
import ReservaCard from "./ReservaCard";

const reservas = [
  {
    id: 1,
    estado: "Confirmada",
    fechaSalida: "--:--",
    fechaEntrada: "--:--",
    detalles: {
      nombre: "Kayak Rápido",
      modelo: "m-200",
      color: "Rojo",
      longitud: "3.5m",
      capacidad: "1 persona",
      material: "Polietileno",
    },
    user: {
      imag: "",
      name: "Juan",
      lastname: "Pérez",
    },
    percha: "B22",
    total: "120",
    codigo: "A9fvbf678",
  },
  {
    id: 2,
    estado: "Confirmada",
    fechaSalida: "--:--",
    fechaEntrada: "--:--",
    detalles: {
      nombre: "Kayak Familiar",
      modelo: "X-200",
      color: "Amarillo",
      longitud: "3.5m",
      capacidad: "2 persona",
      material: "Kevlar",
      imag: "",
    },
    user: {
      name: "Agustin",
      lastname: "Reymundez",
    },
    percha: "B25",
    total: "--",
    codigo: "Adsdga235",
  },
];

function EncargadoChecks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [color, setColor] = useState("");
  const [material, setMaterial] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [percha, setPercha] = useState("");
  const [aplicarFiltro, setAplicarFiltro] = useState(false);

  const handleApplyFilters = () => {
    setAplicarFiltro(!aplicarFiltro);
    setFilterOpen(false);
  };

  const filteredKayaks = reservas.filter((reserva) => {
    const term = searchTerm.toLowerCase();
    const {
      nombre,
      modelo,
      color: kayakColor,
      material: kayakMaterial,
      capacidad: kayakCapacidad,
    } = reserva.detalles;
    const { name, lastname } = reserva.user;
    const matchSearch =
      nombre.toLowerCase().includes(term) ||
      modelo.toLowerCase().includes(term) ||
      kayakColor.toLowerCase().includes(term) ||
      name.toLowerCase().includes(term) ||
      lastname.toLowerCase().includes(term);

    const matchColor = color
      ? kayakColor.toLowerCase() === color.toLowerCase()
      : true;
    const matchMaterial = material
      ? kayakMaterial.toLowerCase().includes(material.toLowerCase())
      : true;
    const matchCapacidad = capacidad
      ? kayakCapacidad.toLowerCase().includes(capacidad)
      : true;
    const matchPercha = percha
      ? reserva.percha.toLowerCase() === percha.toLowerCase()
      : true;

    return (
      matchSearch &&
      matchColor &&
      matchMaterial &&
      matchCapacidad &&
      matchPercha
    );
  });
  console.log(filteredKayaks);
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

        {/* Buscador y filtros */}
        <div className="flex flex-col md:flex-row gap-4 items-center mt-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, modelo o color..."
              className="dark:bg-[#003459] dark:text-white pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007178] dark:focus:ring-white focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              className="flex items-center px-4 py-3 bg-white dark:bg-[#003459] border border-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-[#003459] dark:text-white shadow-sm transition-colors"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
              <span className="font-medium">Filtros</span>
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {filterOpen && (
              <div className="absolute right-0 w-72 bg-white dark:bg-[#003459] border border-gray-100 rounded-xl shadow-lg z-10 p-5 mt-2">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white mb-3">
                  Filtrar por:
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                      Color
                    </label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white dark:bg-[#003459] dark:text-white"
                    >
                      <option value="">Todos los colores</option>
                      <option value="Rojo">Rojo</option>
                      <option value="Azul">Azul</option>
                      <option value="Verde">Verde</option>
                      <option value="Amarillo">Amarillo</option>
                      <option value="Naranja">Naranja</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                      Material
                    </label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white dark:bg-[#003459] dark:text-white"
                    >
                      <option value="">Todos los materiales</option>
                      <option value="Polietileno">Polietileno</option>
                      <option value="Fibra">Fibra de vidrio</option>
                      <option value="Kevlar">Kevlar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                      Capacidad
                    </label>
                    <select
                      value={capacidad}
                      onChange={(e) => setCapacidad(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white dark:bg-[#003459] dark:text-white"
                    >
                      <option value="">Todas las capacidades</option>
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3">3 o más personas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                      Percha
                    </label>
                    <input
                      type="text"
                      value={percha}
                      onChange={(e) => setPercha(e.target.value)}
                      placeholder="Ej: B22"
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white dark:bg-[#003459] dark:text-white"
                    />
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleApplyFilters}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 text-sm font-medium shadow-sm transition-all"
                    >
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cards */}
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
