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

        <NuxtLink
          :to="generateConnectionLink()"
          @click="() => setChoosenConnection(result)"
          v-if="variant !== 'simple'"
        >
          <Button label="Choose connection" size="small" />
        </NuxtLink>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { format } from "date-fns";

import type { ICConnection } from "~/server/types";

import { useIndexStore } from "@/stores/index";

const { connectionsForm, setChoosenConnection } = useIndexStore();

const props = defineProps<{ result: ICConnection; variant?: string }>();
const train = props.result.pociagi[0];
const formatDate = (dateStr: string): string =>
  format(new Date(dateStr), "PPPP");

const formatTime = (dateStr: string): string =>
  format(new Date(dateStr), "HH:mm");

const durationFormatted = `${Math.floor(train.czasJazdy / 60)}h ${
  train.czasJazdy % 60
}min`;

const generateConnectionLink = () => {
  const params = new URLSearchParams({
    vehicleNumber: train.nrPociagu.toString(),
    departureDate: train.dataWyjazdu.replace(" ", "T"),
    arrivalDate: train.dataPrzyjazdu.replace(" ", "T"),
    stationFrom: connectionsForm.stationFrom?.id ?? "",
    stationTo: connectionsForm.stationTo?.id ?? "",
  });

  return `/connection?${params.toString()}`;
};

// @todo -> do forma dodac szczegoly z polami -> 1/2 klasa, miejsce przy oknie/srodek/alejka, opcja typu 'podroz w dwojke' <
// moze nie do samego forma bazowego, ale juz w szczegolach danego polaczenia
// jesli nie, to rzucamy request pod /api/route, pobiermay trase i dzielimy....
</script>
