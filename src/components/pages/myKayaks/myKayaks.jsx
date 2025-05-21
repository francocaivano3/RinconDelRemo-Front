import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Plus } from "lucide-react";
import KayakCard from "./kayakCard";
import AddKayakModal from "./addKayakModal";
import cardImg from "../../../assets/imagen de dos kayaks desde arriba.jpg";

//EJEMPLO PARA PROBAR
const hardcodedKayaks = [
  {
    id: 1,
    nombre: "Kayak Explorer",
    modelo: "X-200",
    color: "Rojo",
    longitud: "3.5m",
    capacidad: "1 persona",
    material: "Polietileno",
    fechaCompra: "15/03/2023",
    imagen: cardImg,
  },
  {
    id: 2,
    nombre: "Kayak Aventura",
    modelo: "A-150",
    color: "Azul",
    longitud: "4m",
    capacidad: "2 personas",
    material: "Fibra de vidrio",
    fechaCompra: "22/07/2022",
    imagen: cardImg,
  },
  {
    id: 3,
    nombre: "Kayak Marino",
    modelo: "M-300",
    color: "Verde",
    longitud: "4.2m",
    capacidad: "1 persona",
    material: "Polietileno",
    fechaCompra: "10/01/2023",
    imagen: cardImg,
  },
  {
    id: 4,
    nombre: "Kayak Rápido",
    modelo: "R-100",
    color: "Amarillo",
    longitud: "3.8m",
    capacidad: "1 persona",
    material: "Kevlar",
    fechaCompra: "05/11/2022",
    imagen: cardImg,
  },
  {
    id: 5,
    nombre: "Kayak Familiar",
    modelo: "F-250",
    color: "Naranja",
    longitud: "4.5m",
    capacidad: "3 personas",
    material: "Polietileno",
    fechaCompra: "30/04/2023",
    imagen: cardImg,
  },
];
//


const myKayaks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen]);

  const handleAddKayak = (newKayak) => {
    return;
  }

  const filteredKayaks = hardcodedKayaks.filter((kayak) =>
    kayak.nombre.toLowerCase().includes(searchTerm.toLocaleUpperCase()) ||
    kayak.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kayak.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-10 relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-[#71c4ca] to-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -right-6 w-32 h-32 bg-gradient-to-tr from-[#71c4ca] to-blue-500/20 rounded-full blur-xl"></div>
          <div className="relative">
            <h1 className="text-4xl font-extrabold text-[#007178] tracking-tight">Mis Kayaks</h1>
            <p className="text-gray-500 max-w-2xl mt-4">Explora y administrá tu colección personal de kayaks. Mantené un registro detallado de cada embarcación.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center mt-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Buscar por nombre, modelo o color..." className="pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="relative">
            <button className="flex items-center px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:cursor-pointer shadow-sm transition-colors" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter className="h-5 w-5 mr-2 text-gray-500" />
              <span className="text-gray-700 font-medium">Filtros</span>
              <ChevronDown
                className={`h-4 w-4 ml-2 text-gray-500 transition-transform ${filterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {filterOpen && (
              <div className="absolute right-0 w-72 bg-white border border-gray-100 rounded-xl shadow-lg z-10 p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Filtrar por:</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4 mt-4">Color</label>
                    <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-[#007178] focus:border-transparent">
                      <option value="">Todos los colores</option>
                      <option value="rojo">Rojo</option>
                      <option value="azul">Azul</option>
                      <option value="verde">Verde</option>
                      <option value="amarillo">Amarillo</option>
                      <option value="naranja">Naranja</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4 mt-4">Material</label>
                    <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-[#007178] focus:border-transparent">
                      <option value="">Todos los materiales</option>
                      <option value="polietileno">Polietileno</option>
                      <option value="fibra">Fibra de vidrio</option>
                      <option value="kevlar">Kevlar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4 mt-4">Capacidad</label>
                    <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-[#007178] focus:border-transparent">
                      <option value="">Todas las capacidades</option>
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3+">3 o más personas</option>
                    </select>
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 text-sm font-medium shadow-sm transition-all">
                      Aplicar filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button className="px-4 py-3 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-xl hover:cursor-pointer hover:from-blue-600 hover:to-green-600 flex items-center justify-center shadow-sm transition-all duration-300" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-5 w-5 mr-2" />
            <span className="font-medium">Añadir kayak</span>
          </button>
        </div>

        {filteredKayaks.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No se encontraron kayaks</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              No hay kayaks que coincidan con tu búsqueda. Intenta con otros términos o añade un nuevo kayak.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredKayaks.map((kayak) => (
            <KayakCard key={kayak.id} kayak={kayak} />
          ))}
        </div>
      </div>
      
      <AddKayakModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddKayak={handleAddKayak}/>
    </div>
  )
}

export default myKayaks;