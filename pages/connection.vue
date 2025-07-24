<template>
  <Card class="max-w-xl mx-auto min-w-135 my-40">
    <template #content>
      <AvailableConnection
        v-if="indexStore.choosenConnection"
        :result="indexStore.choosenConnection"
        variant="simple"
      />
      <div v-if="result && result.length > 0" class="my-4 flex flex-col gap-4">
        <Message
          >Na tej trasie dostępne są miejsca siedzące. Brak konieczności
          podziału trasy.</Message
        >
        <Button
          asChild
          v-slot="slotProps"
          label="Sprawdz połączenie"
          type="button"
        >
          <RouterLink to="/seat-hopper" :class="slotProps.class"
            >Wyszukaj inne połączenie</RouterLink
          >
        </Button>
      </div>
      <!-- @todo -> obsługa dzielenia tras -->
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import AvailableConnection from "~/components/AvailableConnection.vue";
import type { ConnectionSeats } from "~/server/types";

const indexStore = useIndexStore();

const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<null | ConnectionSeats[]>(null);

const route = useRoute();

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

    console.log(data, "HERE");
    result.value = data;
  } catch (err: any) {
    error.value = "An error occurred while fetching route data";
  } finally {
    loading.value = false;
  }
};

const checkChoosenConnection = () => {
  if (!indexStore.choosenConnection) {
    indexStore.setChoosenConnection(
      JSON.parse(sessionStorage.getItem("choosenConnection") as string)
    );
  }
};

onMounted(() => {
  checkChoosenConnection();
  checkConnection();
});
</script>
