<template>
  <div>
    <div class="py-16 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <dl
          class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
        >
          <div
            v-for="number in numbers"
            class="mx-auto flex max-w-xs flex-col gap-y-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <dt class="text-base/7 text-gray-600">
              {{ number.title }}
            </dt>
            <dd
              class="order-first text-3xl font-semibold tracking-tight sm:text-5xl flex justify-center gap-1"
            >
              <count-up
                :end-val="number.value"
                :options="{ separator: ' ', enableScrollSpy: true }"
              /><span>+</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CountUp from "vue-countup-v3";

const numbers = [
  {
    title: "Wyszukiwań połączeń dziennie",
    value: 2000,
  },
  {
    title: "Tras analizowanych z przesiadkami",
    value: 850000,
  },
  {
    title: "Aktywnych użytkowników miesięcznie",
    value: 18500,
  },
];
</script>
