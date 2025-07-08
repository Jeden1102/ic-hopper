<template>
  <div class="max-w-xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-semibold">Seat Hopper</h1>
    <div class="space-y-4">
      <AutoComplete
        v-model="form.stationFrom"
        :suggestions="stationSuggestions"
        @complete="searchStations"
        option-label="name"
        placeholder="Select departure station"
        class="w-full [&>input]:w-full"
      />

      <AutoComplete
        v-model="form.stationTo"
        :suggestions="stationSuggestions"
        @complete="searchStations"
        option-label="name"
        placeholder="Select arrival station"
        class="w-full [&>input]:w-full"
      />

      <InputText
        v-model="form.vehicleNumber"
        placeholder="Vehicle Number"
        class="w-full"
      />

      <Calendar
        v-model="form.departureDate"
        showTime
        hourFormat="24"
        placeholder="Departure Date & Time"
        class="w-full"
        :stepMinute="1"
        :showSeconds="false"
      />

      <div class="flex gap-4 items-center">
        <label class="font-medium">Category:</label>
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="form.category"
            inputId="ic"
            name="category"
            value="IC"
          />
          <label for="ic">IC</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="form.category"
            inputId="eic"
            name="category"
            value="EIC"
          />
          <label for="eic">EIC</label>
        </div>
      </div>

      <Button
        label="Submit"
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

      <div
        v-if="result"
        class="p-3 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        <h3 class="font-semibold mb-2">Route Data:</h3>
        <pre class="text-sm">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Station {
  id: string;
  name: string;
}

const form = ref({
  stationFrom: null as Station | null,
  stationTo: null as Station | null,
  vehicleNumber: "",
  departureDate: null as Date | null,
  category: "" as "IC" | "EIC" | "",
});

const stationSuggestions = ref<Station[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<any>(null);

const isFormValid = computed(() => {
  return (
    form.value.stationFrom &&
    form.value.stationTo &&
    form.value.vehicleNumber &&
    form.value.departureDate &&
    form.value.category
  );
});

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

const submitForm = async () => {
  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    const date = form.value.departureDate;
    date.setSeconds(0, 0);
    const isoDateTime = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    const payload = {
      stationFrom: form.value.stationFrom!.id,
      stationTo: form.value.stationTo!.id,
      vehicleNumber: parseInt(form.value.vehicleNumber),
      departureDate: isoDateTime.slice(0, -2),
      category: form.value.category,
    };

    const { data } = await $fetch("/api/route", {
      method: "POST",
      body: payload,
    });

    result.value = JSON.parse(data);
  } catch (err: any) {
    error.value = "An error occurred while fetching route data";
  } finally {
    loading.value = false;
  }
};
</script>
