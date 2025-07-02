import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import KayakCard from "../myKayaks/kayakCard";

import { getAvailableKayak } from "../../../service/kayakDisponibles";
import { useTranslate } from "../../../hooks/useTranslate";


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


  const handleGetKayaksDisponibles = async () => {
  try {
    const response = await getAvailableKayak();

    setKayakList(response);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
    handleGetKayaksDisponibles();
  }, []);
  console.log("Esta es la lista de kayaks: ", kayakList)
  const filteredKayaks = kayakList.filter((kayak) => {
  const nombre = kayak?.name?.toLowerCase() || "";
  const modelo = kayak?.model?.toLowerCase() || "";
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
    </div>
  )
}

export default KayaksDisponibles;