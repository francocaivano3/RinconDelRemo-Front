import { colors } from "@mui/material";
import cardImg from "../../../assets/imagen de dos kayaks desde arriba.jpg";
import { Calendar, Ruler, Users, Package, Edit, Trash } from "lucide-react";
const KayakCard = ({ kayak }) => {
    const colorMap = {
        Rojo: { bg: "bg-red-500", text: "text-red-500", light: "bg-red-50", border: "border-red-200" },
        Azul: { bg: "bg-blue-500", text: "text-blue-500", light: "bg-blue-50", border: "border-blue-200" },
        Verde: { bg: "bg-emerald-500", text: "text-emerald-500", light: "bg-emerald-50", border: "border-emerald-200" },
        Amarillo: { bg: "bg-amber-500", text: "text-amber-500", light: "bg-amber-50", border: "border-amber-200" },
        Naranja: { bg: "bg-orange-500", text: "text-orange-500", light: "bg-orange-50", border: "border-orange-200" }
    }

    const colorStyle = colorMap[kayak.color] || {
        bg: "bg-gray-500",
        text: "text-gray-500",
        light: "bg-gray-50",
        border: "border-gray-200",
    }


    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div className="flex space-x-2">
                        <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors"><Edit size={16}/></button>
                        <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white transition-colors"><Trash size={16}/></button>
                    </div> 
                        <button className={`px-3 py-1.5 ${colorStyle.bg} text-white rounded-lg text-sm font-medium shadow-sm`}>Ver detalles</button>
                </div>
                        <img src={kayak.img || cardImg} alt={kayak.nombre} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className={`absolute top-4 left-4 ${colorStyle.light} ${colorStyle.text} px-2.5 py-1 rounded-full text-xs font-medium`}>
                            {kayak.modelo}
                        </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900">{kayak.nombre}</h3>
                    <div className={`flex items-center ${colorStyle.light} ${colorStyle.text} px-2.5 py-1 rounded-full text-xs font-medium`}>
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${colorStyle.bg}`}></span>
                        {kayak.color}
                    </div>                    
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center text-gray-600">
                        <Ruler size={16} className="mr-2 text-gray-400"/>
                        <span className="text-sm">{kayak.longitud}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Users size={16} className="mr-2 text-gray-400"/>
                        <span className="text-sm">{kayak.capacidad}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Package size={16} className="mr-2 text-gray-400"/>
                        <span className="text-sm">{kayak.material}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Calendar size={16} className="mr-2 text-gray-400"/>
                        <span className="text-sm">{kayak.fechaCompra}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KayakCard;