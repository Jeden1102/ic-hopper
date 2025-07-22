import { defineStore } from "pinia";

interface Station {
  id: string;
  name: string;
}

export const useIndexStore = defineStore("index", () => {
  const connectionsForm = ref({
    stationFrom: null as Station | null,
    stationTo: null as Station | null,
    departureDate: null as Date | null,
  });

  return { connectionsForm };
});
