import apiClient from "../utils/api-client";

export const getCheckInCheckOut = () => apiClient.get("KayakReservation/GetAll");
export const getAvailableKayakId = (id) => apiClient.get(`Kayak/Id/${id}`);
export const postCheckInId = (id) => apiClient.post(`Attendant/checkin/${id}`);
export const postCheckInOut = (id) => apiClient.post(`Attendant/checkout/${id}`);
export const cancelarReserva = (id) => apiClient.put(`KayakReservation/canceled/${id}`);
