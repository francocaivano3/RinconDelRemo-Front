import { useState } from "react";
import hero from "../../../assets/pexels-emil-rajan-807502-1682744.webp";
import { Sailboat, Warehouse, UsersRound, CircleCheck } from "lucide-react";
import grid1 from "../../../assets/pexels-jonathan-lassen-1263409-2404667.webp";
import grid2 from "../../../assets/pexels-josh-hild-1270765-2422463.webp";
import grid3 from "../../../assets/pexels-robertforevr-2611696.webp";
import grid4 from "../../../assets/pexels-rachel-claire-7263721.webp";
import grid5 from "../../../assets/pexels-sabel-blanco-662810-1486581.webp";
import grid6 from "../../../assets/pexels-spencergurley-1497587.webp";
import ContactForm from "./ContactForm";
import NavBar from "../../NavBar";

const Mapa = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107134.5456582844!2d-60.696639499999996!3d-32.9522093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6539335d7d75b%3A0xec4086e90258a557!2sRosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1748814340198!5m2!1ses!2sar"
      className="mx-auto  md:w-full md:h-80 h-80 w-full "
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Mapa de Rosario"
    ></iframe>
  );
};

const LandingPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  const services = [
    {
      title: "Alquiler de Kayaks",
      description:
        "Kayaks individuales y dobles de última generación para todas las edades y niveles.",
      color: {
        bg: "bg-cyan-400",
        light: "bg-cyan-100",
        dark: "bg-cyan-600",
        text: "text-cyan-400",
        lightText: "text-cyan-100",
        darkText: "text-cyan-600",
      },
      icon: <Sailboat className="w-8 h-8 text-cyan-600" />,
      items: ["Kayaks individuales y dobles", "Equipo de seguridad incluido", "Tarifas flexibles", "Descuentos para grupos"]
    },
    {
      title: "Guardería de Kayaks",
      description:
        "Ofrecemos un servicio seguro y conveniente para almacenar tu kayak los 365 días del año.",
      color: {
        bg: "bg-yellow-400",
        light: "bg-yellow-100",
        dark: "bg-yellow-600",
        text: "text-yellow-400",
        lightText: "text-yellow-100",
        darkText: "text-yellow-600",
      },
      icon: <Warehouse className="w-8 h-8 text-yellow-600" />,
      items: ["Vigilancia 24/7", "Ambiente climatizado", "Acceso directo al agua", "Planes flexibles"]
    },
    {
      title: "Tours Guiados",
      description:
        "Descubrí los mejores lugares para remar y aprende sobre la fauna y flora local.",
      color: {
        bg: "bg-purple-400",
        light: "bg-purple-100",
        dark: "bg-purple-600",
        text: "text-purple-400",
        lightText: "text-purple-100",
        darkText: "text-purple-600",
      },
      icon: <UsersRound className="w-8 h-8 text-purple-600" />,
      items: ["Clases para principiantes", "Tours guiados", "Instructores certificados", "Grupos pequeños"]
    },
  ];

  const faqItems = [
    {
      question: "¿Qué incluye el alquiler de kayak?",
      answer:
        "El alquiler incluye el kayak, remo, chaleco salvavidas, bolsa estanca para objetos personales y una breve instrucción de seguridad. También proporcionamos mapas de las mejores rutas según tu nivel de experiencia.",
    },
    {
      question: "¿Necesito experiencia previa para alquilar un kayak?",
      answer:
        "No es necesario tener experiencia previa. Ofrecemos una instrucción básica antes de cada alquiler y tenemos kayaks estables perfectos para principiantes. También ofrecemos clases más completas si deseas aprender técnicas avanzadas.",
    },
    {
      question: "¿Cómo funciona la guardería de kayaks?",
      answer:
        "Nuestra guardería ofrece almacenamiento seguro en instalaciones climatizadas con acceso 24/7. Incluye vigilancia, seguro básico y acceso directo al agua. Ofrecemos planes mensuales, trimestrales y anuales con descuentos por períodos largos.",
    },
    {
      question: "¿Cuáles son los horarios de operación?",
      answer:
        "Estamos abiertos de lunes a domingo de 8:00 AM a 6:00 PM. Durante el verano extendemos el horario hasta las 8:00 PM. La guardería tiene acceso 24/7 para miembros con tarjeta de acceso.",
    },
    {
      question: "¿Ofrecen descuentos para grupos?",
      answer:
        "Sí, ofrecemos descuentos del 15% para grupos de 5-10 personas y 20% para grupos de más de 10 personas. También tenemos paquetes especiales para eventos corporativos, cumpleaños y excursiones escolares.",
    },
    {
      question: "¿Qué medidas de seguridad tienen?",
      answer:
        "La seguridad es nuestra prioridad. Todos los kayaks se revisan regularmente, proporcionamos chalecos salvavidas certificados, tenemos personal de rescate en el agua durante las horas pico, y ofrecemos comunicación por radio para tours largos.",
    },
  ]

  //color classes se usa para el dinamismo en los colores con tailwind porque sino no anda, aunque no se use el array hay que dejarlo
  const colorClasses = [
    "bg-cyan-400", "bg-yellow-400", "bg-purple-400",
    "bg-cyan-100", "bg-yellow-100", "bg-purple-100",
    "bg-cyan-600", "bg-yellow-600", "bg-purple-600"
  ];


  return (
    <div className="min-h-screen bg-white">
      <NavBar/>

      <main>
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <img src={hero} alt="" className="object-cover w-screen h-screen brightness-50" />

          <article className="text-white absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-3xl uppercase font-bold text-center">Aventura que fluye, <span className="text-[#04b8c5]">recuerdos</span> que quedan</h1>
            <h2 className="mt-4 uppercase">Reservá ya una experiencia inolvidable</h2>
            <div className="flex flex-col md:flex-row w-1/2 md:w-1/4 justify-between mt-8">
              <a href="#services" className="bg-[#04b8c5] hover:bg-[#007178] transition-colors duration-300 px-2 md:px-6 py-2 md:py-4 rounded-md cursor-pointer font-semibold uppercase text-center">Ver Servicios</a>
              <a href="#contact" className="bg-transparent border-1 py-2 md:px-6 md:py-4 rounded-md cursor-pointer font-semibold hover:bg-white transition-colors duration-300 hover:text-[#007178] hover:border-white uppercase mt-4 md:mt-0 text-center">Contactar</a>
            </div>
          </article>
        </section>

        <section id="services" className="py-16 dark:bg-[#003459]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Nuestros Servicios</h2>
            <div className="w-24 h-1 bg-[#04b8c5] mx-auto"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ofrecemos servicios completos para todos los amantes del kayak, desde alquiler hasta guardería y tours
              guiados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8">
            {services.map((service, index) => (
              <div className="group relative" key={index}>
                <div className={`absolute inset-0 ${service.color.bg} rounded-lg transform rotate-3 group-hover:rotate-6 transition-transform`} ></div>

                <div className="flex flex-col justify-center items-center relative bg-white p-8 rounded-lg z-10 h-full border border-gray-100 group-hover:-translate-y-2 transition-transform">
                  <div className={`w-16 h-16 ${service.color} ${service.color.light} mb-4 rounded-full flex items-center justify-center mx-auto`}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold uppercase text-xl">{service.title}</h3>
                  <p className="mt-4 text-gray-600 text-center">{service.description}</p>

                  <ul className="flex flex-col w-full mt-4">
                    {service.items.map((item, idx) => (
                      <li key={idx} className={`flex mt-2 text-gray-700`}>
                        <CircleCheck className={`mr-4 ${service.color.text}`} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="py-16 dark:bg-[#003459]">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">Galería</h2>
              <div className="w-24 h-1 bg-[#04b8c5] mx-auto"></div>
              <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-center">
                Descubrí la belleza de nuestros paisajes y la diversión de nuestros servicios a través de estas imágenes.
              </p>
            </div>

            <div className="relative">
              {/* <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-100 rounded-full opacity-50"></div>
               <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-yellow-100 rounded-full opacity-50"></div> */}

              <div className="grid grid-cols-12 gap-4 mt-8">

                <div className="col-span-12 md:col-span-8 relative overflow-hidden rounded-lg shadow-lg group h-80 mx-8 md:mx-0">
                  <img
                    src={grid2}
                    alt="Kayak en lago"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold">Explorando el lago</h3>
                      <p className="text-white/80">Ruta panorámica por el lago principal</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 relative overflow-hidden rounded-lg shadow-lg group h-80 mx-8 md:mx-0">
                  <img
                    src={grid5}
                    alt="Guardería de kayaks"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold">Nuestras instalaciones</h3>
                      <p className="text-white/80">Guardería segura y moderna</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 relative overflow-hidden rounded-lg shadow-lg group h-60 mx-8 md:mx-0">
                  <img
                    src={grid1}
                    alt="Navegación con amigos"
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4">
                      <h3 className="text-white text-lg font-bold">Navegación mágica</h3>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 relative overflow-hidden rounded-lg shadow-lg group h-60 mx-8 md:mx-0">
                  <img
                    src={grid3}
                    alt="Navegación solitaria"
                    className="object-cover transition-transform duration-500 group-hover:scale-110 h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4">
                      <h3 className="text-white text-lg font-bold">Navegación solitaria y relajante</h3>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 relative overflow-hidden rounded-lg shadow-lg group h-60 mx-8 md:mx-0">
                  <img
                    src={grid6}
                    alt="Clase de kayak"
                    className="object-cover transition-transform duration-500 group-hover:scale-110 h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4">
                      <h3 className="text-white text-lg font-bold">Clases para todos</h3>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 relative overflow-hidden rounded-lg shadow-lg group h-60 mt-0 md:mt-4 mx-8 md:mx-0">
                  <img
                    src={grid4}
                    alt="Vista panorámica"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-6">
                      <h3 className="text-white text-xl font-bold">Descubrí nuestro paraíso</h3>
                      <p className="text-white/80">Vistas panorámicas que te dejan sin aliento</p>
                    </div>
                  </div>
                </div>


              </div>


            </div>

          </div>
        </section>

        <section id="faq" className="py-16 px-4 dark:bg-[#003459]">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Preguntas Frecuentes</h2>
              <div className="w-24 h-1 bg-[#04b8c5] max-w-2xl mx-auto"></div>
              <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Resolvemos tus dudas sobre nuestros servicios de alquiler y guardería de kayaks.</p>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className={`w-full dark:bg-[#003459] flex justify-between items-center p-5 text-left font-semibold ${activeQuestion === index ? "bg-teal-50 text-teal-700 dark:bg-blue-900" : "bg-white text-gray-800"}`}
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="dark:text-white">{item.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 dark:text-white transition-transform ${activeQuestion === index ? "transform rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${activeQuestion === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="p-5 bg-white dark:bg-[#003459] border-t border-gray-100">
                      <p className="text-gray-600 dark:text-white">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 dark:bg-[#003459]">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Contacto</h2>
              <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
              <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                ¿Tienes preguntas o quieres hacer una reserva? Estamos aquí para ayudarte.
              </p>
            </div>
          </div>


          <div className="flex justify-between flex-col md:flex-row">
            <div className="md:mx-4 mx-0 w-full md:w-1/2 md:h-full p-8 bg-white dark:bg-[#00507A] rounded-lg shadow-lg mt-4">
            <div className="flex items-center flex-col text-center">
                <h4 className="font-semibold text-[#003459] text-2xl dark:text-white">Dirección</h4>
                <p className="text-[#003459] dark:text-white text-xl">
                  Puerto Rosario
                  <br />
                  Av. Costanera 1234
                </p>
            </div>
            <div className="mt-8">
              <Mapa/>
            </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  )

}

export default LandingPage;