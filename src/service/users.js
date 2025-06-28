import apiClient from "../utils/api-client";
export const createDuenio = (userData, config) =>
  apiClient.post("Owner/CreateOwner", userData, config);

export const createTenant = (userData, config) =>
  apiClient.post("Tenant/CreateTenant", userData, config);

export const createEncargado = (userData, config) =>
  apiClient.post("Attendant/CreateAttendant", userData, config);

export const deleteTenant = (id) =>
  apiClient.delete(`Tenant/Delete/${id}`);

