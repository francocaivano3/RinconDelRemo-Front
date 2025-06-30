import { useEffect } from "react";
import ReservaKayakItem from "./ReservaKayakItem";
import { getEndKayakReservation } from "../../../service/kayakReservation";

const HistorialKayaks = () => {

  const handleGetEndKayaksReservations = async ()=>{
    const reservationsKayakList = await getEndKayakReservation();
  };

  useEffect(() => {
    handleGetEndKayaksReservations();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#003459]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="w-full p-4">
          <div className="mb-10 relative">
            <div className="relative">
              <h1 className="text-4xl font-extrabold text-[#003459] tracking-tight dark:text-white">Historial</h1>
              <p className="text-gray-500 dark:text-gray-300 max-w-2xl mt-4">Explora y administrá tu historial personal de kayaks.</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full m-auto">
          <ReservaKayakItem

          />
        </div>
      </div>

    </div>
  )
}

export default HistorialKayaks;