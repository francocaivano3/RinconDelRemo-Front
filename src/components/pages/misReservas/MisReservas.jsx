import { useState } from "react"
import KayakList from "../../kayakList/KayakList";
import KayakItem from "../../kayakItem/KayakItem";

import image1 from "../../../assets/pexels-jonathan-lassen-1263409-2404667.webp"
import image2 from '../../../assets/pexels-robertforevr-2611696.webp'
import image3 from "../../../assets/imagen-de-dos-kayaks-desde-arriba.jpg"
const activeKayaks = [
    {
        id: 1,
        name: "Kayak Explorer 300",
        description: "Ideal para travesías en lagos y ríos tranquilos.",
        image: image2
    },
    {
        id: 2,
        name: "Kayak Oceanic Pro",
        description: "Diseñado para aventuras en el mar con gran estabilidad.",
        image: image1
    },
    {
        id: 3,
        name: "Kayak Urban Wave",
        description: "Compacto y perfecto para paseos cortos.",
        image: image3
    }
];
const passKayaks = [
    {
        id: 41,
        name: "Kayak Thunderbolt",
        description: "Perfecto para descensos rápidos en ríos con corriente.",
        image: image1
    },
    {
        id: 53,
        name: "Kayak Laguna Breeze",
        description: "Ideal para paseos relajados en lagunas y aguas tranquilas.",
        image: image3
    },
    {
        id: 64,
        name: "Kayak Explorer Mini",
        description: "Diseño liviano, ideal para principiantes y niños.",
        image: image2
    }
];
const MisReservas = () => {
    const [isPress, setIsPress] = useState(1)
    const kayaksToShow = isPress === 1 ? activeKayaks : passKayaks;

    const handleSetIsPress = (id) => {
        if (isPress !== id) {
            setIsPress(id);
        }
    }
    

    return (
        <div className="dark:bg-[#003459] mx-auto h-screen px-4 py-9">
            <div className="w-full p-4">
                <div className="mb-10 relative">
                    <div className="relative">
                        <h1 className="text-4xl font-extrabold text-[#003459] dark:text-white tracking-tight">Mis Reservas</h1>
                        <p className="text-gray-500 dark:text-gray-300 max-w-2xl mt-4">Explora tus reservas activas y pasadas.</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">

                <div className="flex justify-between max-w-4xl w-full bg-gray-200 rounded-xl overflow-hidden">
                    <button className={`flex justify-center items-center w-1/2 p-1 ${isPress === 1 ? 'bg-white dark:bg-sky-900 dark:text-white transition-transform duration-500 rounded-xl overflow-hidden shadow-xl border border-gray-200' : 'bg-gray-200 '} `} onClick={() => handleSetIsPress(1)}>Activas</button>
                    <button className={`flex justify-center items-center w-1/2 p-1 ${isPress === 2 ? 'bg-white dark:bg-sky-900 dark:text-white transition-transform duration-500 rounded-xl overflow-hidden shadow-xl border border-gray-200' : 'bg-gray-200 '} `} onClick={() => handleSetIsPress(2)}>Pasadas</button>
                </div>

                <div className="flex flex-col items-center max-w-sm w-300 lg:max-w-full overflow-hidden p-4">
                    {kayaksToShow.map((kayak) => (
                        <KayakItem
                            key={kayak.id}
                            nameItem={kayak.name}
                            descriptionItem={kayak.description}
                            image={kayak.image}
                        />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default MisReservas;