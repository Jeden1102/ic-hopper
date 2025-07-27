export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const requestBody = await readBody(event);
    const requiredFields = [
      "stationFrom",
      "stationTo",
      "vehicleNumber",
      "departureDate",
    ];
    for (const field of requiredFields) {
      if (!requestBody[field]) {
        throw createError({
          statusCode: 400,
          statusMessage: `Missing required field: ${field}`,
        });
      }
    }

    const body = {
      dataWyjazdu: requestBody.departureDate,
      stacjaWyjazdu: parseInt(requestBody.stationFrom),
      stacjaPrzyjazdu: parseInt(requestBody.stationTo),
      numerPociagu: requestBody.vehicleNumber,
      metoda: "pobierzTrasePrzejazdu",
      urzadzenieNr: "956",
    };

    const res = await $fetch(
      `${config.public.apiUri}/intercity-proxy/intercity`,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    return {
      success: true,
      data: JSON.parse(res as string),
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
