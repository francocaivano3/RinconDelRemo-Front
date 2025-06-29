import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../context/authContext/AuthContext";
import { createKayak } from "../../../service/kayakPercha";

const AddKayakModal = ({ isOpen, onClose, perchaId }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    modelo: "",
    color: "",
    longitud: "",
    capacidad: "",
    material: "",
  });

  const { userInfo } = useAuth();
  console.log("🚀 ~ AddKayakModal ~ userInfo:", userInfo.oid);
  console.log("🚀 ~ AddKayakModal ~ perchaId:", perchaId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const kayakData = {
        name: formData.nombre,
        model: formData.modelo,
        color: formData.color,
        capacity: parseInt(formData.capacidad),
        length: formData.longitud.replace(/[^\d.]/g, ""),
        material: parseInt(formData.material),
        publicationDate: new Date().toISOString(),
        ownerId: String(userInfo.oid),
        hangerId: parseInt(perchaId),
      };

      console.log("Datos a enviar:", kayakData);
      await createKayak(kayakData);
      console.log("Kayak creado exitosamente");
      onClose();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error detalle backend:", error.response.data);
        alert(`Error backend: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Error al crear el kayak:", error);
        alert(
          "Error al crear el kayak. Por favor, verifica los datos ingresados."
        );
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="my-auto overflow-auto md:py-0 fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white dark:bg-[#003459] py-10 overflow-auto rounded-2xl mb-4 md:mb-0 shadow-xl w-full z-10 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-[#6b8faa]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Añadir Nuevo Kayak
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#4b5c68] transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500 dark:text-white" />
          </button>
        </div>

        <form onSubmit={handleSumbit} className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                placeholder="Nombre del kayak"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Modelo
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                placeholder="Ej: X-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Color
              </label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                required
              >
                <option value="">Seleccionar color</option>
                <option value="Rojo">Rojo</option>
                <option value="Azul">Azul</option>
                <option value="Verde">Verde</option>
                <option value="Amarillo">Amarillo</option>
                <option value="Naranja">Naranja</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Longitud
              </label>
              <input
                type="text"
                name="longitud"
                value={formData.longitud}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white placeholder-black dark:bg-[#003459] dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                placeholder="Ej: 3.5m"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Capacidad
              </label>
              <div>
                <input
                  type="number"
                  name="capacidad"
                  value={formData.capacidad}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                  min="1"
                  required
                  placeholder="Número de personas"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Material
              </label>
              <select
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                required
              >
                <option value="">Seleccionar material</option>
                <option value="0">Polietileno</option>
                <option value="1">Fibra de vidrio</option>
                <option value="2">Kevlar</option>
                <option value="3">Carbono</option>
                <option value="4">Otros</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-red-500 transition-colors duration-300 font-medium cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-green-600 font-medium shadow-sm cursor-pointer"
            >
              Guardar Kayak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKayakModal;
