<template>
  <div class="container flex flex-col items-center">
    <BoardHeader title="Departures" />

    <div
      class="bg-gradient-to-r from-neutral-600 via-neutral-800 to-neutral-900 w-full max-w-5xl shadow-lg my-3 py-3 px-8"
    >
      <div
        class="hidden md:grid grid-cols-11 gap-4 text-black font-semibold text-sm bg-gradient-to-r from-blue-50 via-blue-200 to-blue-300 rounded-lg px-8 py-2 shadow-sm hidden"
      >
        <div class="col-span-2">Departure time</div>
        <div class="col-span-3">To</div>
        <div>Code</div>
        <div class="col-span-2">Airline</div>
        <div class="text-center">Gate</div>
        <div class="col-span-2">Status</div>
      </div>

      <ErrorBanner v-if="error" :error="error" @retry="load" />

      <SkeletonRows v-else-if="loading" />

      <div v-else class="mt-3 flex flex-col gap-5">
        <DepartureRow
          v-for="(flight, i) in flightsSorted"
          :key="flight.id || i"
          :flight="flight"
        />
        <StatusUpdateForm :flights="flights" @update="applyLocalUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

import DepartureRow from "./DepartureRow.vue";
import ErrorBanner from "./ErrorBanner.vue";
import SkeletonRows from "./SkeletonRows.vue";
import StatusUpdateForm from "./StatusUpdateForm.vue";

import { getFlights } from "../api/flights";
import { normalizeFlight } from "../utils/normalizeFlight";
import BoardHeader from "./BoardHeader.vue";

export default {
  name: "DeparturesBoard",
  components: {
    BoardHeader,
    DepartureRow,
    SkeletonRows,
    ErrorBanner,
    StatusUpdateForm,
  },
  data() {
    return {
      flights: [],
      loading: false,
      error: "",
    };
  },
  computed: {
    flightsSorted() {
      // Sort flights by scheduled departure time (earliest first).
      // If two flights have the same time, fall back to alphabetical order by flight number.
      // `timeA` and `timeB` represent each flight's timestamp in milliseconds.
      return [...this.flights].sort((a, b) => {
        const timeA = dayjs(a.scheduledTime).valueOf() || 0;
        const timeB = dayjs(b.scheduledTime).valueOf() || 0;
        if (timeA !== timeB) return timeA - timeB;
        return String(a.flightNumber || "").localeCompare(
          String(b.flightNumber || "")
        );
      });
    },
  },
  mounted() {
    // On mount, first attempt to restore saved flight data from localStorage.
    // If saved data exists, use it to populate the board immediately (preserving user updates).
    // Otherwise, fall back to fetching fresh data from the API.
    const saved = JSON.parse(localStorage.getItem("flights"));
    if (saved?.length) {
      this.flights = saved;
    } else {
      this.load();
    }
  },
  methods: {
    async load() {
      this.loading = true;
      this.error = "";
      try {
        const list = await getFlights();
        console.log("Flights from API (count):", list.length, list[0]);

        this.flights = list.map(normalizeFlight);
      } catch (e) {
        this.error = e?.message || "Unknown error";
        this.flights = [];
      } finally {
        this.loading = false;
      }
    },
    applyLocalUpdate({ flightId, status }) {
      // Updates the local flights array when a status change is submitted.
      // It finds the flight with the matching `flightId` and returns a new array
      // where only that flight's `status` is updated, preserving immutability.
      this.flights = this.flights.map((f) =>
        f.id === flightId ? { ...f, status } : f
      );
      localStorage.setItem("flights", JSON.stringify(this.flights));
    },
  },
};
</script>
