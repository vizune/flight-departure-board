<template>
  <div class="mt-3 space-y-2" aria-label="Loading rows">
    <div
      v-for="n in count"
      :key="n"
      class="h-12 rounded bg-white/10 animate-pulse"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonRows",
  props: {
    count: {
      type: Number,
      default: 6,
    },
  },
};
</script>
