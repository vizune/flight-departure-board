export function normalizeFlight(f, idx) {
  return {
    id: f.id ?? `${f.flightNumber || "row"}-${idx}`,
    scheduledTime: f.scheduledDepartureDateTime || f.scheduledTime || null,
    flightNumber: f.flightNumber || f.flightCode || "",
    airline: f.airline?.name || f.airline || f.operator || "",
    gate: f.departureGate?.number || f.departureGate?.name || f.gate || "",
    status: f.status || "On time",
    arrivalAirport: {
      cityName: f.arrivalAirport?.cityName || "",
      airportName: f.arrivalAirport?.name || "",
      code: f.arrivalAirport?.code || f.arrivalAirport?.iataCode || "",
      countryName: f.arrivalAirport?.countryName || "",
    },
  };
}
