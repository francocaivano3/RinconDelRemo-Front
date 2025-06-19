import { useState, useRef, useContext } from "react";
import imagen from "../../../assets/foto-de-perfil.png";
import { ThemeContext } from "../../context/themeContext/ThemeContext";

const Perfil = ({ onVolver }) => {
  const { isDark } = useContext(ThemeContext);

  const initialUser = {
    name: "Juan",
    lastname: "Pérez",
    phone: "3413334444",
    email: "juanperez@gmail.com",
    role: "Socio",
  };

  const [user, setUser] = useState(initialUser);
  const [originalUser, setOriginalUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const handleNameChange = (e) => setUser({ ...user, name: e.target.value });
  const handleLastnameChange = (e) => setUser({ ...user, lastname: e.target.value });
  const handlePhoneChange = (e) => setUser({ ...user, phone: e.target.value });
  const handleEmailChange = (e) => setUser({ ...user, email: e.target.value });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!nameRef.current.value) {
      valid = false;
      newErrors.name = "El nombre es obligatorio";
    }
    if (!lastnameRef.current.value) {
      valid = false;
      newErrors.lastname = "El apellido es obligatorio";
    }
    if (!phoneRef.current.value) {
      valid = false;
      newErrors.phone = "El teléfono es obligatorio";
    }
    if (!emailRef.current.value) {
      valid = false;
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      valid = false;
      newErrors.email = "El correo no es válido";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsEditing(false);
      alert("Datos actualizados correctamente");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUser(originalUser);
    setErrors({});
  };

  const handleEdit = () => {
    setOriginalUser(user);
    setIsEditing(true);
  };

  return (
    <div className={`flex items-center justify-center w-full dark:bg-[#003459]`}>      
      <div className={`flex flex-col md:flex-row h-fit ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg rounded-xl overflow-hidden w-full max-w-5xl`}>
        <div className={`${isDark ? "bg-sky-900" : "bg-gray-100"} flex justify-center items-center p-8 md:w-1/3`}>
          <img
            src={imagen}
            alt="Avatar"
            className="w-40 h-40 rounded-full object-cover border-4 border-[#007178]"
          />
        </div>

        <div className="flex flex-col justify-center p-8 md:w-2/3">
          <h2 className="text-3xl font-bold text-[#007178] mb-6 text-center md:text-left">
            Perfil del Usuario
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-sm font-medium">Nombre</p>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={handleNameChange}
                  ref={nameRef}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.name ? "border-red-500" : "border-gray-300"} dark:bg-sky-900 dark:text-white`}
                  placeholder="Ingresá tu nombre"
                />
              ) : (
                <p className="text-lg font-semibold">{user.name}</p>
              )}
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <p className="text-sm font-medium">Apellido</p>
              {isEditing ? (
                <input
                  type="text"
                  value={user.lastname}
                  onChange={handleLastnameChange}
                  ref={lastnameRef}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.lastname ? "border-red-500" : "border-gray-300"} dark:bg-sky-900 dark:text-white`}
                  placeholder="Ingresá tu apellido"
                />
              ) : (
                <p className="text-lg font-semibold">{user.lastname}</p>
              )}
              {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
            </div>

            <div>
              <p className="text-sm font-medium">Teléfono</p>
              {isEditing ? (
                <input
                  type="tel"
                  value={user.phone}
                  onChange={handlePhoneChange}
                  ref={phoneRef}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.phone ? "border-red-500" : "border-gray-300"} dark:bg-sky-900 dark:text-white`}
                  placeholder="Ingresá tu teléfono"
                />
              ) : (
                <p className="text-lg font-semibold">{user.phone}</p>
              )}
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <p className="text-sm font-medium">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={handleEmailChange}
                  ref={emailRef}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.email ? "border-red-500" : "border-gray-300"} dark:bg-sky-900 dark:text-white`}
                  placeholder="Ingresá tu correo"
                />
              ) : (
                <p className="text-lg font-semibold">{user.email}</p>
              )}
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <p className="text-sm font-medium">Rol</p>
              <p className="text-lg font-semibold">{user.role}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              {isEditing ? (
                <>
                  <button type="submit" className="bg-[#007178] text-white px-6 py-2 rounded-md hover:bg-[#335c5f] transition">
                    Guardar
                  </button>
                  <button type="button" onClick={handleCancel} className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition">
                    Cancelar
                  </button>
                </>
              ) : (
                <button type="button" onClick={handleEdit} className="bg-[#007178] text-white px-6 py-2 rounded-md hover:bg-[#335c5f] transition">
                  Editar Perfil
                </button>
              )}
              <button type="button" onClick={onVolver} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
