import apiClient from "../utils/api-client";

export const getAvailableKayak = () => apiClient.get("Kayak/GetAvailableKayak");