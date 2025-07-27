<template>
  <Card class="max-w-xl mx-auto md:max-w-135 w-full my-10 md:my-40">
    <template #content>
      <AvailableConnection
        v-if="indexStore.choosenConnection"
        :result="indexStore.choosenConnection"
        variant="simple"
      />

      <div v-if="result && result.length > 0" class="my-4 flex flex-col gap-4">
        <Message>
          Na tej trasie dostępne są miejsca siedzące. Brak konieczności podziału
          trasy.
        </Message>
        <Button
          asChild
          v-slot="slotProps"
          label="Sprawdź połączenie"
          type="button"
        >
          <RouterLink to="/seat-hopper" :class="slotProps.class">
            Wyszukaj inne połączenie
          </RouterLink>
        </Button>
      </div>

      <div
        v-if="seatHopperSegments && seatHopperSegments.length > 0"
        class="my-4 space-y-2"
      >
        <Message>Podzielona trasa z dostępnością miejsc:</Message>
        <ul class="text-sm text-gray-800">
          <li
            v-for="segment in seatHopperSegments"
            :key="segment.from.kodStacji"
          >
            {{ segment.from.nazwaStacji }} → {{ segment.to.nazwaStacji }} —
            <span v-if="segment.standing"
              >Brak miejsc — przejazd na stojąco</span
            >
            <span v-else
              >Wagon {{ segment.carriageNumber }}, miejsce
              {{ segment.seatNumber }}</span
            >
          </li>
        </ul>
      </div>

      <div
        v-if="fullRoute && !seatHopperSegments?.length && !result?.length"
        class="mt-4"
      >
        <Message variant="destructive"
          >Brak możliwości podziału trasy z miejscami siedzącymi.</Message
        >
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import { useSeatHopper } from "@/composables/useSeatHopper";
import AvailableConnection from "~/components/AvailableConnection.vue";
import { useWindowSize } from "@vueuse/core";
import type { ICRouteResponse } from "~/server/types";
import type { ConnectionSeats } from "~/server/types";
import type { SegmentWithSeat, RouteStation } from "~/server/types";

const { width } = useWindowSize();
const indexStore = useIndexStore();

definePageMeta({
  layout: width.value < 768 ? "simple" : "default",
});

const route = useRoute();

const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<null | ConnectionSeats[]>(null);
const fullRoute = ref<null | ICRouteResponse>(null);
const seatHopperSegments = ref<SegmentWithSeat[] | null>(null);

const { generateRouteSegments, checkSeatsForSegments, findValidSeatPath } =
  useSeatHopper();

const checkConnection = async () => {
  loading.value = true;
  error.value = null;
  result.value = null;

  try {
    const payload = {
      vehicleNumber: route.query.vehicleNumber,
      departureDate: route.query.departureDate,
      arrivalDate: route.query.arrivalDate,
      stationFrom: route.query.stationFrom,
      stationTo: route.query.stationTo,
    };

    const { data } = await $fetch("/api/seats", {
      method: "POST",
      body: payload,
    });

    result.value = data as ConnectionSeats[];

    if (!result.value || result.value.length === 0) {
      await getFullRouteAndSegmentedSeats();
    }
  } catch (err: any) {
    error.value = "Wystąpił błąd przy sprawdzaniu dostępności miejsc.";
  } finally {
    loading.value = false;
  }
};

const getFullRouteAndSegmentedSeats = async () => {
  try {
    const payload = {
      vehicleNumber: route.query.vehicleNumber,
      departureDate: route.query.departureDate,
      stationFrom: route.query.stationFrom,
      stationTo: route.query.stationTo,
    };

    const { data } = await $fetch("/api/route", {
      method: "POST",
      body: payload,
    });

    fullRoute.value = data as ICRouteResponse;

    const stations = fullRoute.value.trasePrzejezdu
      .trasaPrzejazdu as RouteStation[];

    if (!stations || stations.length === 0) return;

    const segments = generateRouteSegments(stations);
    const seatsPerSegment = await checkSeatsForSegments(
      segments,
      route.query.vehicleNumber as string,
      route.query.departureDate as string
    );

    const finalPath = findValidSeatPath(seatsPerSegment, stations);
    seatHopperSegments.value = finalPath;
  } catch (err) {
    error.value =
      "Błąd przy pobieraniu szczegółowej trasy lub dostępnych miejsc.";
  }
};

const checkChoosenConnection = () => {
  if (!indexStore.choosenConnection) {
    const saved = sessionStorage.getItem("choosenConnection");
    if (saved) {
      indexStore.setChoosenConnection(JSON.parse(saved));
    }
  }
};

onMounted(() => {
  checkChoosenConnection();
  checkConnection();
});
</script>
