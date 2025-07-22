export default defineEventHandler(async (event) => {
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

    console.log(body);

    const res = await $fetch("https://bilkom.pl/grm", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return {
      success: true,
      data: res,
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
