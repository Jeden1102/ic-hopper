<template>
  <div
    class="mx-auto px-4 py-6 space-y-6 my-20 md:my-30 md:max-w-135 w-full"
    data-aos="fade-up"
  >
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Zapisane trasy</h1>
    </div>

    <div v-if="bookmarks.length === 0">
      <p class="text-muted-foreground text-lg mb-6">
        Nie masz jeszcze żadnych zapisanych tras.
      </p>

      <Button
        asChild
        v-slot="slotProps"
        label="Sprawdz połączenie"
        type="button"
      >
        <RouterLink
          :to="{
            path: '/seat-hopper',
          }"
          :class="slotProps.class"
          >Wyszukaj połączenia</RouterLink
        >
      </Button>
    </div>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="bookmark in bookmarks"
        :key="bookmark.id"
        class="overflow-hidden"
      >
        <Card
          class="flex flex-col gap-4 shadow-md border border-gray-200 md:gap-6"
        >
          <template #content>
            <div class="flex justify-between items-start">
              <div>
                <div class="font-bold text-lg leading-tight">
                  {{ bookmark.segments[0].from.nazwaStacji }}
                  <i class="pi pi-arrow-right mx-2 text-gray-500" />
                  {{
                    bookmark.segments[bookmark.segments.length - 1].to
                      .nazwaStacji
                  }}
                </div>
                <div class="text-sm text-muted-foreground mt-1">
                  {{ formatDate(bookmark.connection.departureDate) }}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                @click="remove(bookmark.id)"
                class="text-destructive hover:bg-destructive/10"
                icon="pi pi-trash"
              >
              </Button>
            </div>

            <div class="bg-muted/50 rounded-lg mt-4">
              <ConnectionSegments :segments="bookmark.segments" />
            </div>
            <Button
              asChild
              v-slot="slotProps"
              label="Sprawdz połączenie"
              type="button"
            >
              <RouterLink
                :to="{
                  path: '/connection',
                  query: bookmark.connection,
                }"
                :class="slotProps.class"
                class="w-full"
                >Sprawdź aktualne połączenie</RouterLink
              >
            </Button>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { pl } from "date-fns/locale";
const { bookmarks, toggleBookmark, loadBookmarks } = useSeatHopper();

const formatDate = (dateStr: string): string =>
  format(new Date(dateStr), "PPPP H:mm", { locale: pl });

const remove = (id: string) => {
  const item = bookmarks.value.find((b) => b.id === id);
  if (item) {
    toggleBookmark(item.connection, item.segments);
  }
};

onMounted(() => {
  loadBookmarks();
});
</script>
