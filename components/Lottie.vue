<template>
  <client-only>
    <Vue3Lottie :animationLink :height :width />
  </client-only>
</template>

<script setup lang="ts">
import { Vue3Lottie } from "vue3-lottie";

defineProps<{
  animationLink: string;
  height: number;
  width: number;
}>();
</script>
