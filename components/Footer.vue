<template>
  <footer class="flex flex-col bg-gray-50 mt-auto">
    <div
      class="container px-4 mx-auto flex flex-col gap-4 py-8 md:flex-row md:gap-36"
    >
      <div>
        <NuxtLink to="/">
          <NuxtImg
            src="/images/logo.png"
            alt="logo"
            width="120"
            loading="lazy"
          />
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-2">
        <p class="mb-2 text-lg font-semibold">Nawigacja</p>
        <NuxtLink to="/">Strona glowna</NuxtLink>
        <NuxtLink to="/seat-hopper">Znajdz połączenie</NuxtLink>
      </div>
      <div class="flex flex-col gap-2">
        <p class="mb-2 text-lg font-semibold">O nas</p>
        <NuxtLink to="/terms">Zasady bezpieczenstwa</NuxtLink>
        <NuxtLink to="/privacy">Polityka prywatności</NuxtLink>
      </div>
    </div>
    <div class="container mx-auto border-t border-gray-300 py-4 md:pb-8 px-4">
      <p class="text-cente">
        © {{ currentYear }} Stworzone przez
        <NuxtLink to="https://github.com/Jeden1102">jeden1102</NuxtLink>
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>
