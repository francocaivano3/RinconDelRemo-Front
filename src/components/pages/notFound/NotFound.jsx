import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../../hooks/useTranslate";

const NotFound = () => {
  const navigate = useNavigate();
  const translate = useTranslate();
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-[#003459] flex items-center justify-center px-4">
      <div className="bg-white dark:bg-sky-900 shadow-lg rounded-2xl p-10 text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white mb-4">
          {translate("¡Uy! Página a la deriva")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {translate("Parece que este sitio se perdió río abajo. 🚣‍♂️")}
          <br />
          {translate("Pero no te preocupes, podés volver al inicio y retomar el rumbo.")}
        </p>
        <button
          onClick={goBack}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-full transition duration-300"
        >
          {translate("Volver a iniciar sesión")}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
