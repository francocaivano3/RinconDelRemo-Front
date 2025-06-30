import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import KayakCard from "./kayakCard";
import { useTranslate } from "../../../hooks/useTranslate";
import { getKayak } from "../../../service/kayakPercha";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MyKayaks = () => {
  const translate = useTranslate();
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState([]);
  const location = useLocation();
  const handleGetAll = async () => {
    try {
      const response = await getKayak();
      setResponse(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Si viene de crear un kayak, actualizamos
    if (location.state?.shouldRefresh) {
      handleGetAll();
    }
  }, [location.state?.shouldRefresh]);

  useEffect(() => {
    handleGetAll();
  }, [location.pathname]);

  const navigate = useNavigate();

  const filteredKayaks = response.filter(
    (kayak) =>
      kayak.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kayak.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kayak.color?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#003459]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-10 relative">
          <div className="relative">
            <h1 className="text-4xl font-extrabold text-[#003459] tracking-tight dark:text-white">
              {translate("Mis Kayaks")}
            </h1>
            <p className="text-gray-500 dark:text-gray-300 max-w-2xl mt-4">
              {translate(
                "Explora y administrá tu colección personal de kayaks. Mantené un registro detallado de cada embarcación."
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center mt-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={translate("Buscar por nombre, modelo o color...")}
              className="dark:bg-[#003459] dark:text-white pl-12 pr-4 py-3 w-full bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007178] dark:focus:ring-white focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate("/perchas")}
            className="px-4 py-3 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-xl hover:cursor-pointer hover:from-blue-600 hover:to-green-600 flex items-center justify-center shadow-sm transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span className="font-medium">{translate("Añadir kayak")}</span>
          </button>
        </div>

        {filteredKayaks.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-[#003459] rounded-xl border border-dashed dark:border-none border-gray-200">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-cyan-800 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400 dark:text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-white mt-4">
              {translate("No se encontraron kayaks ❌")}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto mt-4">
              {translate(
                "No hay kayaks que coincidan con tu búsqueda. Intenta con otros términos o añade un nuevo kayak."
              )}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredKayaks.map((kayak) => (
            <KayakCard key={kayak.id} kayak={kayak} response={response} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyKayaks;
