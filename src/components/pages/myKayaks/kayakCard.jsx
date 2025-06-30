import cardImg from "../../../assets/imagen-de-dos-kayaks-desde-arriba.jpg";
import { Calendar, Ruler, Users, Package, Edit, Trash } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createKayakReservation } from "../../../service/kayakReservation";
import { useAuth } from "../../context/authContext/AuthContext";
import { disableKayak, enableKayak } from "../../../service/kayakDisponibles";
import { useAlert } from "../../context/alertContext/AlertContext";

const KayakCard = ({ kayak }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, token } = useAuth();
  const { showAlert } = useAlert();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  const stringNow = now.toISOString();
  const stringOneHourLater = oneHourLater.toISOString();

  const data = {
    fechaInicio: stringNow,
    fechaFin: stringOneHourLater,
    kayakId: kayak.id,
    tenantId: userInfo.oid,
  };

  const handleReservationCofirm = async () => {
    try {
      await createKayakReservation(data, config);
      await disableKayak(kayak.id);
      setShowEditModal(false);
      showAlert("Registro exitoso", "success");
    } catch (err) {
      console.error(err);
      showAlert("Error al reservar el kayak", "error");
    }
  };

  const handleEnableKayak = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("🚀 ~ handleEnableKayak ~ kayak.id:", kayak.id);
      await enableKayak(kayak.id, config);
      console.log("Kayak habilitado correctamente", kayak.id);
      showAlert("✅ Kayak habilitado correctamente", "success");
    } catch (error) {
      console.error("Error al habilitar kayak:", error);
      showAlert("❌ No se pudo habilitar el kayak", "error");
    }

  };

  const colorMap = {
    Rojo: {
      bg: "bg-red-500",
      text: "text-red-500",
      light: "bg-red-50",
      border: "border-red-200",
    },
    Azul: {
      bg: "bg-blue-500",
      text: "text-blue-500",
      light: "bg-blue-50",
      border: "border-blue-200",
    },
    Verde: {
      bg: "bg-emerald-500",
      text: "text-emerald-500",
      light: "bg-emerald-50",
      border: "border-emerald-200",
    },
    Amarillo: {
      bg: "bg-amber-500",
      text: "text-amber-500",
      light: "bg-amber-50",
      border: "border-amber-200",
    },
    Naranja: {
      bg: "bg-orange-500",
      text: "text-orange-500",
      light: "bg-orange-50",
      border: "border-orange-200",
    },
  };

  const colorStyle = colorMap[kayak.color] || {
    bg: "bg-gray-500",
    text: "text-gray-500",
    light: "bg-gray-50",
    border: "border-gray-200",
  };

  return (
    <div
      className="bg-white dark:bg-sky-900 rounded-xl shadow-md hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-none group"
      onClick={() => {
        if (location.pathname === "/KayaksDisponibles") {
          navigate(`/KayaksDisponibles/Reserva/${kayak.id}`, { state: kayak });
        }
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="flex space-x-2">
            <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors">
              <Edit size={16} />
            </button>
            <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors">
              <Trash size={16} />
            </button>
          </div>
          <button
            className={`px-3 py-1.5 ${colorStyle.bg} text-white rounded-lg text-sm font-medium shadow-sm`}
          >
            Ver detalles
          </button>
        </div>
        <img
          src={cardImg}
          alt={kayak.nombre}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute top-4 left-4 ${colorStyle.light} ${colorStyle.text} px-2.5 py-1 rounded-full text-xs font-medium`}
        >
          {kayak.modelo} {kayak.model}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 dark:text-white dark:group-hover:text-gray-300">
            {kayak.nombre} {kayak.name}
          </h3>
          <div
            className={`flex items-center ${colorStyle.light} ${colorStyle.text} px-2.5 py-1 rounded-full text-xs font-medium`}
          >
            <span
              className={`inline-block w-2 h-2 rounded-full mr-1.5 ${colorStyle.bg}`}
            ></span>
            {kayak.color}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Ruler size={18} className="mr-2 text-gray-400 dark:text-white" />
            <span className="text-sm">
              {kayak.longitud} {kayak.length}{" "}
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Users size={18} className="mr-2 text-gray-400 dark:text-white" />
            <span className="text-sm">
              {kayak.capacidad} {kayak.capacity}{" "}
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Package size={18} className="mr-2 text-gray-400 dark:text-white" />
            <span className="text-sm">{kayak.material}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar
              size={18}
              className="mr-2 text-gray-400 dark:text-white"
            />
            <span className="text-sm">
              {kayak.fechaCompra
                ? new Date(kayak.fechaCompra).toLocaleDateString("es-AR")
                : kayak.publicationDate
                ? new Date(kayak.publicationDate).toLocaleDateString("es-AR")
                : "-"}
            </span>
          </div>
        </div>

        {/* Disponibilidad */}
        {location.pathname === "/mis-kayaks" && (
          <div className="mt-4">
            {kayak.isAvailable ? (
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">
                Disponible
              </span>
            ) : (
              <button
                onClick={handleEnableKayak}
                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700"
              >
                Habilitar Kayak
              </button>
            )}
          </div>
        )}

        {/* Botón para reservar */}
        {location.pathname.startsWith("/KayaksDisponibles/Reserva/") && (
          <div>
          <button
            className="bg-[#003459] dark:bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-1.5 px-4 rounded w-20 flex justify-center items-center mt-5"
            onClick={() => handleEditClick()}
          >
            Reservar
          </button>
          <button
            className="bg-[#003459] dark:bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-1.5 px-4 rounded w-20 flex justify-center items-center mt-5"
            onClick={ () => navigate("/KayaksDisponibles")}
          >
            Cancelar
          </button>
          </div>
        )}

        {/* Modal */}
        {showEditModal && (
          <>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"></div>
            <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl w-[90%] sm:w-[900px] shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Confirmar reserva del kayak : {kayak.nombre}
                </h3>
                <div className="grid grid-cols-2 gap-3 m-7">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Ruler
                      size={18}
                      className="mr-2 text-gray-400 dark:text-white"
                    />
                    <span className="text-sm">{kayak.longitud}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users
                      size={18}
                      className="mr-2 text-gray-400 dark:text-white"
                    />
                    <span className="text-sm">{kayak.capacidad} </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Package
                      size={18}
                      className="mr-2 text-gray-400 dark:text-white"
                    />
                    <span className="text-sm">{kayak.material}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar
                      size={18}
                      className="mr-2 text-gray-400 dark:text-white"
                    />
                    <span className="text-sm">{kayak.fechaCompra}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar
                      size={18}
                      className="mr-2 text-gray-400 dark:text-white"
                    />
                    <span className="text-sm">
                      Tu reserva comienza: {stringNow}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar
                      size={18}
                      className="mr-2 text-gray-400 dark:text-white"
                    />
                    <span className="text-sm">
                      Tu reserva finaliza: {stringOneHourLater}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleReservationCofirm}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KayakCard;
