import apiClient from "../utils/api-client";

//para traer los kayaks creados
export const getKayakById = () => apiClient.get("Kayak/GetAll");

export const getPerchas = () => apiClient.get("Hanger/(GetAllHangerStatus)");

export const deletePercha = (id) => apiClient.delete(`Hanger/${id}`);
