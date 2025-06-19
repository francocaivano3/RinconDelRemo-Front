import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { USERS_DATA } from "../../../data/Data";

const getRoleName = (role) =>
  ({
    superadmin: "Super Admin",
    encargado: "Encargado",
    arrendatario: "Arrendatario",
    dueno: "Dueño de Kayak",
  }[role]);

const getRoleColor = (role) =>
  ({
    superadmin: "bg-blue-700 text-white",
    encargado: "bg-emerald-600 text-white",
    arrendatario: "bg-yellow-500 text-white",
    dueno: "bg-purple-600 text-white",
  }[role]);

const SuperAdmin = () => {
  const [users, setUsers] = useState(USERS_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAddUser = () => {
    setSelectedUser({
      id: Date.now().toString(),
      name: "",
      email: "",
      role: "arrendatario",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!selectedUser.name.trim() || !selectedUser.email.trim()) {
      alert("Por favor, completa nombre y email.");
      return;
    }

    const exists = users.some((u) => u.id === selectedUser.id);
    if (exists) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
    } else {
      setUsers([...users, selectedUser]);
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  return (
    <div className="p-8 bg-sky-50 dark:bg-[#003459] min-h-screen font-sans text-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        <h2 className="text-4xl font-extrabold text-sky-900 dark:text-white tracking-tight">
          🌊 Usuarios del Sistema
        </h2>
        <button
          onClick={handleAddUser}
          className="inline-flex cursor-pointer items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg transition"
          aria-label="Agregar Usuario"
        >
          <Plus size={20} />
          Agregar Usuario
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 mb-8 mt-7">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-4 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 pl-11 pr-4 py-3 rounded-2xl w-full text-gray-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-slate-300 px-5 py-3 rounded-2xl w-full sm:w-1/4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
          aria-label="Filtrar por rol"
        >
          <option value="all" className="dark:bg-[#003459]">Todos los roles</option>
          <option value="superadmin" className="dark:bg-[#003459]">Super Admin</option>
          <option value="encargado" className="dark:bg-[#003459]">Encargado</option>
          <option value="arrendatario" className="dark:bg-[#003459]">Arrendatario</option>
          <option value="dueno" className="dark:bg-[#003459]">Dueño de Kayak</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border mt-24 border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-sky-100 text-sky-900 dark:bg-sky-700 dark:text-white uppercase text-xs tracking-wider select-none">
            <tr>
              {[
                "Nombre",
                "Email",
                "Rol",
                "Estado",
                "Fecha Creación",
                "Acciones",
              ].map((heading) => (
                <th key={heading} className="p-5 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr className="dark:bg-blue-950">
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-400 dark:text-white italic font-medium"
                >
                  No se encontraron usuarios
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-sky-50 dark:bg-[#003459] dark:hover:bg-sky-900 dark:text-white border-b border-gray-200 last:border-none transition"
                >
                  <td className="p-5 font-medium">{user.name}</td>
                  <td className="p-5">{user.email}</td>
                  <td className="p-5">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {getRoleName(user.role)}
                    </span>
                  </td>
                  <td className="p-5">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {user.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="p-5">{user.createdAt}</td>
                  <td className="p-5 flex gap-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 transition cursor-pointer"
                      aria-label={`Editar usuario ${user.name}`}
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-300 transition cursor-pointer"
                      aria-label={`Eliminar usuario ${user.name}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center z-50 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="bg-white dark:bg-sky-900 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative"
          onClick={(e) => e.stopPropagation() }>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
              aria-label="Cerrar modal"
            >
              <X size={24} className="dark:text-white cursor-pointer" />
            </button>
            <h3
              id="modal-title"
              className="text-2xl font-bold mb-6 text-sky-800 dark:text-white tracking-tight"
            >
              {selectedUser.id && users.some((u) => u.id === selectedUser.id)
                ? "Editar Usuario"
                : "Agregar Usuario"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser();
              }}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
                placeholder="Nombre"
                className="border border-gray-300 dark:border-white dark:text-white dark:placeholder:text-white rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-gray-900"
                required
              />
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
                placeholder="Email"
                className="border border-gray-300 dark:border-white dark:text-white dark:placeholder:text-white rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-gray-900"
                required
              />
              <select
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                className="border border-gray-300 dark:border-white dark:text-white dark:placeholder:text-white rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-gray-900"
              >
                <option value="superadmin" className="dark:bg-sky-800">Super Admin</option>
                <option value="encargado" className="dark:bg-sky-800">Encargado</option>
                <option value="arrendatario" className="dark:bg-sky-800">Arrendatario</option>
                <option value="dueno" className="dark:bg-sky-800">Dueño de Kayak</option>
              </select>
              <select
                value={selectedUser.status}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, status: e.target.value })
                }
                className="border border-gray-300 dark:border-white dark:text-white dark:placeholder:text-white rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition text-gray-900"
              >
                <option value="active" className="dark:bg-sky-800">Activo</option>
                <option value="inactive" className="dark:bg-sky-800">Inactivo</option>
              </select>
              <button
                type="submit"
                className="bg-sky-700 cursor-pointer text-white py-3 rounded-2xl font-semibold hover:bg-green-800 transition"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdmin;
