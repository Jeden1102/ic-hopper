import type {
  RouteStation,
  SegmentWithSeat,
  ConnectionSeats,
} from "~/server/types";

export interface Bookmark {
  id: string;
  addedAt: string;
  connection: any;
  segments: SegmentWithSeat[];
}

export function useSeatHopper() {
  const bookmarks = ref<Bookmark[]>([]);

  function generateRouteSegments(stations: RouteStation[]) {
    const segments: [RouteStation, RouteStation][] = [];
    for (let i = 0; i < stations.length - 1; i++) {
      for (let j = i + 1; j < stations.length; j++) {
        segments.push([stations[i], stations[j]]);
      }
    }
    return segments;
  }

  async function checkSeatsForSegments(
    segments: [RouteStation, RouteStation][],
    vehicleNumber: string,
    departureDate: string
  ): Promise<
    { from: RouteStation; to: RouteStation; seats: ConnectionSeats[] }[]
  > {
    const requests = segments.map(async ([from, to]) => {
      try {
        const seats = await $fetch<ConnectionSeats[]>("/api/seats", {
          method: "POST",
          body: {
            vehicleNumber,
            departureDate,
            stationFrom: from.kodStacji,
            stationTo: to.kodStacji,
          },
        });
        return { from, to, seats };
      } catch (err) {
        return { from, to, seats: [] };
      }
    });
    return await Promise.all(requests);
  }

  function findValidSeatPath(
    seatsPerSegment: { from: RouteStation; to: RouteStation; seats: any }[],
    stations: RouteStation[]
  ): SegmentWithSeat[] {
    const path: SegmentWithSeat[] = [];
    let currentIndex = 0;

    while (currentIndex < stations.length - 1) {
      let matched = false;
      for (let j = stations.length - 1; j > currentIndex; j--) {
        const from = stations[currentIndex];
        const to = stations[j];
        const match = seatsPerSegment.find(
          (s) =>
            s.from.kodStacji === from.kodStacji &&
            s.to.kodStacji === to.kodStacji &&
            s.seats.data?.length > 0
        );

        if (match) {
          const seat = match.seats.data[0];
          const place = seat.availableSeats[0];
          path.push({
            from,
            to,
            carriageNumber: seat.carriageNumber,
            seatNumber: place.number,
            standing: false,
          });
          currentIndex = j;
          matched = true;
          break;
        }
      }

      if (!matched) {
        path.push({
          from: stations[currentIndex],
          to: stations[currentIndex + 1],
          carriageNumber: null,
          seatNumber: null,
          standing: true,
        });
        currentIndex++;
      }
    }
    return path;
  }

  function loadBookmarks() {
    if (import.meta.client) {
      const saved = localStorage.getItem("seat_hopper_bookmarks");
      bookmarks.value = saved ? JSON.parse(saved) : [];
    }
  }

  function toggleBookmark(
    connection: any,
    segments: SegmentWithSeat[],
    refresh: boolean = false
  ) {
    loadBookmarks();
    const id = `${connection.vehicleNumber}-${connection.stationFrom}-${connection.stationTo}-${connection.departureDate}`;
    const index = bookmarks.value.findIndex((b) => b.id === id);

    if (index > -1) {
      bookmarks.value.splice(index, 1);
    }

    if (index === -1 || refresh) {
      bookmarks.value.push({
        id,
        addedAt: new Date().toISOString(),
        connection,
        segments,
      });
    }

    localStorage.setItem(
      "seat_hopper_bookmarks",
      JSON.stringify(bookmarks.value)
    );
  }

  function getIsBookmarked(id: string) {
    loadBookmarks();
    return bookmarks.value.some((b) => b.id === id);
  }

  return {
    generateRouteSegments,
    checkSeatsForSegments,
    findValidSeatPath,
    toggleBookmark,
    getIsBookmarked,
    bookmarks,
  };
}
