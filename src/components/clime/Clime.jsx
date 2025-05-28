import { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
  Droplets,
  CloudSun,
  Wind,
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

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const API_KEY = "013c913a0cf675b5f5594d9cc0b8f7c3";

function Clime() {
  const [clima, setClima] = useState(null);
  const [pronostico, setPronostico] = useState([]);
  const [error, setError] = useState(null);

  const fetchClima = async () => {
    try {
      // Clima actual
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=-32.9474&lon=-60.6305&units=metric&lang=es&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("Error al obtener el clima actual");
      const data = await res.json();
      setClima(data);
    } catch (err) {
      setError(err.message);
    }

    try {
      // Pronóstico extendido
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

      setPronostico(pronosticoDiario.slice(0, 5)); // 5 días
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClima();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/*  Clima actual */}
      {clima && (
        <div className="bg-blue-100 rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">
              Clima hoy en {clima.name}
            </h2>
            <p className="text-gray-700 capitalize">
              {clima.weather[0].description}
            </p>
            <div className="text-3xl font-semibold mt-2">
              {Math.round(clima.main.temp)}°C
            </div>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-700">
              <Wind className="w-4 h-4" />
              Viento: {Math.round(clima.wind.speed)} m/s
            </div>
          </div>
          <div className="flex flex-col items-center">
            {getIcon(clima.weather[0].main, "w-14 h-14")}
            <p className="text-sm mt-2">
              Mín: {Math.round(clima.main.temp_min)}°C / Máx:{" "}
              {Math.round(clima.main.temp_max)}°C
            </p>
          </div>
        </div>
      )}

      {/*Pronóstico */}
      {pronostico.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Pronóstico semanal
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pronostico.map((item, idx) => {
              const fecha = new Date(item.fecha);
              const diaNombre = diasSemana[fecha.getDay()];
              const main = item.weather.main;
              const descripcion = item.weather.description;
              const tempMin = Math.round(item.temp_min);
              const tempMax = Math.round(item.temp_max);
              const viento = item.wind_speed?.toFixed(1);
              return (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center gap-2"
                >
                  <span className="font-semibold text-lg">{diaNombre}</span>
                  {getIcon(main)}
                  <p className="capitalize text-sm text-gray-600">
                    {descripcion}
                  </p>
                  <div className="flex gap-2 text-sm">
                    <span className="text-blue-600">Min: {tempMin}°C</span>
                    <span className="text-red-600">Max: {tempMax}°C</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Wind className="w-4 h-4" />
                    {viento} m/s
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default Clime;
