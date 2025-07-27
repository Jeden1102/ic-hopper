export default defineEventHandler(async (event) => {
  const { apiSeats } = useRuntimeConfig(event);
  try {
    const requestBody = await readBody(event);

    const body = {
      vehicleNumber: requestBody.vehicleNumber,
      departureDate: requestBody.departureDate,
      arrivalDate: requestBody.departureDate,
      stationFrom: requestBody.stationFrom,
      stationTo: requestBody.stationTo,
      stationNumberingSystem: "HAFAS",
      type: "CARRIAGE",
      returnAllSectionsAvailableAtStationFrom: true,
      returnBGMRecordsInfo: false,
    };

    const res = await $fetch(`${apiSeats}/grm`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const filteredCarriages = res.carriages
      .map((carriage) => {
        const availableSeats = (carriage.spots || []).filter((spot) => {
          return (
            spot.status === "AVAILABLE" &&
            spot.serviceType === "SEAT" &&
            spot.properties?.includes("CLASS_2") &&
            !spot.properties?.includes("HANDICAPPED_WITH_WHEELCHAIR") &&
            !spot.properties?.includes("HANDICAPPED_GUARDIAN")
          );
        });

        return {
          carriageNumber: carriage.carriageNumber,
          availableSeats: availableSeats.map((seat) => ({
            number: seat.number,
            properties: seat.properties,
          })),
        };
      })
      .filter((c) => c.availableSeats.length > 0);

    return {
      success: true,
      data: filteredCarriages,
    };
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: {
        error: true,
        message: err.message || "Unknown error occurred",
      },
    });
  }
});
