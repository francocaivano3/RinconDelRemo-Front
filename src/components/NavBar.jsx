import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logoLight from "../../src/assets/icono.png";
import logoDark from "../../src/assets/turismo Borcelle.png";
import {ThemeContext} from "../components/context/themeContext/ThemeContext";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

const NavBar = () => {
    const { instance } = useMsal();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isDark} = useContext(ThemeContext);
    const navigate = useNavigate();

    const navLinks = [
    { name: "Inicio", href: "#home" },
    { name: "Servicios", href: "#services" },
    { name: "Galería", href: "#gallery" },
    { name: "Información", href: "#faq" },
    { name: "Contacto", href: "#contact" },
  ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleRegister = () => {
            instance.loginPopup({
                ...loginRequest,
                prompt:"create",
            }).then((response) => {
            instance.setActiveAccount(response.account);
            navigate("/dashboard");
        }).catch((error) => console.error(error)); 
    }

    const handleLogin = () => {
        console.log("Iniciar sesión");
        instance.loginPopup({
        ...loginRequest,
        prompt: "login", 
    }).then((response) => {
        instance.setActiveAccount(response.account);
        navigate("/dashboard"); 
    }).catch((error) => console.error(error));
  };

    return (<header className="flex fixed items-center justify-between w-full z-50 bg-white dark:bg-[#003459] backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center md:w-1/3">
            <div className="flex items-center">
                <img src={isDark ? logoDark : logoLight} alt="Logo" className="w-12 h-12" /><span className="font-bold text-xl text-[#007178] dark:text-white">ElRincónDelRemo</span>
            </div>
        </div>

        <button className="md:hidden text-[#007178] dark:text-white focus:outline-none mr-4" onClick={toggleMenu}>
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>

        <nav className="hidden md:flex space-x-8 mr-6 w-1/3">
            {navLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    className="text-gray-700 dark:text-white hover:text-[#007178] dark:hover:text-gray-300 transition-colors duration-300"
                >
                    {link.name}
                </a>
            ))}
        </nav>

        <div className="w-1/3 justify-end hidden md:flex">
            <button onClick={handleLogin} className="mr-4 cursor-pointer hover:text-[#007178] dark:text-white dark:hover:text-gray-300">Iniciar Sesión</button>
            <button onClick={handleRegister} className="mr-8 bg-[#04b8c5] hover:bg-[#007178] transition-colors duration-300 px-4 py-2 rounded-md text-white cursor-pointer">Registrarse</button>
        </div>

        {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#003459] shadow-md py-4 px-4">
                <nav className="flex flex-col space-y-4">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-gray-700 dark:text-white hover:text-[#007178] dark:hover:text-gray-300 transition-colors duration-300"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                        <button onClick={handleLogin} className="bg-[#007178] hover:bg-[#04b8c5] transition-colors duration-300 px-4 py-2 rounded-md text-white cursor-pointer text-center">
                            Iniciar Sesión
                        </button>
                        <button onClick={handleRegister} className="bg-[#04b8c5] hover:bg-[#007178] transition-colors duration-300 px-4 py-2 rounded-md text-white cursor-pointer text-center">
                            Registrarse
                        </button>
                    </div>
                </nav>
            </div>
        )}
    </header>)
}

export default NavBar;