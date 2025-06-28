import apiClient from "../utils/api-client";

export const getUserTenants = () => apiClient.get("Tenant/GetAll");
export const getUserOwner = () => apiClient.get("Owner/GetAll");
