<template>
  <Carousel
    :value="segments"
    :numVisible="1"
    :numScroll="1"
    :showNavigators="false"
  >
    <template #item="{ data }">
      <Card class="shadow-md border border-gray-200">
        <template #title>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-lg font-semibold text-gray-900">
                {{ data.from.nazwaStacji }}
              </span>
              <i class="pi pi-arrow-right mx-2 text-gray-500" />
              <span class="text-lg font-semibold text-gray-900">
                {{ data.to.nazwaStacji }}
              </span>
            </div>
            <Tag
              :value="data.standing ? 'STOJĄCE' : 'SIEDZĄCE'"
              class="!text-white"
            />
          </div>
        </template>

        <template #content>
          <div class="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
            <div>
              <p class="font-medium text-gray-500">Odjazd:</p>
              <p>{{ formatTime(data.from.dataWyjazdu) }}</p>
            </div>
            <div>
              <p class="font-medium text-gray-500">Przyjazd:</p>
              <p>{{ formatTime(data.to.dataPrzyjazdu) }}</p>
            </div>
            <div>
              <p class="font-medium text-gray-500">Peron:</p>
              <p>{{ data.from.peron ?? "–" }}</p>
            </div>
            <div>
              <p class="font-medium text-gray-500">Tor:</p>
              <p>{{ data.from.tor ?? "–" }}</p>
            </div>
          </div>

          <Divider />

          <div v-if="!data.standing" class="mt-5 flex items-center gap-20">
            <div class="flex flex-col gap-2 items-center">
              <h3 class="text-5xl">{{ data.carriageNumber }}</h3>
              <span>Wagon</span>
            </div>
            <div class="flex flex-col gap-2 items-center">
              <h3 class="text-5xl">{{ data.seatNumber }}</h3>
              <span>Miejsce</span>
            </div>
          </div>

          <div v-else class="text-sm text-gray-600 italic mt-3">
            Brak miejsc siedzących – podróż na stojąco.
          </div>
        </template>
      </Card>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import type { SegmentWithSeat } from "~/server/types";

const { segments } = defineProps<{
  segments: SegmentWithSeat[];
}>();

const formatTime = (dateString: string) => {
  return format(new Date(dateString.replaceAll("CEST", "")), "HH:mm", {
    locale: pl,
  });
};
</script>
