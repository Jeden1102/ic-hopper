<template>
  <div v-if="result">
    <div v-if="result.bledy.length > 0">
      <Message severity="info"
        >Nie znaleziono połączeń. Spróbuj ponownie.</Message
      >

      <div class="flex justify-between my-8">
        <Button
          label="Poprzedni dzień"
          icon="pi pi-angle-left"
          severity="secondary"
          @click="emit('previousDay')"
        />
        <Button
          label="Kolejny dzień"
          icon="pi pi-angle-right"
          severity="secondary"
          iconPos="right"
          @click="emit('nextDay')"
        />
      </div>
    </div>
    <div v-else>
      <AvailableConnection
        v-for="(connection, idx) in result.polaczenia"
        :key="idx"
        :result="connection"
      />
    </div>
  </div>
  <div v-if="isLoading">
    <Skeleton v-for="i in 5" class="mb-2" height="8rem"></Skeleton>
  </div>
</template>

<script setup lang="ts">
import type { ICAvailableConnectionsResponse } from "~/server/types";
import AvailableConnection from "./AvailableConnection.vue";

defineProps<{
  result: ICAvailableConnectionsResponse | null;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  previousDay: [];
  nextDay: [];
}>();
</script>
