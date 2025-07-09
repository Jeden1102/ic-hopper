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

        <div v-if="train.zestawieniaPociagowLink" class="mt-3">
          <a
            :href="train.zestawieniaPociagowLink"
            target="_blank"
            rel="noopener"
          >
            <Button
              label="Zestawienie pociągu"
              icon="pi pi-file-pdf"
              severity="info"
              size="small"
            />
          </a>
        </div>

        <Button label="Choose connection" size="small" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { format } from "date-fns";

import type { ICConnection } from "~/server/api/types";

const props = defineProps<{ result: ICConnection }>();
const train = props.result.pociagi[0];

const formatDate = (dateStr: string): string =>
  format(new Date(dateStr), "PPPP");

const formatTime = (dateStr: string): string =>
  format(new Date(dateStr), "HH:mm");

const durationFormatted = `${Math.floor(train.czasJazdy / 60)}h ${
  train.czasJazdy % 60
}min`;

//@todo -> po kliknieciu choose connection wrzucamy request pod https://bilkom.pl/grm (trzeba zrobic endpoint pod to) zeby zobaczyc cala trase, jak ok to dajemy info ze jest miejsca
// jesli nie, to rzucamy request pod /api/route, pobiermay trase i dzielimy....
</script>
