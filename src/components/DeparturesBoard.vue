<template>
  <div class="container flex flex-col items-center">
    <header class="bg-amber-400 text-black text-3xl font-semibold flex items-center gap-2 px-8 py-5 shadow-md w-full max-w-5xl">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="36" height="36" class="mr-2">
        <!-- !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
        <path d="M552 264C582.9 264 608 289.1 608 320C608 350.9 582.9 376 552 376L424.7 376L265.5 549.6C259.4 556.2 250.9 560 241.9 560L198.2 560C187.3 560 179.6 549.3 183 538.9L237.3 376L137.6 376L84.8 442C81.8 445.8 77.2 448 72.3 448L52.5 448C42.1 448 34.5 438.2 37 428.1L64 320L37 211.9C34.4 201.8 42.1 192 52.5 192L72.3 192C77.2 192 81.8 194.2 84.8 198L137.6 264L237.3 264L183 101.1C179.6 90.7 187.3 80 198.2 80L241.9 80C250.9 80 259.4 83.8 265.5 90.4L424.7 264L552 264z"/></svg>
      Departures
    </header>

    <div class="bg-gradient-to-r from-neutral-600 via-neutral-800 to-neutral-900 w-full max-w-5xl shadow-lg my-2 py-3 px-8" style="height: 500px;">
      <div class="grid grid-cols-6 text-black font-semibold text-sm bg-gradient-to-r from-blue-50 via-blue-150 to-blue-300 rounded-lg px-4 py-2 shadow-sm"
      >
            <div>Departure time</div>
            <div>City Name</div>
            <div>Code</div>
            <div>Airline</div>
            <div>Gate</div>
            <div>Status</div>
        </div>

      <DepartureRow
        v-for="flight in flights"
        :key="flight.id"
        :flight="flight"
      />
    </div>
  </div>
</template>

<script>
import DepartureRow from './DepartureRow.vue'

export default {
  name: 'DeparturesBoard',
  components: { DepartureRow },
  props: {
    flights: Array,
  },
}
</script>
