import apiClient from "../utils/api-client";

export const getKayak = () => apiClient.get("Kayak/GetAll");
export const createKayak = (data) => apiClient.post("Kayak/CreateKayak", data);
