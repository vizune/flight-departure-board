import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getFlights } from "./flights";

describe("getFlights", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("returns array when API wraps data in allDepartures", async () => {
    const payload = {
      allDepartures: [
        { id: "1", scheduledDepartureDateTime: "2025-01-01T10:00:00Z" },
      ],
    };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => payload });

    const result = await getFlights();

    expect(fetch).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].scheduledDepartureDateTime).toBe("2025-01-01T10:00:00Z");
  });

  it("returns [] if response is not an array", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "not an array" }),
    });

    const result = await getFlights();
    expect(result).toEqual([]);
  });

  it("throws if the response is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(getFlights()).rejects.toThrow(
      "Request failed with status 500"
    );
  });

  it("throws if fetch itself fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));
    await expect(getFlights()).rejects.toThrow("Network error");
  });
});
