<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2
        class="text-center text-base/7 font-semibold text-primary"
        data-aos="fade-up"
      >
        Funkcje
      </h2>
      <p
        class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Jak to działa?
      </p>
      <div
        class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <!-- Feature 1 -->
        <div class="relative lg:row-span-2">
          <div
            class="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl"
          ></div>
          <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]"
          >
            <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center"
              >
                Przyjazny interfejs użytkownika
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                Przejrzysty i intuicyjny interfejs ułatwia planowanie złożonych
                podróży nawet z wieloma przesiadkami.
              </p>
            </div>
            <div class="relative w-full grow max-lg:mx-auto max-lg:max-w-sm">
              <Lottie
                animationLink="/lottie/webpage.json"
                :height="400"
                :width="400"
              />
            </div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl"
          ></div>
        </div>

        <!-- Feature 2 -->
        <div class="relative max-lg:row-start-1">
          <div
            class="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl"
          ></div>
          <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]"
          >
            <div class="px-8 pt-8 sm:px-10 sm:pt-10">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center"
              >
                Dostępność miejsc w czasie rzeczywistym
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                Natychmiastowe sprawdzanie dostępności miejsc na wszystkich
                odcinkach podróży dzięki aktualnym danym z Intercity.
              </p>
            </div>
            <div
              class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2"
            >
              <Lottie
                animationLink="/lottie/live.json"
                :height="150"
                :width="150"
              />
            </div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl"
          ></div>
        </div>

        <!-- Feature 3 -->
        <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
          <div class="absolute inset-px rounded-lg bg-white"></div>
          <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]"
          >
            <div class="px-8 pt-8 sm:px-10 sm:pt-10">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center"
              >
                Sprytne łączenie tras
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                Gdy brak miejsc na trasie bezpośredniej, aplikacja automatycznie
                wyszukuje połączenia z przesiadkami, łącząc dostępne odcinki.
              </p>
            </div>
            <div
              class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2"
            >
              <Lottie
                animationLink="/lottie/merge.json"
                :height="150"
                :width="150"
              />
            </div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5"
          ></div>
        </div>

        <!-- Feature 4 -->
        <div class="relative lg:row-span-2">
          <div
            class="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl"
          ></div>
          <div
            class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]"
          >
            <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
              <p
                class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center"
              >
                Zapisuj i udostępniaj
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                Planujesz podróż? Zapisz trasę i wróć do niej później, kiedy
                tylko chcesz. Udostępniaj swoje trasy znajomym, rodzinie lub
                współpracownikom – szybko i wygodnie, jednym kliknięciem.
              </p>
            </div>
            <div
              class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2"
            >
              <Lottie
                animationLink="/lottie/save.json"
                :height="150"
                :width="150"
              />
            </div>
          </div>
          <div
            class="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
