import Aura from "@primeuix/themes/aura";

import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@primevue/nuxt-module",
  ],
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    },
  },
});
