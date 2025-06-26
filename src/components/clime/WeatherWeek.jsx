import { useEffect, useState } from "react";
import WeatherWeekDay from "./WeatherWeekDay";
import { climeSemana } from "../../service/clima";
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  Droplets,
  CloudSun,
} from "lucide-react";

// Función para obtener el ícono según el clima
const getIcon = (main, size = "w-8 h-8") => {
  const className = `${size}`;
  switch (main?.toLowerCase()) {
    case "clear":
      return <Sun className={`${className} text-yellow-400`} />;
    case "clouds":
      return <Cloud className={`${className} text-gray-400`} />;
    case "drizzle":
      return <Droplets className={`${className} text-blue-400`} />;
    case "rain":
      return <CloudRain className={`${className} text-blue-500`} />;
    case "snow":
      return <Snowflake className={`${className} text-white`} />;
    case "thunderstorm":
      return <CloudLightning className={`${className} text-purple-500`} />;
    default:
      return <CloudSun className={`${className} text-gray-300`} />;
  }
};

function WeatherWeek() {
  const [pronostico, setPronostico] = useState([]);
  const [error, setError] = useState(null);

  const fetchPronostico = async () => {
    try {
      const data = await climeSemana();
      console.log("Pronóstico recibido:", data);
      setPronostico(data);
    } catch (err) {
      setError("Error al cargar el pronóstico");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPronostico();
  }, []);

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-center">
        Pronóstico semanal
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pronostico.map((item, idx) => {
          const [anio, mes, dia] = item.fecha.split("-").map(Number);
          const fechaObj = new Date(anio, mes - 1, dia);
          const fechaFormateada = fechaObj.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
          });

          const icono = getIcon(item.weatherMain);

          return (
            <WeatherWeekDay
              key={idx}
              dia={fechaFormateada}
              icono={icono}
              descripcion={item.weatherDescription}
              tempMin={Math.round(item.tempMin)}
              tempMax={Math.round(item.tempMax)}
              viento={item.windSpeed?.toFixed(1) ?? "-"}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WeatherWeek;
