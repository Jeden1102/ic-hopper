<template>
  <div class="max-w-xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-semibold">Seat Hopper</h1>

    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      v-slot="{ values, errors }"
    >
      <div class="space-y-4">
        <FormField name="departureDate">
          <FormItem>
            <FormLabel>Data odjazdu</FormLabel>
            <FormControl>
              <Input type="datetime-local" v-model="values.departureDate" />
            </FormControl>
            <FormMessage>{{ errors.departureDate }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="arrivalDate">
          <FormItem>
            <FormLabel>Data przyjazdu</FormLabel>
            <FormControl>
              <Input type="datetime-local" v-model="values.arrivalDate" />
            </FormControl>
            <FormMessage>{{ errors.arrivalDate }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="trainNumber">
          <FormItem>
            <FormLabel>Numer pociągu</FormLabel>
            <FormControl>
              <Input type="number" v-model="values.trainNumber" />
            </FormControl>
            <FormMessage>{{ errors.trainNumber }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="fromStation">
          <FormItem>
            <FormLabel>Stacja początkowa</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger as-child>
                  <Button variant="outline" class="w-full justify-start">
                    {{ values.fromStation?.name || "Wybierz stację" }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-full">
                  <Input
                    v-model="searchFrom"
                    placeholder="Szukaj stacji..."
                    class="mb-2"
                  />
                  <div v-if="loadingFrom" class="text-sm">Ładowanie...</div>
                  <div v-else>
                    <div
                      v-for="station in filteredFrom"
                      :key="station.id"
                      @click="values.fromStation = station"
                      class="px-2 py-1 hover:bg-muted cursor-pointer rounded"
                    >
                      {{ station.name }}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage>{{ errors.fromStation }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="toStation">
          <FormItem>
            <FormLabel>Stacja docelowa</FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger as-child>
                  <Button variant="outline" class="w-full justify-start">
                    {{ values.toStation?.name || "Wybierz stację" }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-full">
                  <Input
                    v-model="searchTo"
                    placeholder="Szukaj stacji..."
                    class="mb-2"
                  />
                  <div v-if="loadingTo" class="text-sm">Ładowanie...</div>
                  <div v-else>
                    <div
                      v-for="station in filteredTo"
                      :key="station.id"
                      @click="values.toStation = station"
                      class="px-2 py-1 hover:bg-muted cursor-pointer rounded"
                    >
                      {{ station.name }}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage>{{ errors.toStation }}</FormMessage>
          </FormItem>
        </FormField>

        <Button type="submit">Szukaj miejsc</Button>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { z } from "zod";
import { watchDebounced } from "@vueuse/core";

type Station = {
  id: string;
  name: string;
};

const schema = z.object({
  departureDate: z.string().min(1, "Wymagana data odjazdu"),
  arrivalDate: z.string().min(1, "Wymagana data przyjazdu"),
  trainNumber: z.coerce.number().min(1, "Numer pociągu jest wymagany"),
  fromStation: z.object({
    id: z.string(),
    name: z.string(),
  }),
  toStation: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

const searchFrom = ref("");
const searchTo = ref("");
const stationsFrom = ref<Station[]>([]);
const stationsTo = ref<Station[]>([]);
const loadingFrom = ref(false);
const loadingTo = ref(false);

const fetchStations = async (query: string) => {
  if (!query) return [];
  return await $fetch<Station[]>(
    `/api/stations?q=${encodeURIComponent(query)}`
  );
};

const filteredFrom = ref<Station[]>([]);
const filteredTo = ref<Station[]>([]);

watchDebounced(
  searchFrom,
  async (q) => {
    loadingFrom.value = true;
    filteredFrom.value = await fetchStations(q);
    loadingFrom.value = false;
  },
  { debounce: 300 }
);

watchDebounced(
  searchTo,
  async (q) => {
    loadingTo.value = true;
    filteredTo.value = await fetchStations(q);
    loadingTo.value = false;
  },
  { debounce: 300 }
);

const onSubmit = (values: any) => {
  console.log("✅ Wysłano formularz:", {
    ...values,
    fromStationId: values.fromStation.id,
    toStationId: values.toStation.id,
  });
};
</script>

<style scoped>
/* optional styling if needed */
</style>
