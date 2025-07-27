<template>
  <Card
    class="mx-auto p-6 space-y-6 my-20 md:max-w-135 w-full"
    data-aos="fade-up"
  >
    <template #title>Sprawdz połączenie</template>
    <template #content>
      <div class="space-y-4">
        <div class="flex flex-col gap-2 md:flex-row">
          <AutoComplete
            v-model="connectionsForm.stationFrom"
            :suggestions="stationSuggestions"
            @complete="searchStations"
            option-label="name"
            placeholder="Stacja odjazdu"
            class="w-full [&>input]:w-full"
          />
          <button @click="swapStations">
            <Icon
              name="material-symbols-light:swap-horizontal-circle"
              class="text-primary !hidden md:!block"
              size="28"
            />
            <Icon
              name="material-symbols-light:swap-vertical-circle"
              class="text-primary md:!hidden"
              size="32"
            />
          </button>
          <AutoComplete
            v-model="connectionsForm.stationTo"
            :suggestions="stationSuggestions"
            @complete="searchStations"
            option-label="name"
            placeholder="Stacja przyjazdu"
            class="w-full [&>input]:w-full"
          />
        </div>

        <div class="flex gap-2">
          <Calendar
            v-model="connectionsForm.departureDate"
            showIcon
            fluid
            placeholder="Data wyjazdu"
            class="flex-1"
            :stepMinute="1"
            showButtonBar
            :minDate="minDate"
          />
        </div>
        <Button
          label="Wyszukaj połączenia"
          @click="submitForm"
          class="mt-4"
          :loading="loading"
          :disabled="!isFormValid"
        />

        <div
          v-if="error"
          class="p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {{ error }}
        </div>

        <div>
          <AvailableConnections
            :result="result"
            :loading="loading"
            @previous-day="handleChangeDay(-1)"
            @next-day="handleChangeDay(1)"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AvailableConnections from "~/components/AvailableConnections.vue";
import type { ICAvailableConnectionsResponse } from "~/server/types";
import { useIndexStore } from "@/stores/index";

const { connectionsForm } = useIndexStore();
interface Station {
  id: string;
  name: string;
}

const stationSuggestions = ref<Station[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<null | ICAvailableConnectionsResponse>(null);
const minDate = new Date();

const isFormValid = computed(() => {
  return (
    connectionsForm.stationFrom &&
    connectionsForm.stationTo &&
    connectionsForm.departureDate
  );
});

const swapStations = () => {
  const temp = connectionsForm.stationFrom;
  connectionsForm.stationFrom = connectionsForm.stationTo;
  connectionsForm.stationTo = temp;
};

const searchStations = async (event: { query: string }) => {
  try {
    const { data } = await useFetch<Station[]>("/api/stations", {
      query: { q: event.query },
    });
    if (data.value && data.value.length > 0) {
      stationSuggestions.value = data.value ?? [];
    }
  } catch (err) {
    console.error("Error fetching stations:", err);
  }
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const searchConnections = async (searchDate: Date) => {
  loading.value = true;
  error.value = null;
  result.value = null;

  const formattedDate = searchDate.toISOString().split("T")[0];

  try {
    const payload = {
      stationFrom: connectionsForm.stationFrom!.id,
      stationTo: connectionsForm.stationTo!.id,
      departureDate: formattedDate,
    };

    const { data } = await $fetch("/api/available-connections", {
      method: "POST",
      body: payload,
    });

    result.value = data;
  } catch (err: any) {
    error.value = "An error occurred while fetching route data";
  } finally {
    loading.value = false;
  }
};

const submitForm = async () => {
  if (!connectionsForm.departureDate) return;
  await searchConnections(connectionsForm.departureDate);
};

const handleChangeDay = async (value: number) => {
  if (!connectionsForm.departureDate) return;

  const previousDay = addDays(connectionsForm.departureDate, value);
  connectionsForm.departureDate = previousDay;
  await searchConnections(previousDay);
};
</script>
