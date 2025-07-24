<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import AOS from "aos";

onMounted(() => {
  AOS.init();
});
</script>
