import { render, fireEvent, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";

import StatusUpdateForm from "./StatusUpdateForm.vue";

const mockFlights = [
  {
    id: "1",
    flightNumber: "AF1669",
    arrivalAirport: { cityName: "Paris", countryName: "France" },
    scheduledTime: "2022-08-22T10:30:00",
  },
  {
    id: "2",
    flightNumber: "BA202",
    arrivalAirport: { cityName: "London", countryName: "UK" },
    scheduledTime: "2022-08-22T12:00:00",
  },
];

describe("StatusUpdateForm", () => {
  it("renders flights in dropdown", async () => {
    render(StatusUpdateForm, { props: { flights: mockFlights } });

    const select = screen.getByLabelText(/flight/i);
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options.some((o) => o.textContent.includes("AF1669"))).toBe(true);
    expect(options.some((o) => o.textContent.includes("BA202"))).toBe(true);
  });

  it("shows an error if submitted with no selection", async () => {
    const { container } = render(StatusUpdateForm, {
      props: {
        flights: [
          {
            id: "1",
            flightNumber: "AF1669",
            arrivalAirport: { cityName: "Paris" },
            scheduledTime: "2025-10-29T10:30:00",
          },
        ],
      },
    });

    const form = container.querySelector("form");
    await fireEvent.submit(form);

    const alert = await screen.findByText(/please select a flight and status/i);
    expect(alert).toBeInTheDocument();
  });

  it("emits update with correct payload when valid", async () => {
    const { emitted } = render(StatusUpdateForm, {
      props: { flights: mockFlights },
    });

    const flightSelect = screen.getByLabelText(/flight/i);
    const statusSelect = screen.getByLabelText(/status/i);
    const button = screen.getByRole("button", { name: /update status/i });

    await fireEvent.update(flightSelect, "1");
    await fireEvent.update(statusSelect, "Departed");
    await fireEvent.click(button);

    const updateEvent = emitted().update?.[0]?.[0];
    expect(updateEvent).toEqual({ flightId: "1", status: "Departed" });
  });

  it("handles FreeText submission correctly", async () => {
    const { emitted } = render(StatusUpdateForm, {
      props: { flights: mockFlights },
    });

    await fireEvent.update(screen.getByLabelText(/flight/i), "1");
    await fireEvent.update(screen.getByLabelText(/status/i), "FreeText");

    const input = await screen.findByPlaceholderText(/gate opens/i);
    await fireEvent.update(input, "Go to gate 14");
    await fireEvent.click(
      screen.getByRole("button", { name: /update status/i })
    );

    const updateEvent = emitted().update?.[0]?.[0];
    expect(updateEvent).toEqual({ flightId: "1", status: "Go to gate 14" });
  });
});
