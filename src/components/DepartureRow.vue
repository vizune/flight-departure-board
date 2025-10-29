<template>
  <tr
    class="relative flex flex-col relative lg:table-row transition font-semibold text-gray-100"
  >
    <td class="flex lg:table-cell px-4 py-3">
      <span class="block lg:hidden text-yellow-400 font-normal mr-1"
        >Departure time:</span
      >
      {{ time }}
    </td>
    <td class="flex lg:table-cell px-4 py-3 lg:text-yellow-400">
      <span class="block lg:hidden text-yellow-400 font-normal mr-1">To:</span>
      {{ location }}
    </td>
    <td class="flex lg:table-cell px-4 py-3">
      <span class="block lg:hidden text-yellow-400 font-normal mr-1"
        >Code:</span
      >
      {{ code }}
    </td>
    <td class="flex lg:table-cell px-4 py-3">
      <span class="block lg:hidden text-yellow-400 font-normal mr-1"
        >Airline:</span
      >
      {{ airline }}
    </td>
    <td class="flex lg:table-cell px-4 py-3 lg:text-center lg:text-yellow-400">
      <span class="block lg:hidden text-yellow-400 font-normal mr-1"
        >Gate:</span
      >
      {{ gate }}
    </td>
    <td
      class="px-4 py-1 lg:py-3 text-center lg:text-yellow-400 absolute top-0 right-0 lg:static"
    >
      <StatusBadge :label="status" />
    </td>
  </tr>
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
      const city = this.flight?.arrivalAirport?.cityName;
      const country = this.flight?.arrivalAirport?.countryName;
      return city && country ? `${city}, ${country}` : city || "—";
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

<style scoped>
tr::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  border-radius: 0.75rem;
  pointer-events: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  transition: all 0.25s ease;
  pointer-events: none;
  z-index: 0;
}

tr:hover::before {
  border-color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.05);
}
</style>
