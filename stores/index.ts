import { defineStore } from "pinia";
import type { ICConnection } from "~/server/types";

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

  const choosenConnection = ref<null | ICConnection>(null);

  const setChoosenConnection = (train: ICConnection) => {
    choosenConnection.value = train;
  };

  return { connectionsForm, choosenConnection, setChoosenConnection };
});
