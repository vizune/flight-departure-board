const BASE_URL = "https://6315ae3e5b85ba9b11e4cb85.mockapi.io";

/**
 * Fetches flight data from the API and normalizes it into an array format.
 * Handles network errors and unexpected response shapes gracefully.
 */
export async function getFlights() {
  try {
    const res = await fetch(`${BASE_URL}/departures/Flightdata`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const json = await res.json();
    const list = Array.isArray(json)
      ? json
      : Array.isArray(json?.allDepartures)
      ? json.allDepartures
      : Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json?.items)
      ? json.items
      : [];

    if (!list.length) {
      console.warn(
        "No flight data returned or unexpected response shape:",
        json
      );
    }

    return list;
  } catch (error) {
    console.error("Failed to fetch flights:", error);
    throw error;
  }
}
