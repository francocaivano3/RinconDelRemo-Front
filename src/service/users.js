import apiClient from "../utils/api-client";

export const createDuenio = (userData) => apiClient.post("Owner/CreateOwner", userData);
export const createTenant = (userData) => apiClient.post("Tenant/CreateTenant", userData);
