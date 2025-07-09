<template>
  <Card class="max-w-xl mx-auto p-6 space-y-6">
    <template #title>Seat Hopper</template>
    <template #content>
      <div class="space-y-4">
        <div class="flex gap-2">
          <AutoComplete
            v-model="form.stationFrom"
            :suggestions="stationSuggestions"
            @complete="searchStations"
            option-label="name"
            placeholder="Select departure station"
            class="w-full [&>input]:w-full"
          />
          <button @click="swapStations">
            <Icon
              name="material-symbols-light:swap-horizontal-circle"
              class="text-[#10b981]"
              size="28"
            />
          </button>
          <AutoComplete
            v-model="form.stationTo"
            :suggestions="stationSuggestions"
            @complete="searchStations"
            option-label="name"
            placeholder="Select arrival station"
            class="w-full [&>input]:w-full"
          />
        </div>

        <div class="flex gap-2">
          <Calendar
            v-model="form.departureDate"
            showIcon
            fluid
            placeholder="Departure Date"
            class="flex-1"
            :stepMinute="1"
            showButtonBar
          />
        </div>
        <Button
          label="Find connections"
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

        <div v-if="result">
          <AvailableConnections
            :result="result"
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
import type { ICAvailableConnectionsResponse } from "~/server/api/types";

interface Station {
  id: string;
  name: string;
}

const form = ref({
  stationFrom: null as Station | null,
  stationTo: null as Station | null,
  departureDate: null as Date | null,
});

const stationSuggestions = ref<Station[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<null | ICAvailableConnectionsResponse>(null);

const isFormValid = computed(() => {
  return (
    form.value.stationFrom && form.value.stationTo && form.value.departureDate
  );
});

const swapStations = () => {
  const temp = form.value.stationFrom;
  form.value.stationFrom = form.value.stationTo;
  form.value.stationTo = temp;
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
      stationFrom: form.value.stationFrom!.id,
      stationTo: form.value.stationTo!.id,
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
  if (!form.value.departureDate) return;
  await searchConnections(form.value.departureDate);
};

const handleChangeDay = async (value: number) => {
  if (!form.value.departureDate) return;

  const previousDay = addDays(form.value.departureDate, value);
  form.value.departureDate = previousDay;
  await searchConnections(previousDay);
};
</script>
