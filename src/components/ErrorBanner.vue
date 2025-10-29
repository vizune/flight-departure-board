<template>
  <div
    class="mt-3 p-3 rounded bg-red-50 text-red-700 flex items-center justify-between"
    role="alert"
    aria-live="polite"
  >
    <span>Couldn't load flights. {{ error }}</span>
    <button
      class="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
      @click="$emit('retry')"
    >
      Retry
    </button>
  </div>
</template>

<script>
export default {
  name: "ErrorBanner",
  props: {
    error: {
      type: String,
      required: true,
    },
  },
  emits: ["retry"],
};
</script>
