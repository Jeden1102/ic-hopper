import { load } from "cheerio";

export default defineEventHandler(async (event) => {
  const svg = await $fetch(
    "https://api-gateway.intercity.pl/grm/wagon/svg/wbnet/IC/6128/6/1326,WITHOUT_COMPARTMENTS/202507030855/202507031346/5100143/5100136"
  );

  const $ = load(svg, { xmlMode: true });

  const freeSeats: string[] = [];

  $("g").each((_, el) => {
    const group = $(el);
    const label = group.find("text").attr("aria-label");
    const seatNumber = group.find("text").text().trim();

    if (label && label.includes("Wolne") && seatNumber) {
      freeSeats.push(seatNumber);
    }
  });

  return { freeSeats, svg };
});
