import apiClient from "../utils/api-client";
export const getOwner = () => apiClient.get(`Owner/GetAll`);
