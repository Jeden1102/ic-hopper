<template>
  <div class="py-24 sm:py-32" data-aos="fade-up">
    <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-center text-base/7 font-semibold text-primary">
        Features
      </h2>
      <p
        class="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
      >
        How does it work?
      </p>
      <div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
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
                Smart Route Stitching
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                If no direct seats are available, the app automatically looks
                for alternate routes with available seating by combining
                connecting trains.
              </p>
            </div>
            <div
              class="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm"
            >
              <div
                class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl"
              >
                <img
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                  alt=""
                  class="size-full object-cover object-top"
                />
              </div>
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
                Real-time Seat Availability
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                Instantly checks seat availability across all segments of your
                journey using live Intercity data.
              </p>
            </div>
            <div
              class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2"
            >
              <img
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                alt=""
                class="w-full max-lg:max-w-xs"
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
                Passenger-friendly UX
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                Clean, intuitive interface makes planning multi-leg journeys
                simple, even when options are complex.
              </p>
            </div>
            <div
              class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2"
            >
              <img
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                alt=""
                class="h-[min(152px,40cqw)] object-cover"
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
                Integrated API for Developers
              </p>
              <p
                class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center"
              >
                Open, extensible API to integrate train searches and connections
                into third-party apps or internal systems.
              </p>
            </div>
            <div class="relative min-h-120 w-full grow">
              <div
                class="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10"
              >
                <div class="flex bg-gray-900 outline outline-white/5">
                  <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                    <div
                      class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white"
                    >
                      NotificationSetting.jsx
                    </div>
                    <div class="border-r border-gray-600/10 px-4 py-2">
                      App.jsx
                    </div>
                  </div>
                </div>
              </div>
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
