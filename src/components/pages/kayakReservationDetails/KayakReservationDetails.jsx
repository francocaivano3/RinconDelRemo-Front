import KayakCard from "../myKayaks/kayakCard";
import { useLocation } from "react-router-dom";
import { useTranslate } from "../../../hooks/useTranslate";

const KayakReservationDetails = () => {

    const translate = useTranslate();
    const location = useLocation();
    const kayak = location.state;
    return (

        <div className="min-h-screen bg-gray-50 dark:bg-[#003459]">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="w-full p-4">
                    <div className="mb-10 relative">
                        <div className="relative">
                            <h1 className="text-4xl font-extrabold text-[#003459] tracking-tight dark:text-white">{translate("Reserva de Kayak")}</h1>
                            <p className="text-gray-500 dark:text-gray-300 max-w-2xl mt-4">{translate("Datos de Reserva")}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full m-auto">
                    <KayakCard key={kayak.id} kayak={kayak} />
                </div>
            </div>
        </div>
    )
}

export default KayakReservationDetails;