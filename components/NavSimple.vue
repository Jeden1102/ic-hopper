<template>
  <nav class="flex gap-4 p-4 justify-between">
    <button @click="goBack" class="flex gap-2 text-primary">
      <Icon name="material-symbols:keyboard-double-arrow-left" size="24" />
      <span class="uppercase">Powrót</span>
    </button>
    <NuxtLink to="/" class="mr-8 static">
      <NuxtImg src="/images/logo.png" alt="logo" width="120" />
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.push({ path: "/seat-hopper", query: { back: "true" } });
};
</script>
