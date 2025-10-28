<template>
  <div class="grid grid-cols-11 gap-4 items-center border border-1 border-gray-200 rounded-lg px-8 py-4 hover:bg-gray-800 transition font-semibold">
    <div class="text-gray-100 col-span-2">{{ time }}</div>
    <div class="text-yellow-400 col-span-3">{{ location }}</div>
    <div class="text-gray-200">{{ code }}</div>
    <div class="text-gray-200 col-span-2">{{ airline }}</div>
    <div class="text-yellow-400 text-center">{{ gate }}</div>
    <div class="text-yellow-400 col-span-2">{{ status }}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import StatusBadge from './StatusBadge.vue'

export default {
  name: 'DepartureRow',
  components: { StatusBadge },
  props: { flight: { type: Object, required: true } },
  computed: {
    time() {
      const d = dayjs(this.flight?.scheduledTime)
      return d.isValid() ? d.format('HH.mm') : '—'
    },
    location() {
      return `${this.flight?.arrivalAirport?.cityName}, ${this.flight?.arrivalAirport.countryName}`
    },
    code() {
      return this.flight?.arrivalAirport?.code || '—'
    },
    airline() {
      return this.flight?.airline || '—'
    },
    gate() {
      return this.flight?.gate || '—'
    },
    status() {
      return this.flight?.status || 'On time'
    },
  },
}
</script>
