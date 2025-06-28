import { useContext } from "react";
import imagen from "../../../assets/foto-de-perfil.png";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import { useAuth } from "../../context/authContext/AuthContext";

const Perfil = ({ onVolver }) => {
  const { isDark } = useContext(ThemeContext);
  const { userInfo, rol } = useAuth();

  const fullName = userInfo.name || "";
  const [firstName, ...lastParts] = fullName.split(" ");
  const lastName = lastParts.join(" ") || "Desconocido";

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 ${isDark ? "bg-[#003459]" : "bg-white"}`}>
      <div className={`flex flex-col md:flex-row h-fit w-full max-w-4xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden`}>
        <div className={`${isDark ? "bg-sky-900" : "bg-gray-100"} flex justify-center items-center p-8 md:w-1/3`}>
          <div className="bg-white text-teal-600 rounded-full w-40 h-40 object-cover border-4 border-[#007178] flex items-center justify-center font-bold text-4xl mr-4">
            {userInfo.name?.slice(0, 2).toUpperCase() || "US"}
          </div>
        </div>

        <div className="flex flex-col justify-center p-8 md:w-2/3">
          <h2 className="text-3xl font-bold text-[#007178] mb-6 text-center md:text-left">
            Perfil del Usuario
          </h2>

          <div>
            <p className="text-sm font-medium">Nombre</p>
            <p className="text-lg font-semibold">{firstName}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Apellido</p>
            <p className="text-lg font-semibold">{lastName}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Email</p>
            <p className="text-lg font-semibold">{userInfo.preferred_username}</p>
          </div>

          <div>
            <p className="text-sm font-medium">Rol</p>
            <p className="text-lg font-semibold">{rol}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onVolver}
              className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Perfil;
