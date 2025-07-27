<template>
  <div class="py-24 bg-primary sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <h2
        class="text-center text-lg/8 font-semibold text-white"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Zaufali nam
      </h2>
      <div
        class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
      >
        <img
          v-for="(company, idx) in companies"
          width="158"
          height="48"
          :src="company"
          alt="Company logo"
          data-aos="zoom-in"
          :data-aos-delay="idx * 100"
          class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const companies = [
  "https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg",
  "https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg",
  "https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg",
  "https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg",
  "https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg",
];
</script>
