<template>
  <div
    class="md:grid grid-cols-11 gap-6 md:gap items-center border border-1 border-gray-200 rounded-lg px-8 py-4 hover:bg-gray-800 transition font-semibold text-gray-100 relative"
  >
    <div class="col-span-2">
      <span class="md:hidden text-yellow-400">Departure time: </span>
      {{ time }}
    </div>
    <div class="md:text-yellow-400 col-span-3">
      <span class="md:hidden text-yellow-400">To: </span>
      {{ location }}
    </div>
    <div class="">
      <span class="md:hidden text-yellow-400">Code: </span>
      {{ code }}
    </div>
    <div class="col-span-2">
      <span class="md:hidden text-yellow-400">Airline: </span>
      {{ airline }}
    </div>
    <div class="md:text-yellow-400 md:text-center">
      <span class="md:hidden text-yellow-400">Gate: </span>
      {{ gate }}
    </div>
    <div class="md:text-yellow-400 col-span-2 absolute top-2 right-2 md:static">
      <StatusBadge :label="status"></StatusBadge>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import StatusBadge from "./StatusBadge.vue";

export default {
  name: "DepartureRow",
  components: { StatusBadge },
  props: { flight: { type: Object, required: true } },
  computed: {
    time() {
      const d = dayjs(this.flight?.scheduledTime);
      return d.isValid() ? d.format("HH.mm") : "—";
    },
    location() {
      return (
        `${this.flight?.arrivalAirport?.cityName}, ${this.flight?.arrivalAirport.countryName}` ||
        "—"
      );
    },
    code() {
      return this.flight?.arrivalAirport?.code || "—";
    },
    airline() {
      return this.flight?.airline || "—";
    },
    gate() {
      return this.flight?.gate || "—";
    },
    status() {
      return this.flight?.status || "On time";
    },
  },
};
</script>
