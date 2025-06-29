import apiClient from "../utils/api-client";
export const createKayakReservation = (Data, config) =>
  apiClient.post("KayakReservation/CreateReservationKayak", Data, config);