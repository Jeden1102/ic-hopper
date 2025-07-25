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
      "https://api-gateway.intercity.pl/server/public/endpoint/Pociagi",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "pl-PL,pl;q=0.9,en;q=0.8",
          Referer: "https://intercity.pl/",
          Origin: "https://intercity.pl",
        },
      }
    );

    console.log(res, "HERE");

    return {
      success: true,
      data: JSON.parse(res as string),
    };
  } catch (err: any) {
    console.log(err, "HERE");
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
