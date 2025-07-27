<template>
  <nav
    :class="
      cn(
        'w-full h-full flex-col md:flex-row py-40  items-start -top-full fixed md:top-6 left-0 right-0 z-50 md:container mx-auto md:py-6 px-8 flex md:h-auto md:justify-between md:items-center md:rounded-2xl transition-all md:duration-300 duration-500',
        scrolled && 'backdrop-blur-md shadow-sm ',
        menuActive && 'top-0 bg-white md:bg-white/50',
        scrolled &&
          !menuActive &&
          'bg-transparent border-none shadow-none backdrop-blur-none'
      )
    "
  >
    <div
      :class="
        cn(
          'flex flex-col gap-4 justify-center md:flex-row md:items-center md:gap-12 transition-all duration-300',
          scrolled && !menuActive && 'md:-translate-y-full opacity-0'
        )
      "
    >
      <NuxtLink to="/" :class="cn('md:mr-8 fixed left-6 top-6 md:static')">
        <NuxtImg
          src="/images/logo.png"
          alt="Logo strony"
          width="180"
          height="25"
        />
      </NuxtLink>
      <NuxtLink class="font-medium text-4xl md:text-base" to="/">
        Strona główna
      </NuxtLink>
      <NuxtLink class="font-medium text-4xl md:text-base" to="/seat-hopper">
        Sprawdz połączenie
      </NuxtLink>
    </div>

    <div class="flex flex-col md:flex-row md:gap-6 items-center">
      <Button
        :class="
          cn(
            'md:hidden !fixed top-6 right-6 z-50 md:!static',
            !scrolled && 'md:!hidden'
          )
        "
        @click="menuActive = !menuActive"
        rounded
        title="Wyświetl menu"
      >
        <Icon v-if="!menuActive" name="solar:hamburger-menu-linear" />
        <Icon v-else name="material-symbols:close-rounded" />
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useWindowScroll } from "@vueuse/core";
import { cn } from "~/lib/utils";

const menuActive = ref(false);

const { y } = useWindowScroll();
const scrolled = computed(() => y.value > 20);
</script>
