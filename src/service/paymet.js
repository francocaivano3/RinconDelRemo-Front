import apiClient from "../utils/api-client";

export const paymetMp = (data) => apiClient.post("Payments", data);
