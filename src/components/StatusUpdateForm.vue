<template>
  <form
    class="w-full max-w-5xl my-6 bg-neutral-900/70 border border-neutral-700 rounded-lg p-6 space-y-4"
    @submit.prevent="onSubmit"
  >
    <div class="flex items-center text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width="36px"
        height="36px"
        fill="white"
        class="mr-2"
      >
        <!-- !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
        <path
          d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z"
        />
      </svg>
      <h2 class="text-xl font-semibold">Update Flight Status</h2>
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
      <div>
        <label
          for="flight"
          class="block text-sm font-semibold text-gray-300 mb-1"
          >Flight</label
        >
        <select
          id="flight"
          v-model="form.flightId"
          class="w-full rounded-md bg-neutral-800 text-white border border-neutral-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        >
          <option disabled value="">Select a flight…</option>
          <option v-for="f in flights" :key="f.id" :value="f.id">
            {{ f.flightNumber }} —
            {{
              f.arrivalAirport?.cityName ||
              f.arrivalAirport?.airportName ||
              "Destination"
            }}
            ({{ formatTime(f.scheduledTime) }})
          </option>
        </select>
      </div>

      <div>
        <label
          for="statusType"
          class="block text-sm font-semibold text-gray-300 mb-1"
          >Status</label
        >
        <select
          id="statusType"
          v-model="form.statusType"
          class="w-full rounded-md bg-neutral-800 text-white border border-neutral-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        >
          <option value="Departed">Departed</option>
          <option value="Diverted">Diverted</option>
          <option value="Delayed">Delayed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="FreeText">Free text…</option>
        </select>
      </div>
    </div>

    <div v-if="form.statusType === 'FreeText'">
      <label for="freeText" class="block text-sm font-medium text-gray-300 mb-1"
        >Custom status</label
      >
      <input
        id="freeText"
        v-model.trim="form.freeText"
        type="text"
        placeholder="e.g. Gate opens 07.00 / Go to gate 14 / Final call"
        class="w-full rounded-md bg-neutral-800 text-white border border-neutral-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
        :required="form.statusType === 'FreeText'"
        maxlength="80"
      />
      <p class="text-xs text-gray-400 mt-1">{{ form.freeText.length }}/80</p>
    </div>

    <div class="flex items-center gap-3">
      <button
        type="submit"
        class="px-4 py-2 rounded-md bg-amber-400 text-black font-semibold hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        Update status
      </button>
      <button
        type="button"
        class="px-3 py-2 rounded-md border border-neutral-600 text-gray-200 hover:bg-neutral-800"
        @click="resetForm"
      >
        Reset
      </button>
      <p v-if="error" class="text-red-400 text-sm ml-auto" role="alert">
        {{ error }}
      </p>
      <p
        v-else-if="success"
        class="text-green-400 text-sm ml-auto"
        aria-live="polite"
      >
        Status updated.
      </p>
    </div>
  </form>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "StatusUpdateForm",
  props: {
    flights: {
      type: Array,
      required: true,
    },
  },
  emits: ["update"],
  data() {
    return {
      form: {
        flightId: "",
        statusType: "Departed",
        freeText: "",
      },
      error: "",
      success: false,
    };
  },
  computed: {
    canSubmit() {
      if (!this.form.flightId) return false;
      if (this.form.statusType === "FreeText")
        return this.form.freeText.trim().length > 0;
      return true;
    },
  },
  methods: {
    formatTime(t) {
      const d = dayjs(t);
      return d.isValid() ? d.format("HH.mm") : "—";
    },
    resetForm() {
      this.form.flightId = "";
      this.form.statusType = "Departed";
      this.form.freeText = "";
      this.error = "";
      this.success = false;
    },
    onSubmit() {
      this.error = "";
      this.success = false;
      if (!this.canSubmit) {
        this.error = "Please select a flight and status.";
        return;
      }

      const label =
        this.form.statusType === "FreeText"
          ? this.form.freeText.trim()
          : this.form.statusType;

      this.$emit("update", {
        flightId: this.form.flightId,
        status: label,
      });

      this.success = true;
      this.resetForm();
    },
  },
};
</script>
