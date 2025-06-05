import KayakItem from "../kayakItem/KayakItem";
import image1 from "../../assets/pexels-jonathan-lassen-1263409-2404667.webp"
import image2 from '../../assets/pexels-robertforevr-2611696.webp'
import image3 from "../../assets/imagen-de-dos-kayaks-desde-arriba.jpg"

const kayaks = [
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

const KayakList = () => {
    const kayaksMappedToShow = kayaks.map(kayakItem =>(<KayakItem
            key={kayakItem.id}
            nameItem={kayakItem.name}
            descriptionItem={kayakItem.description}
            image={kayakItem.image}
        />))


        return(
            <>
                
                <div className="flex flex-col max-w-sm w-300 lg:max-w-full rounded-xl overflow-hidden shadow-md p-4">
                    {kayaksMappedToShow}
                </div>
            </>
        )


  
}

export default KayakList;