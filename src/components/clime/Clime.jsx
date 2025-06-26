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

import WeatherWeek from "./WeatherWeek";
import { climeHoy } from "../../service/clima";

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

export default function ClimaRosario() {
  const [clima, setClima] = useState(null);
  const [error, setError] = useState(null);

  const fetchClima = async () => {
    try {
      // Clima actual
      const data = await climeHoy();
      console.log(data);
      setClima(data);
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
    <div className="p-6 max-w-5xl mx-auto space-y-8 dark:bg-transparent dark:text-white">
      {/* Clima actual */}
      {clima && (
        <div className="bg-blue-100 dark:bg-sky-900 rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">
              Clima hoy en {clima.city}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 capitalize">
              {clima.description}
            </p>
            <div className="text-3xl font-semibold mt-2">
              {Math.round(clima.temperature)}°C
            </div>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-700 dark:text-white">
              <Wind className="w-4 h-4" />
              Viento: {Math.round(clima.windSpeed)} km/h
            </div>
          </div>
          <div className="flex flex-col items-center">
            {getIcon(clima.weather[0], "w-14 h-14")}
            <p className="text-sm mt-2">
              Mín: {Math.round(clima.minTemperature)}°C / Máx:{" "}
              {Math.round(clima.maxTemperature)}°C
            </p>
          </div>
        </div>
      )}

      {/* Pronóstico semanal */}
      <WeatherWeek />
    </div>
  );
}
