import apiClient from "../utils/api-client";

export const climeHoy = () => apiClient.get("Weather/clima");
export const climeSemana = () => apiClient.get("Weather/week");
