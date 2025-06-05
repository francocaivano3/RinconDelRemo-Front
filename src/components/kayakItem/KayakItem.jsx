import imagePerfil from '../../assets/foto-de-perfil.png'
import imageKayak from '../../assets/pexels-robertforevr-2611696.webp'

const KayakItem = ({ nameItem, descriptionItem, image }) => {
    return (
        <div className="lg:h-39 max-w-sm w-full lg:max-w-full lg:flex rounded-xl overflow-hidden shadow-xl m-2 group transition-transform duration-500 hover:scale-101">
            <div 
                className="h-39 w-full lg:w-48 flex-none bg-cover text-center rounded-xl overflow-hidden"
                title="Woman holding a mug">
                <img
                    src={image}
                    alt={nameItem}
                    className="h-full sm:w-full flex-none rounded-l-xl transition-transform duration-500 group-hover:scale-125"
                />
            </div>
            <div className="w-full p-1 flex flex-col justify-between leading-normal">
                <div className="mb-1 p-1.5">
                    <div className="text-gray-900 font-bold mb-1">{nameItem}</div>
                    <p className="text-gray-700 text-base line-clamp-1">
                        {descriptionItem}
                    </p>
                </div>
                <div className="flex items-center justify-between gap-4 p-2">
                    <div className="flex items-center">
                        <img className="w-8 rounded-full mr-4" src={imagePerfil} alt="Avatar of Jonathan Reinink" />
                        <div className="text-sm">
                            <p className="text-gray-900 leading-none">Juan Perez</p>
                            <p className="text-gray-600">Aug 18</p>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-1.5 px-4 rounded w-20 flex justify-center items-center">
                            Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KayakItem;