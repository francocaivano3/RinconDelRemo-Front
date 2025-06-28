import React, { useState, useEffect } from "react";
import { Trash2, Search } from "lucide-react";
import { getUserTenants, getUserOwner } from "../../../service/userAdmin";

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
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const handleShowAllUsers = async () => {
    try {
      // Hacemos las dos llamadas
      const tenantsResponse = await getUserTenants();
      const ownersResponse = await getUserOwner();

      // Agregamos los campos necesarios (ajustá los roles según corresponda)
      const tenantsWithDefaults = tenantsResponse.map((u) => ({
        ...u,
        role: "arrendatario",
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      }));

      const ownersWithDefaults = ownersResponse.map((u) => ({
        ...u,
        role: "dueno",
        status: "active",
      }));

      // Combinamos ambos arrays
      const allUsers = [...tenantsWithDefaults, ...ownersWithDefaults];

      setUsers(allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowAllUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    return matchSearch && matchRole;
  });

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
      </div>

      <div className="flex justify-center sm:flex-row gap-5 mb-8 mt-7">
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
      </div>

      {/* Botones para filtrar por rol */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setRoleFilter("all")}
          className={`px-4 py-2 rounded-2xl font-semibold transition cursor-pointer ${
            roleFilter === "all"
              ? "bg-sky-700 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setRoleFilter("superadmin")}
          className={`px-4 py-2 rounded-2xl font-semibold transition cursor-pointer ${
            roleFilter === "superadmin"
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Super Admin
        </button>
        <button
          onClick={() => setRoleFilter("encargado")}
          className={`px-4 cursor-pointer py-2 rounded-2xl font-semibold transition ${
            roleFilter === "encargado"
              ? "bg-emerald-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Encargado
        </button>
        <button
          onClick={() => setRoleFilter("dueno")}
          className={`px-4 py-2 rounded-2xl font-semibold cursor-pointer transition ${
            roleFilter === "dueno"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Dueño Kayak
        </button>
        <button
          onClick={() => setRoleFilter("arrendatario")}
          className={`px-4 py-2 rounded-2xl font-semibold transition  cursor-pointer ${
            roleFilter === "arrendatario"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          Arrendatario
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border mt-24 border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-sky-100 text-sky-900 dark:bg-sky-700 dark:text-white uppercase text-xs tracking-wider select-none">
            <tr>
              {["Nombre", "Email", "Rol", "Estado", "Acciones"].map(
                (heading) => (
                  <th key={heading} className="p-5 font-semibold">
                    {heading}
                  </th>
                )
              )}
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

                  <td className="p-5 ml-6 flex ">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex items-center  text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-300 transition cursor-pointer"
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
    </div>
  );
};

export default SuperAdmin;
