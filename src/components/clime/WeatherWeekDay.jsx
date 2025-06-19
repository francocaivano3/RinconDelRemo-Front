import { Wind } from "lucide-react";
import PropTypes from "prop-types";
function WeatherWeekDay({ dia, icono, descripcion, tempMin, tempMax, viento }) {
  return (
    <div className="bg-white dark:bg-sky-900 shadow-md rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-300">
      <span className="font-semibold text-lg">{dia}</span>
      {icono}
      <p className="capitalize text-sm text-gray-600 dark:text-white">{descripcion}</p>
      <div className="flex gap-2 text-sm">
        <span className="text-blue-600 dark:text-blue-400">Min: {tempMin}°C</span>
        <span className="text-red-600 dark:text-red-400">Max: {tempMax}°C</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-white">
        <Wind className="w-4 h-4" />
        {viento} km/h
      </div>
    </div>
  );
}
WeatherWeekDay.propTypes = {
  day: PropTypes.string,
  icon: PropTypes.element,
  description: PropTypes.string,
  tempMin: PropTypes.number,
  tempMax: PropTypes.number,
};

export default WeatherWeekDay;
