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

useSeoMeta({
  title: "Seat Hopper",
  ogTitle: "Seat Hopper",
  description:
    "Nasze narzędzie sprawdza dostępność miejsc na całej trasie i pomaga znaleźć najlepsze połączenie — z miejscem siedzącym bezkonieczności rezygnacji z podróży.",
  ogDescription:
    "Nasze narzędzie sprawdza dostępność miejsc na całej trasie i pomaga znaleźć najlepsze połączenie — z miejscem siedzącym bezkonieczności rezygnacji z podróży.",
  ogImage: "/images/hero.jpg",
  twitterCard: "summary_large_image",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
});
</script>
