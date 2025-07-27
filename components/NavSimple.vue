<template>
  <nav class="flex gap-4 p-4 justify-between md:w-135 mx-auto w-full">
    <button
      @click="goBack"
      class="flex gap-2 text-primary md:text-xl items-center"
    >
      <Icon name="material-symbols:keyboard-double-arrow-left" size="24" />
      <span class="uppercase">Powrót</span>
    </button>
    <NuxtLink to="/" class="mr-8 static">
      <NuxtImg
        src="/images/logo.png"
        alt="Logo strony"
        width="180"
        height="25"
        class="w-30 md:w-45"
      />
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
