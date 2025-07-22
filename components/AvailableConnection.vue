<template>
  <Card>
    <template #title>
      <div class="flex justify-between items-center">
        <span class="text-xl font-semibold">
          {{ train.kategoriaPociagu }} {{ train.nrPociagu }}
          <span v-if="train.nazwaPociagu">„{{ train.nazwaPociagu }}”</span>
        </span>
        <Tag
          icon="pi pi-stopwatch"
          :value="durationFormatted"
          severity="info"
        />
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-2">
        <div class="text-sm text-gray-600 flex items-center gap-2">
          <Icon name="material-symbols:calendar-month" size="16" />
          {{ formatDate(train.dataWyjazdu) }}
        </div>

        <div class="flex gap-2 items-center">
          <div>
            {{ formatTime(train.dataWyjazdu) }}
          </div>
          <Icon
            name="material-symbols-light:keyboard-double-arrow-right-rounded"
            size="20"
          />
          <div>
            {{ formatTime(train.dataPrzyjazdu) }}
          </div>
        </div>

        <Button
          label="Choose connection"
          size="small"
          @click="checkConnection"
          :loading="loading"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { format } from "date-fns";

import type { ICConnection } from "~/server/types";

import { useIndexStore } from "@/stores/index";

const { connectionsForm } = useIndexStore();

const props = defineProps<{ result: ICConnection }>();
console.log(props.result);
const train = props.result.pociagi[0];
const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<null>(null);
const formatDate = (dateStr: string): string =>
  format(new Date(dateStr), "PPPP");

const formatTime = (dateStr: string): string =>
  format(new Date(dateStr), "HH:mm");

const durationFormatted = `${Math.floor(train.czasJazdy / 60)}h ${
  train.czasJazdy % 60
}min`;

const checkConnection = async () => {
  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    const payload = {
      vehicleNumber: train.nrPociagu,
      departureDate: train.dataWyjazdu.replace(" ", "T"),
      arrivalDate: train.dataPrzyjazdu.replace(" ", "T"),
      stationFrom: connectionsForm.stationFrom?.id,
      stationTo: connectionsForm.stationTo?.id,
    };

    const { data } = await $fetch("/api/seats", {
      method: "POST",
      body: payload,
    });

    console.log(data, "HERE");
  } catch (err: any) {
    error.value = "An error occurred while fetching route data";
  } finally {
    loading.value = false;
  }
};
//@todo -> obsluga zwrotki po kliknieciu, jak ok to dajemy info ze jest miejsca
// jesli nie, to rzucamy request pod /api/route, pobiermay trase i dzielimy....
</script>
