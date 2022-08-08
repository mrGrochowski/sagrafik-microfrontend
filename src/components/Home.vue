<template>
  <div>
    Tutaj będzie tabelka
    {{ headers }}
    <div v-for="card in cards" :key="card['Sygnatura czasowa']" class="bg-white shadow-xl shadow-gray-100 w-full max-w-4xl px-5 py-4 rounded-xl mb-10">
      {{ card.Miasto }}
    </div>
    <Scheduler></Scheduler>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { sync, Storage, getRows, getHeaders, getPreparedCards } from '../composables/fetchMeetings.js'
import Scheduler from './Scheduler/Index.vue'

const jsonFrom = ref([])
const rows = ref([])
const headers = ref([])
const cards = ref([])

onMounted(async () => {
  await sync()
  rows.value = getRows()
  headers.value = getHeaders()
  cards.value = getPreparedCards()
})
</script>