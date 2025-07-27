import type {
  RouteStation,
  SegmentWithSeat,
  ConnectionSeats,
} from "~/server/types";

export function useSeatHopper() {
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
    {
      from: RouteStation;
      to: RouteStation;
      seats: ConnectionSeats[];
    }[]
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

        return {
          from,
          to,
          seats,
        };
      } catch (err) {
        return {
          from,
          to,
          seats: [],
        };
      }
    });

    return await Promise.all(requests);
  }

  function findValidSeatPath(
    seatsPerSegment: {
      from: RouteStation;
      to: RouteStation;
      seats: ConnectionSeats;
    }[],
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
            s.seats.data.length > 0
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
        const from = stations[currentIndex];
        const to = stations[currentIndex + 1];

        path.push({
          from,
          to,
          carriageNumber: null,
          seatNumber: null,
          standing: true,
        });

        currentIndex++;
      }
    }

    return path;
  }

  return {
    generateRouteSegments,
    checkSeatsForSegments,
    findValidSeatPath,
  };
}
