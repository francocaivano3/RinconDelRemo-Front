import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import img from "../../../assets/imagen-de-dos-kayaks-desde-arriba.jpg";
import {ThemeContext} from "../../../components/context/themeContext/ThemeContext";

const AddKayakModal = ({ isOpen, onClose, onAddKayak }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        modelo: "",
        color: "",
        longitud: "",
        capacidad: "",
        material: "",
        fechaCompra: "",
        imagen: img,
    });

    const {isDark} = useContext(ThemeContext);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        //DALE LOS DEL BACKEND LOCOO
        onAddKayak(formData);
        onClose();
    }
    console.log("haoshd")
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
            <div className="bg-white dark:bg-[#003459] rounded-2xl shadow-xl w-full max-w-4xl z-10 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-[#32495a]">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Añadir Nuevo Kayak</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#4b5c68] transition-colors cursor-pointer">
                        <X size={20} className="text-gray-500 dark:text-white" />
                    </button>
                </div>

                <form onSubmit={handleSumbit} className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Nombre</label>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Modelo</label>
                            <input
                                type="text"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleChange}
                                className="w-full px-3 py-2 placeholder-black bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                                placeholder="Ej: X-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Color</label>
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Longitud</label>
                            <input
                                type="text"
                                name="longitud"
                                value={formData.longitud}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white placeholder-black dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                                placeholder="Ej: 3.5m"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Capacidad</label>
                            <select
                                name="capacidad"
                                value={formData.capacidad}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                                required
                            >
                                <option value="">Seleccionar capacidad</option>
                                <option value="1 persona">1 persona</option>
                                <option value="2 personas">2 personas</option>
                                <option value="3 personas">3 personas</option>
                                <option value="4+ personas">4+ personas</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Material</label>
                            <select
                                name="material"
                                value={formData.material}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                                required
                            >
                                <option value="">Seleccionar material</option>
                                <option value="Polietileno">Polietileno</option>
                                <option value="Fibra de vidrio">Fibra de vidrio</option>
                                <option value="Kevlar">Kevlar</option>
                                <option value="Carbono">Carbono</option>
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-white mb-1">Fecha de compra <svg className="h-5 w-6 ml-2 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke={isDark ? "white" : "gray"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></label>
                            <input
                                type="date"
                                name="fechaCompra"
                                value={formData.fechaCompra}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-white dark:bg-[#003459] placeholder-black dark:placeholder-gray-400 dark:text-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-transparent"
                                required
                           />
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
    )
}

export default AddKayakModal;