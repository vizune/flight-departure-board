<template>
  <span
    class="inline-block px-3 py-3 bg-white rounded-l-md rounded-r-xl border-l-[10px] font-medium text-sm min-w-[10rem] w-full"
    :class="badgeClass"
  >
    {{ displayLabel }}
  </span>
</template>

<script>
export default {
  name: "StatusBadge",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    displayLabel() {
      const lower = this.label.toLowerCase();

      if (lower.includes("wait in lounge")) return "Boarding";
      if (lower.includes("final call")) return "Final call";
      if (lower.includes("go to gate")) return "Go to gate";

      return this.label;
    },
    badgeClass() {
      const status = this.label.toLowerCase();

      if (status.includes("final call")) {
        return "border-orange-600 text-gray-700 font-semibold";
      }
      if (status.includes("wait in lounge")) {
        return "border-green-700 text-green-700 font-semibold";
      }
      if (status.includes("go to gate")) {
        return "border-blue-800 text-gray-700";
      }
      if (status.includes("gate opens")) {
        return "border-yellow-700 text-gray-700 font-semibold";
      }
      if (status.includes("departed")) {
        return "border-red-700 text-gray-700 font-semibold";
      }
      if (status.includes("cancelled")) {
        return "border-red-700 text-gray-700 font-semibold";
      }
      if (status.includes("departing at") || status.includes("diverted")) {
        return "border-purple-900 text-gray-700";
      }

      return "border-gray-700 text-gray-700";
    },
  },
};
</script>
