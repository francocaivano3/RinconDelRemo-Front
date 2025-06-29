import React, { useState, useEffect } from "react";
import { Trash2, Search, Pencil } from "lucide-react";
import {
  getUserTenants,
  getUserOwner,
  getUserEncargados,
  deleteUser,
  deleteSwagger,
  deleteOwnerSwagger,
  deleteTenantSwagger,
  updateRole,
} from "../../../service/userAdmin";
import { useTranslate } from "../../../hooks/useTranslate";
// import { useAuth } from "../../context/authContext/AuthContext";

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const translate = useTranslate();
    // const {token } = useAuth();

  const handleShowAllUsers = async () => {
    try {
      
      // const config = {
      //           headers: {
      //               Authorization: `Bearer ${token}`,
      //           },
      //       };
      // Hacemos las dos llamadas
      const tenantsResponse = await getUserTenants();
      console.log(tenantsResponse);
      const ownersResponse = await getUserOwner();
      const encargadosResponse = await getUserEncargados();


      // Agregamos los campos necesarios (ajustá los roles según corresponda)
      const tenantsWithDefaults = tenantsResponse.map((u) => ({
        ...u,
        role: "arrendatario",
        status: "active",
      }));

      const ownersWithDefaults = ownersResponse.map((u) => ({
        ...u,
        role: "dueno",
        status: "active",
      }));

      // Agregamos los campos necesarios (ajustá los roles según corresponda)
      const encargadosResponseDefault = encargadosResponse.map((u) => ({
        ...u,
        role: "encargado",
        status: "active",
      }));

      // Combinamos ambos arrays
      const allUsers = [
        ...tenantsWithDefaults,
        ...ownersWithDefaults,
        ...encargadosResponseDefault,
      ];

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
  const handleDeleteUser = async (userId, role) => {
    const confirmDelete = window.confirm(
      "¿Seguro que querés eliminar este usuario?"
    );
    if (!confirmDelete) return;

    try {
      // 1. Eliminar de Azure
      await deleteUser(userId);

      // 2. Según el rol, eliminamos del backend
      switch (role) {
        case "arrendatario":
          await deleteTenantSwagger(userId);
          break;
        case "dueno":
          await deleteOwnerSwagger(userId);
          break;
        case "encargado":
          await deleteSwagger(userId);
          break;
        default:
          console.warn("No hay endpoint de eliminación definido para este rol");
      }

      // 3. Actualizar tabla en el frontend
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Hubo un error al eliminar el usuario.");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowEditModal(true);
  };

  const handleUpdateUserRole = async () => {
    try {
      // 1. Actualizar rol en Azure
      await updateRole(selectedUser.id, newRole);

      // 3. Actualizar tabla en el frontend
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id ? { ...u, role: newRole } : u
        )
      );
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
    }
  };

  return (
    <div className="p-8 bg-sky-50 dark:bg-[#003459] min-h-screen font-sans text-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
        <h2 className="text-4xl font-extrabold text-sky-900 dark:text-white tracking-tight">
          {translate("🌊 Usuarios del Sistema")}
        </h2>
      </div>

      <div className="flex justify-center sm:flex-row gap-5 mb-8 mt-7">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-4 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder={translate("Buscar usuarios...")}
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
        {translate("Todos")}
        </button>
        <button
          onClick={() => setRoleFilter("superadmin")}
          className={`px-4 py-2 rounded-2xl font-semibold transition cursor-pointer ${
            roleFilter === "superadmin"
              ? "bg-blue-700 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {translate("Super Admin")}
        </button>
        <button
          onClick={() => setRoleFilter("encargado")}
          className={`px-4 cursor-pointer py-2 rounded-2xl font-semibold transition ${
            roleFilter === "encargado"
              ? "bg-emerald-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {translate("Encargado")}
        </button>
        <button
          onClick={() => setRoleFilter("dueno")}
          className={`px-4 py-2 rounded-2xl font-semibold cursor-pointer transition ${
            roleFilter === "dueno"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {translate("Dueño Kayak")}
        </button>
        <button
          onClick={() => setRoleFilter("arrendatario")}
          className={`px-4 py-2 rounded-2xl font-semibold transition  cursor-pointer ${
            roleFilter === "arrendatario"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {translate("Arrendatario")}
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border mt-24 border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-sky-100 text-sky-900 dark:bg-sky-700 dark:text-white uppercase text-xs tracking-wider select-none">
            <tr>
              {[translate("Nombre"), translate("Email"), translate("Rol"), translate("Estado"), translate("Acciones")].map(
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
                  {translate("No se encontraron usuarios")}
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
                      onClick={() => handleEditClick(user)}
                      className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition cursor-pointer mr-3"
                      aria-label={`Editar usuario ${user.name}`}
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user.id, user.role)}
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
        {showEditModal && (
          <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl w-[90%] sm:w-[400px] shadow-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                Editar Rol de {selectedUser.name}
              </h3>

              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-4 dark:bg-gray-800 dark:text-white"
              >
                {["dueno", "arrendatario"].includes(selectedUser.role) ? (
                  <option value="encargado">Encargado</option>
                ) : (
                  <option value={selectedUser.role} disabled>
                    Solo Dueño o Arrendatario pueden cambiar a Encargado
                  </option>
                )}
              </select>
              {!["dueno", "arrendatario"].includes(selectedUser.role) && (
                <p className="text-sm text-red-500 mb-2">
                  Solo usuarios Dueño o Arrendatario pueden cambiar a Encargado.
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleUpdateUserRole()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdmin;
