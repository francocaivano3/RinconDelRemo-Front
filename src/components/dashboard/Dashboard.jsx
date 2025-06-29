import { Search, Calendar } from "lucide-react";
import Clime from "../clime/Clime";
import bgImage from "../../assets/pexels-robertforevr-2611696.webp";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";

const Dashboard = () => {
  const translate = useTranslate();
  const navigate = useNavigate();

  const handleNavigateKayaksDisponibles = () => {
    navigate("/KayaksDisponibles");
  };
  return (
    <>
      <section
        className="relative text-white py-28 px-6"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-5xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
           {translate("Encontrá tu kayak perfecto")}
          </h1>
          <p className="text-base md:text-lg mb-4 max-w-xl py-4">
            {translate("Explorá nuestro catálogo de kayaks disponibles para alquilar y viví una experiencia única en el agua.")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 py-4 ">
            <button
              className="bg-white font-bold px-4 py-2 rounded-md hover:bg-gray-200 text-[#003459] w-fit cursor-pointer"
              onClick={() => handleNavigateKayaksDisponibles()}
            >
              {translate("Ver kayaks disponibles")}
            </button>
          </div>
        </div>
      </section>
      <section className="w-full mx-auto py-8 dark:bg-[#003459]">
        <Clime />
      </section>
    </>
  );
};

export default Dashboard;
