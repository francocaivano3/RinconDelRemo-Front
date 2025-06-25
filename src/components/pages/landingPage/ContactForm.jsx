import { useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import { useAlert } from "../../context/alertContext/AlertContext";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        message: "",
    });
    const {showAlert} = useAlert();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const templateParams = {
            user_name: formData.user_name,
            user_email: formData.user_email,
            message: formData.message,
        };

        emailjs.send(
            serviceId,
            templateId,
            templateParams,
            publicKey
        ).then(
            (response) => {
                showAlert("Mensaje enviado correctamente", "success");
                setFormData({
                    user_name: "",
                    user_email: "",
                    message: "",
                });
            },
            (error) => {
                showAlert("Error al enviar el mensaje. Por favor, intenta nuevamente.", "error");
                console.error("Error al enviar el mensaje:", error);
            }
        )
    }

return (
<div className="bg-white dark:bg-[#00507A] p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl md:mx-auto mt-4">
  <h3 className="text-2xl font-bold mb-8 text-[#003459] dark:text-white">
    Envíanos un Mensaje
  </h3>
  <form className="space-y-6" onSubmit={handleSubmit}>
    <label className="block text-sm font-medium text-[#003459] dark:text-white mb-2">
      Nombre
    </label>
    <input
      type="text"
      placeholder="Juan Pérez"
      name="user_name"
      value={formData.user_name}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white focus:border-transparent transition-colors dark:placeholder:text-white"
    />
    <label className="block text-sm font-medium text-[#003459] dark:text-white mb-2">
      Email
    </label>
    <input
      placeholder="juanperez@gmail.com"
      type="email"
      name="user_email"
      value={formData.user_email}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white focus:border-transparent transition-colors dark:placeholder:text-white"
    />
    <label className="block text-sm font-medium text-[#003459] dark:text-white mb-2">
      Mensaje
    </label>
    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white focus:border-transparent transition-colors dark:placeholder:text-white"
      placeholder="Contanos còmo podemos ayudarte..."
    ></textarea>
    <button
      type="submit"
      className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
    >
      Enviar
    </button>
  </form>
</div>
)
}

export default ContactForm;