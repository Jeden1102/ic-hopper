import Aura from "@primeuix/themes/aura";

import tailwindcss from "@tailwindcss/vite";

import { definePreset } from "@primeuix/themes";
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "#00509d",
      100: "#00509d",
      200: "#00509d",
      300: "00509d}",
      400: "#00509d",
      500: "#00509d",
      600: "#00509d",
      700: "#00509d",
      800: "#00509d",
      900: "#00509d",
      950: "#00509d",
    },
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
  ],
  fonts: {
    families: [{ name: "Roboto Flex", provider: "google" }],
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          prefix: "p",
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    },
  },
});
