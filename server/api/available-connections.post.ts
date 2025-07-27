export default defineEventHandler(async (event) => {
  try {
    const requestBody = await readBody(event);
    const requiredFields = ["stationFrom", "stationTo", "departureDate"];
    for (const field of requiredFields) {
      if (!requestBody[field]) {
        throw createError({
          statusCode: 400,
          statusMessage: `Missing required field: ${field}`,
        });
      }
    }

    const body = {
      urzadzenieNr: "956",
      metoda: "wyszukajPolaczenia",
      dataWyjazdu: `${requestBody.departureDate} 00:00:00`,
      dataPrzyjazdu: `${requestBody.departureDate} 23:59:59`,
      stacjaWyjazdu: parseInt(requestBody.stationFrom),
      stacjaPrzyjazdu: parseInt(requestBody.stationTo),
      polaczeniaBezposrednie: 1,
    };

    const res = await $fetch(
      "http://217.154.211.149/intercity-proxy/intercity",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
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
