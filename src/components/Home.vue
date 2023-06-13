<template>
  <div class="flex flex-col items-center pb-6">
    <!-- Tutaj będzie tabelka
    {{ headers }} -->
    <div class="card">
    <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-emerald-300">Witaj w SA Grafik <br/>Online</h1>
    <h4>Wszystkie Meetingi w Polsce na CITO 🔥</h4>
    </div>
    <div v-for="card in cards" :key="card['Sygnatura czasowa']" class="card">
      <img class="card-image" src="https://maps.geoapify.com/v1/staticmap?style=dark-matter-yellow-roads&width=600&height=400&center=lonlat:19.416073,51.854635&zoom=5.4&pitch=45&marker=lonlat:19.416073,51.854635;type:awesome;color:%23e01401&apiKey=1b48259b810e48ddb151889f9ea58db0"/>
      <div v-for="(elem, label) in card" :key="elem">
        <span> {{ label }}: </span>
        <strong v-if="elem.match('http')">
          <a :href="elem">{{ elem }}</a>
        </strong>
        <strong v-else>{{ elem }}</strong>
      </div>
    </div>
    
    
    <!-- 
    <Scheduler></Scheduler> -->
  </div>
</template>

<style lang="scss" scoped>
  .card {
    @apply bg-gray-100 shadow-xl shadow-gray-800 w-full max-w-4xl px-5 py-4 rounded-xl mb-10 break-all overflow-auto
  }
  .card-image {
    margin: -1.25rem;
    //width:100%;
    width: calc(2 * 1.25rem + 100%) !important;
    max-width: 100vw;
    // max-height:25%;
    height:25vh;
    object-fit: cover;
  }
</style>
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