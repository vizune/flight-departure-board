<template>
  <div class="container flex flex-col items-center">
    <header class="bg-amber-400 text-black text-3xl font-semibold flex items-center gap-2 px-8 py-5 shadow-md w-full max-w-5xl">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="36" height="36" class="mr-2">
        <!-- !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
        <path d="M552 264C582.9 264 608 289.1 608 320C608 350.9 582.9 376 552 376L424.7 376L265.5 549.6C259.4 556.2 250.9 560 241.9 560L198.2 560C187.3 560 179.6 549.3 183 538.9L237.3 376L137.6 376L84.8 442C81.8 445.8 77.2 448 72.3 448L52.5 448C42.1 448 34.5 438.2 37 428.1L64 320L37 211.9C34.4 201.8 42.1 192 52.5 192L72.3 192C77.2 192 81.8 194.2 84.8 198L137.6 264L237.3 264L183 101.1C179.6 90.7 187.3 80 198.2 80L241.9 80C250.9 80 259.4 83.8 265.5 90.4L424.7 264L552 264z"/></svg>
      <h1>Departures</h1>
    </header>

    <div class="bg-gradient-to-r from-neutral-600 via-neutral-800 to-neutral-900 w-full max-w-5xl shadow-lg my-3 py-3 px-8">
      <div class="hidden md:grid grid-cols-11 gap-4 text-black font-semibold text-sm bg-gradient-to-r from-blue-50 via-blue-200 to-blue-300 rounded-lg px-8 py-2 shadow-sm hidden">
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
          <DepartureRow v-for="(flight, i) in flightsSorted" :key="flight.id || i" :flight="flight" />
        </div>
      </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import DepartureRow from './DepartureRow.vue'
import ErrorBanner from './ErrorBanner.vue'
import SkeletonRows from './SkeletonRows.vue'
import { getFlights } from '../api/flights'

export default {
  name: 'DeparturesBoard',
  components: { DepartureRow, SkeletonRows, ErrorBanner },
  data() {
    return {
        flights: [],
        loading: false,
        error: ''
    }
  },
  computed: {
    flightsSorted() {
      // Sort flights by scheduled departure time (earliest first).
      // If two flights have the same time, fall back to alphabetical order by flight number.
      // `timeA` and `timeB` represent each flight's timestamp in milliseconds.
      return [...this.flights].sort((a, b) => {
        const timeA = dayjs(a.scheduledTime).valueOf() || 0
        const timeB = dayjs(b.scheduledTime).valueOf() || 0
        if (timeA !== timeB) return timeA - timeB
        return String(a.flightNumber || '').localeCompare(String(b.flightNumber || ''))
      })
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      this.loading = true
      this.error = ''
      try {
        const list = await getFlights()
        console.log('Flights from API (count):', list.length, list[0])

        this.flights = list.map((f, idx) => ({
          id: f.id ?? `${f.flightNumber || 'row'}-${idx}`,
          scheduledTime: f.scheduledDepartureDateTime || f.scheduledTime || null,
          flightNumber: f.flightNumber || f.flightCode || '',
          airline: f.airline?.name || f.airline || f.operator || '',
          gate: f.departureGate?.number || f.departureGate?.name || f.gate || '',
          status: f.status || 'On time',
          arrivalAirport: {
            cityName: f.arrivalAirport?.cityName || '',
            airportName: f.arrivalAirport?.name || '',
            code:
              f.arrivalAirport?.code ||
              f.arrivalAirport?.iataCode ||
              f.arrivalAirport?.iata ||
              '',
            countryName: f.arrivalAirport?.countryName || '',
          },
        }))
      } catch (e) {
        this.error = e?.message || 'Unknown error'
        this.flights = []
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
