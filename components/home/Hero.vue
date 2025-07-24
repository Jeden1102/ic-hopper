<template>
  <div
    class="relative min-h-[40rem] lg:min-h-screen bg-surface-0 dark:bg-surface-900 flex lg:flex-row flex-col"
  >
    <div
      class="flex lg:flex lg:flex-row flex-col justify-center md:justify-normal flex-1"
    >
      <div class="relative flex-1 z-20 flex items-center justify-center">
        <div class="flex items-center justify-center h-full">
          <div
            class="w-fit max-w-11/12 lg:max-w-2xl px-6 py-12 lg:p-12 xl:p-16 text-center rounded-2xl lg:text-left bg-white/70 backdrop-blur-sm"
          >
            <h1
              class="text-4xl xl:text-5xl font-bold text-surface-0 lg:text-surface-900 dark:text-surface-0 mb-6 !leading-tight"
            >
              <span class="block" data-aos="fade-up"
                >Zapomnij o braku miejsca w pociagu!</span
              >
            </h1>

            <p
              class="text-surface-0/90 lg:text-surface-700 dark:text-surface-200 text-xl leading-normal mb-8 max-w-xl lg:max-w-none"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Twoje połączenie jest pelne? Uzyj naszej wyszukiwarki aby znalźć
              wolne miejsca!
            </p>

            <div
              class="flex items-center gap-4 justify-center lg:justify-start"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Button
                asChild
                v-slot="slotProps"
                label="Sprawdz połączenie"
                type="button"
              >
                <RouterLink to="/seat-hopper" :class="slotProps.class"
                  >Sprawdź połączenie</RouterLink
                >
              </Button>
              <Button label="Jak to dziala?" type="button" outlined />
            </div>
          </div>
        </div>
      </div>

      <div class="absolute lg:relative inset-0 lg:inset-auto flex-1">
        <div
          class="absolute lg:hidden inset-0 bg-surface-900/60 dark:bg-surface-900/80 z-10"
        />
        <NuxtImg
          src="/images/hero.jpg"
          format="webp"
          width="920"
          class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"
        />
      </div>
    </div>
  </div>
</template>
