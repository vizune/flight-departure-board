<template>
  <div id="app" class="min-h-screen flex flex-col items-center py-10">
    <DeparturesBoard />
  </div>
</template>

<script>
import DeparturesBoard from './components/DeparturesBoard.vue'

export default {
  name: 'App',
  components: {
    DeparturesBoard
  }
}
</script>
