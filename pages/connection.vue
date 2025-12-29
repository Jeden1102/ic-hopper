<template>
  <Card class="max-w-xl mx-auto md:max-w-135 w-full my-10">
    <template #content>
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-start gap-4">
          <AvailableConnection
            v-if="indexStore.choosenConnection"
            :result="indexStore.choosenConnection"
            variant="simple"
            class="flex-1"
          />
          <Button
            v-if="seatHopperSegments?.length"
            variant="ghost"
            size="icon"
            @click="handleToggleBookmark(false)"
            :icon="
              isCurrentBookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'
            "
          >
          </Button>
        </div>

        <div v-if="result && result.length > 0" class="flex flex-col gap-4">
          <Message>
            Na tej trasie dostępne są miejsca siedzące. Brak konieczności
            podziału trasy.
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

        <div v-if="isLoading" class="flex flex-col gap-4">
          <Skeleton height="2rem" />
          <Skeleton height="8rem" />
        </div>

        <div
          v-if="seatHopperSegments && seatHopperSegments.length > 0"
          class="space-y-2"
        >
          <ConnectionSegments :segments="seatHopperSegments" />
          <Button
            @click="handleToggleBookmark(false)"
            variant="outline"
            class="w-full mt-4"
          >
            {{ isCurrentBookmarked ? "Usuń z zapisanych" : "Zapisz trasę" }}
          </Button>
        </div>

        <div
          v-if="
            fullRoute &&
            !seatHopperSegments?.length &&
            !result?.length &&
            !isLoading
          "
        >
          <Message variant="destructive">
            Brak możliwości podziału trasy z miejscami siedzącymi.
          </Message>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import type {
  ICRouteResponse,
  ConnectionSeats,
  SegmentWithSeat,
  RouteStation,
} from "~/server/types";

const indexStore = useIndexStore();
const route = useRoute();
const {
  generateRouteSegments,
  checkSeatsForSegments,
  findValidSeatPath,
  toggleBookmark,
  getIsBookmarked,
} = useSeatHopper();

definePageMeta({
  layout: "simple",
});

const isLoading = ref(false);
const error = ref<string | null>(null);
const result = ref<null | ConnectionSeats[]>(null);
const fullRoute = ref<null | ICRouteResponse>(null);
const seatHopperSegments = ref<SegmentWithSeat[] | null>(null);

const currentBookmarkId = computed(
  () =>
    `${route.query.vehicleNumber}-${route.query.stationFrom}-${route.query.stationTo}-${route.query.departureDate}`
);

const isCurrentBookmarked = ref(false);

const updateBookmarkStatus = () => {
  isCurrentBookmarked.value = getIsBookmarked(currentBookmarkId.value);
};

const handleToggleBookmark = (refresh = false) => {
  const payload = {
    vehicleNumber: route.query.vehicleNumber,
    departureDate: route.query.departureDate,
    arrivalDate: route.query.arrivalDate,
    stationFrom: route.query.stationFrom,
    stationTo: route.query.stationTo,
  };

  console.log(payload);

  if (seatHopperSegments.value) {
    toggleBookmark(payload, seatHopperSegments.value, refresh);
    updateBookmarkStatus();
  }
};

const checkConnection = async () => {
  isLoading.value = true;
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
    isLoading.value = false;
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

    seatHopperSegments.value = findValidSeatPath(seatsPerSegment, stations);

    if (isCurrentBookmarked.value) {
      handleToggleBookmark(true);
    }
  } catch (err) {
    error.value = "Błąd przy pobieraniu szczegółowej trasy.";
  }
};

const checkChoosenConnection = () => {
  if (!indexStore.choosenConnection) {
    const saved = sessionStorage.getItem("choosenConnection");
    if (saved) indexStore.setChoosenConnection(JSON.parse(saved));
  }
};

onMounted(() => {
  checkChoosenConnection();
  checkConnection();
  updateBookmarkStatus();
});
</script>
