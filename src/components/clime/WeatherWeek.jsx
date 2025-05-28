import { useEffect, useState } from "react";
import WeatherWeekDay from "./WeatherWeekDay";

import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  Droplets,
  CloudSun,
} from "lucide-react";

const getIcon = (main, size = "w-8 h-8") => {
  const className = `${size}`;
  switch (main.toLowerCase()) {
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
const API_KEY = "013c913a0cf675b5f5594d9cc0b8f7c3";

function WeatherWeek() {
  const [pronostico, setPronostico] = useState([]);
  const [error, setError] = useState(null);
  const fetchPronostico = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=-32.9474&lon=-60.6305&units=metric&lang=es&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Error al obtener el pronóstico");
      const data = await res.json();

      const agrupadosPorDia = {};
      data.list.forEach((item) => {
        const fecha = item.dt_txt.split(" ")[0];
        if (!agrupadosPorDia[fecha]) {
          agrupadosPorDia[fecha] = {
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            weather: item.weather[0],
            dt_txt: item.dt_txt,
            wind_speed: item.wind.speed,
          };
        } else {
          agrupadosPorDia[fecha].temp_min = Math.min(
            agrupadosPorDia[fecha].temp_min,
            item.main.temp_min
          );
          agrupadosPorDia[fecha].temp_max = Math.max(
            agrupadosPorDia[fecha].temp_max,
            item.main.temp_max
          );
        }
      });

      const hoy = new Date().toISOString().split("T")[0];

      const pronosticoDiario = Object.entries(agrupadosPorDia)
        .map(([fecha, datos]) => ({ fecha, ...datos }))
        .filter((dia) => dia.fecha !== hoy);
      console.log(pronosticoDiario);

      setPronostico(pronosticoDiario); // 5 días
    } catch (err) {
      setError(err.message);
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

          // Crear una fecha local
          const fechaObj = new Date(anio, mes - 1, dia);
          const fechaFormateada = fechaObj.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
          });
          const icono = getIcon(item.weather.main);
          return (
            <WeatherWeekDay
              key={idx}
              dia={fechaFormateada}
              icono={icono}
              descripcion={item.weather.description}
              tempMin={Math.round(item.temp_min)}
              tempMax={Math.round(item.temp_max)}
              viento={item.wind_speed?.toFixed(1) ?? "-"}
            />
          );
        })}
      </div>
    </div>
  );
}
export default WeatherWeek;
