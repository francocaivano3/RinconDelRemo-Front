import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import imgLight from "../../../assets/pexels-jonathan-lassen-1263409-2404667.webp";
import imgDark from "../../../assets/pexels-robertforevr-2611696.webp";
import { useAlert } from "../../context/alertContext/AlertContext";


const Register = () => {
    const {isDark, setIsDark} = useContext(ThemeContext);
    const {showAlert} = useAlert();
    const imgUrl = isDark ? imgDark : imgLight;
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: ""
    });

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(false);
      }, [imgUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.name == "a"){ //PRUEBAS PARA MOSTRAR A TODOS
            showAlert("mal", "error");
            return;
        } 
        showAlert("Registro exitoso", "success");

        //falta la logica desde el back
    }

    return (
        <div className="transition-all duration-700 flex flex-row h-full 2xl:h-screen bg-white dark:bg-[#003459] text-[#007178] dark:text-[#00A8E8]">
            <div className="h-screen w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md p-8 rounded-xl">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Registrarse
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-[#007178] dark:focus:ring-[#00a8e8]"
                                placeholder="Juan Pérez" />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-[#007178] dark:focus:ring-[#00a8e8]"
                                placeholder="3413334444" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-[#007178] dark:focus:ring-[#00a8e8]"
                                placeholder="juanperez@gmail.com" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] focus:border-[#007178] dark:focus:ring-[#00a8e8]"
                                placeholder="******"
                            />
                        </div>

                        <div className="mt-8">
                            <button type="submit" className="transition-all duration-700 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#007178] dark:bg-[#00a8e8] hover:bg-[#335c5f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007178] cursor-pointer">
                                Registrarse
                            </button>
                        </div>

                    </form>
                        <div className="text-center flex flex-col justify-center items-center dark:text-white text-[#007178] md:mt-6">
                            <p className='mt-2'>Ya tenés cuenta?</p>
                            <a href='login' className='underline mt-2 w-fit'>Iniciar Sesión</a>

                            <div className="flex items-center justify-center my-2 p-2 w-3/4">
                                <span className="border-t border-[#007178] flex-grow"></span>
                                <span className="mx-2">o</span>
                                <span className="border-t border-[#007178] flex-grow"></span>
                            </div>
                             <a href='/' className='underline w-fit mb-4'>Continua como invitado</a>
                        </div>
                </div>
            </div>

            <div className="hidden md:block md:w-1/2 bg-gray-200">
               <img src={imgUrl} alt="Kayak image" onLoad={() => setLoaded(true) } className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`} />
            </div>
        </div>
    )
}

export default Register;