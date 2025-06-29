import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Plus } from "lucide-react";
import KayakCard from "../myKayaks/kayakCard";
import AddKayakModal from "../myKayaks/addKayakModal";
import cardImg from "../../../assets/imagen-de-dos-kayaks-desde-arriba.jpg";
import { useNavigate } from "react-router-dom";
import { getAvailableKayak } from "../../../service/kayakDisponibles";
import { useTranslate } from "../../../hooks/useTranslate";

//EJEMPLO PARA PROBAR
// const hardcodedKayaks = [
//   {
//     id: 1,
//     nombre: "Kayak Explorer",
//     modelo: "X-200",
//     color: "Rojo",
//     longitud: "3.5m",
//     capacidad: "1 persona",
//     material: "Polietileno",
//     fechaCompra: "15/03/2023",
//     imagen: cardImg,
//   },
//   {
//     id: 2,
//     nombre: "Kayak Aventura",
//     modelo: "A-150",
//     color: "Azul",
//     longitud: "4m",
//     capacidad: "2 personas",
//     material: "Fibra de vidrio",
//     fechaCompra: "22/07/2022",
//     imagen: cardImg,
//   },
//   {
//     id: 3,
//     nombre: "Kayak Marino",
//     modelo: "M-300",
//     color: "Verde",
//     longitud: "4.2m",
//     capacidad: "1 persona",
//     material: "Polietileno",
//     fechaCompra: "10/01/2023",
//     imagen: cardImg,
//   },
//   {
//     id: 4,
//     nombre: "Kayak Rápido",
//     modelo: "R-100",
//     color: "Amarillo",
//     longitud: "3.8m",
//     capacidad: "1 persona",
//     material: "Kevlar",
//     fechaCompra: "05/11/2022",
//     imagen: cardImg,
//   },
//   {
//     id: 5,
//     nombre: "Kayak Familiar",
//     modelo: "F-250",
//     color: "Naranja",
//     longitud: "4.5m",
//     capacidad: "3 personas",
//     material: "Polietileno",
//     fechaCompra: "30/04/2023",
//     imagen: cardImg,
//   },
// ];
//


const KayaksDisponibles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kayakList, setKayakList] = useState([])
  const translate = useTranslate();
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

  const handleGetKayaksDisponibles = async () => {
  try {
    const response = await getAvailableKayak();

    const normalized = response.map(k => ({
      id: k.id,
      nombre: k.name,
      modelo: k.model,
      color: k.color,
      capacidad: k.capacity,
      longitud: k.length,
      material: k.material,
      fechaCompra: k.publicationDate.slice(0, 10),
      imagen: cardImg,
    }));

    setKayakList(normalized);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
    handleGetKayaksDisponibles();
  }, []);
  console.log("Esta es la lista de kayaks: ", kayakList)
  const filteredKayaks = kayakList.filter((kayak) => {
  const nombre = kayak?.nombre?.toLowerCase() || "";
  const modelo = kayak?.modelo?.toLowerCase() || "";
  const color = kayak?.color?.toLowerCase() || "";
  const term = searchTerm.toLowerCase();

  return (
    nombre.includes(term) ||
    modelo.includes(term) ||
    color.includes(term)
  );
});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#003459]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-10 relative">
          <div className="relative">
            <h1 className="text-4xl font-extrabold text-[#003459] tracking-tight dark:text-white">{translate("Kayaks disponibles para alquilar")}</h1>
            <p className="text-gray-500 dark:text-gray-300 max-w-2xl mt-4">{translate("Explora y reserva el kayak perfecto para vos y tu familia.")}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center mt-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder={translate("Buscar por nombre, modelo o color...")} className="dark:bg-[#003459] dark:text-white pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007178] dark:focus:ring-white focus:border-transparent shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        </div>

        {filteredKayaks.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#003459] rounded-xl border border-dashed dark:border-none border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400 dark:text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-white mt-4">{translate("No se encontraron kayaks ❌")}</h3>
            <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto mt-4">
              {translate("No hay kayaks que coincidan con tu búsqueda. Intenta con otros términos o añade un nuevo kayak.")}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredKayaks.map((kayak) => (
            <KayakCard key={kayak.id} kayak={kayak} onClick={() => setIsModalOpen(true)} />
          ))}
        </div>
      </div>
      <AddKayakModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddKayak={handleAddKayak}/>
    </div>
  )
}

export default KayaksDisponibles;