import apiClient from "../utils/api-client";

export const getPerchas = () => apiClient.get("Hanger/(GetAllHangerStatus)");
export const crearPercha = (data) => apiClient.post("Hanger/Create", data);
export const deletePerchas = (id) => apiClient.delete(`Hanger/${id}`);
