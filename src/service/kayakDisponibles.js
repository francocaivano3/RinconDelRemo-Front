import apiClient from "../utils/api-client";

export const getAvailableKayak = () => apiClient.get("Kayak/GetAvailableKayak");

export const disableKayak = (id) => apiClient.put(`Kayak/disable/${id}`);
