export default defineEventHandler(async (event) => {
  const body = {
    dataWyjazdu: "2025-07-04T16:04:00",
    stacjaWyjazdu: 5100237,
    stacjaPrzyjazdu: 5100065,
    numerPociagu: 61152,
    metoda: "pobierzTrasePrzejazdu",
    urzadzenieNr: "956",
  };

  try {
    const res = await fetch(
      "https://api-gateway.intercity.pl/server/public/endpoint/Pociagi",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error(`Błąd HTTP ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
});
