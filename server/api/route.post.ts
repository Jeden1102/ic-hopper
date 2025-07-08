export default defineEventHandler(async (event) => {
  try {
    const requestBody = await readBody(event);
    const requiredFields = [
      "stationFrom",
      "stationTo",
      "vehicleNumber",
      "departureDate",
      "category",
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

    //   { dataWyjazdu: '2025-08-07T19:10:00.00',
    // stacjaWyjazdu: 5100046,
    // stacjaPrzyjazdu: 5100065,
    // numerPociagu: 61110,
    // metoda: 'pobierzTrasePrzejazdu',
    // urzadzenieNr: '956' }

    const res = await $fetch(
      "https://api-gateway.intercity.pl/server/public/endpoint/Pociagi",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

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
