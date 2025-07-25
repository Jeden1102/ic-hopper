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
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
          Origin: "https://ebilet.intercity.pl",
          Referer: "https://ebilet.intercity.pl/",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
          "Sec-Ch-Ua":
            '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"macOS"',
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
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
