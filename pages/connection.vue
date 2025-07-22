<template>
  <div class="max-w-xl mx-auto">
    <AvailableConnection v-if="choosenConnection" :result="choosenConnection" />
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import AvailableConnection from "~/components/AvailableConnection.vue";

const { choosenConnection } = useIndexStore();

const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<null>(null);

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
  } catch (err: any) {
    error.value = "An error occurred while fetching route data";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  checkConnection();
});
</script>
