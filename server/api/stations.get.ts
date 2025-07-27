import { BilkomResponse, StationShort } from "../types";

export default defineEventHandler(
  async (event): Promise<StationShort[] | { error: true; message: string }> => {
    const query = getQuery(event);
    const stationName = query.q;

    if (!stationName || typeof stationName !== "string") {
      return {
        error: true,
        message: "Missing 'q' query parameter.",
      };
    }

    try {
      const encodedName = encodeURIComponent(stationName);
      const url = `https://bilkom.pl/stacje/szukaj?q=${encodedName}&source=FROMSTATION`;

      const res = await $fetch<BilkomResponse>(url);

      if (!res.stations || res.stations.length === 0) {
        return {
          error: true,
          message: `No station found for: "${stationName}".`,
        };
      }

      return res.stations.map(
        (s): StationShort => ({
          id: s.extId,
          name: s.name,
        })
      );
    } catch (err: any) {
      return {
        error: true,
        message: `Data fetch error: ${err.message}`,
      };
    }
  }
);
