import { useState, useRef } from "react";
import imagen from "../../../assets/foto-de-perfil.png";

const Perfil = () => {
  const initialUser = {
    name: "Juan",
    lastname: "Pérez",
    phone: "3413334444",
    email: "juanperez@gmail.com",
    role: "Socio",
  };

  const [user, setUser] = useState(initialUser);
  const [originalUser, setOriginalUser] = useState(initialUser); // Guardamos los valores originales
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Referencias a los campos
  const nameRef = useRef(null);
  const lastnameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const handleNameChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleLastnameChange = (e) => {
    setUser({ ...user, lastname: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setUser({ ...user, phone: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  //valida Formulario
  const validateForm = () => {
    var valid = true;
    const newErrors = {};

    // Validación de nombre
    if (!nameRef.current.value) {
      valid = false;
      newErrors.name = "El nombre es obligatorio";
    }

    // validación de apellido
    if (!lastnameRef.current.value) {
      valid = false;
      newErrors.lastname = "El apellido es obligatorio";
    }

    // validación de teléfono
    if (!phoneRef.current.value) {
      valid = false;
      newErrors.phone = "El teléfono es obligatorio";
    }

    // validación de email
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

  //hacer cambio
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsEditing(false);
      alert("Datos actualizados correctamente");
    }
  };

  // limpiar errores
  const handleCancel = () => {
    setIsEditing(false);
    setUser(originalUser);
    setErrors({});
  };

  // modo de edición
  const handleEdit = () => {
    setOriginalUser(user);
    setIsEditing(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-5xl">
        {/* Avatar */}
        <div className="flex justify-center items-center bg-gray-100 p-8 md:w-1/3">
          <img
            src={imagen}
            alt="Avatar"
            className="w-40 h-40 rounded-full object-cover border-4 border-[#007178]"
          />
        </div>

        {/* Info del Perfil */}
        <div className="flex flex-col justify-center p-8 md:w-2/3">
          <h2 className="text-3xl font-bold text-[#007178] mb-6 text-center md:text-left">
            Perfil del Usuario
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <p className="text-sm font-medium text-gray-600">Nombre</p>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleNameChange}
                  ref={nameRef}
                  placeholder="Ingresá tu nombre"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } hover:bg-gray-50 hover:border-[#007178] transition-colors duration-200`}
                />
              ) : (
                <p className="text-lg font-semibold">{user.name}</p>
              )}
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            {/* Apellido */}
            <div>
              <p className="text-sm font-medium text-gray-600">Apellido</p>
              {isEditing ? (
                <input
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleLastnameChange}
                  ref={lastnameRef}
                  placeholder="Ingresá tu apellido"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] ${
                    errors.lastname ? "border-red-500" : "border-gray-300"
                  } hover:bg-gray-50 hover:border-[#007178] transition-colors duration-200`}
                />
              ) : (
                <p className="text-lg font-semibold">{user.lastname}</p>
              )}
              {errors.lastname && (
                <p className="text-red-500 text-sm">{errors.lastname}</p>
              )}
            </div>

            {/*Teléfono*/}
            <div>
              <p className="text-sm font-medium text-gray-600">Teléfono</p>
              {isEditing ? (
                <input
                  type="number"
                  name="phone"
                  value={user.phone}
                  onChange={handlePhoneChange}
                  ref={phoneRef}
                  placeholder="Ingresá tu teléfono"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } hover:bg-gray-50 hover:border-[#007178] transition-colors duration-200`}
                />
              ) : (
                <p className="text-lg font-semibold">{user.phone}</p>
              )}
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            {/*Email*/}
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleEmailChange}
                  ref={emailRef}
                  placeholder="Ingresá tu correo"
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007178] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } hover:bg-gray-50 hover:border-[#007178] transition-colors duration-200`}
                />
              ) : (
                <p className="text-lg font-semibold">{user.email}</p>
              )}
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            {/*Rol*/}
            <div>
              <p className="text-sm font-medium text-gray-600">Rol</p>
              <p className="text-lg font-semibold">{user.role}</p>
            </div>

            <div className="mt-6">
              {isEditing ? (
                <div className="flex gap-4">
                  {/*Guardar*/}
                  <button
                    type="submit"
                    className="bg-[#007178] text-white px-6 py-2 rounded-md hover:bg-[#335c5f] transition"
                  >
                    Guardar
                  </button>
                  {/*Cancelar*/}
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                /*Editar Perfil*/
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-[#007178] text-white px-6 py-2 rounded-md hover:bg-[#335c5f] transition"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
