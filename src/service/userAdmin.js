import apiClient from "../utils/api-client";

export const getUserTenants = () => apiClient.get("Tenant/GetAll");
export const getUserOwner = () => apiClient.get("Owner/GetAll");
export const getUserEncargados = () => apiClient.get("Attendant/GetAll");

export const deleteUser = (id) => apiClient.delete(`EntraIdUser/${id}`);
export const deleteSwagger = (id) =>
  apiClient.delete(`Attendant/DeleteAttendant/${id}`);
export const deleteOwnerSwagger = (id) =>
  apiClient.delete(`Owner/Delete/${id}`);
export const deleteTenantSwagger = (id) =>
  apiClient.delete(`Tenant/Delete/${id}`);

export const updateRole = (id, { appRoleId, appObjectId }) =>
  apiClient.post(`EntraIdUser/${id}`, null, {
    params: { appRoleId, appObjectId },
  });
