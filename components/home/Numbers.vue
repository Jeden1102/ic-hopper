<template>
  <div>
    <div class="py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <dl
          class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3"
        >
          <div
            class="mx-auto flex max-w-xs flex-col gap-y-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <dt class="text-base/7 text-gray-600">
              Wyszukiwań połączeń dziennie
            </dt>
            <dd
              class="order-first text-3xl font-semibold tracking-tight sm:text-5xl flex justify-center gap-1"
            >
              <count-up
                :end-val="2000"
                :options="{ separator: ' ', enableScrollSpy: true }"
              /><span>+</span>
            </dd>
          </div>
          <div
            class="mx-auto flex max-w-xs flex-col gap-y-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <dt class="text-base/7 text-gray-600">
              Tras analizowanych z przesiadkami
            </dt>
            <dd
              class="order-first text-3xl font-semibold tracking-tight sm:text-5xl flex justify-center gap-1"
            >
              <count-up
                :end-val="850000"
                :options="{ separator: ' ', enableScrollSpy: true }"
              /><span>+</span>
            </dd>
          </div>
          <div
            class="mx-auto flex max-w-xs flex-col gap-y-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <dt class="text-base/7 text-gray-600">
              Aktywnych użytkowników miesięcznie
            </dt>
            <dd
              class="order-first text-3xl font-semibold tracking-tight sm:text-5xl flex justify-center gap-1"
            >
              <count-up
                :end-val="18500"
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
</script>
