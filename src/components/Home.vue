<template>
  <div>
    Tutaj będzie tabelka
    {{ jsonFrom }}
    <Scheduler></Scheduler>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { get } from '../composables/fetchMeetings.js'
import Scheduler from './Scheduler/Index.vue'

const jsonFrom = ref([])
onMounted(async () => {
  jsonFrom.value = await get()
})
</script>