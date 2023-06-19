<template>
  <!-- <PasswordPopup /> -->
  <div class="card-container">
    <!-- Tutaj będzie tabelka
    {{ headers }} -->
    <div class="card">
      <h1 class="heading"><div id="logo" class="inline-block md:hidden w-1/6 radius bg-emerald-300 text-zinc-800 rounded-xl px-1"><saLogo class="inline-block"></saLogo></div> Witaj w SA Grafik Online </h1>
      <h4>Wszystkie Meetingi w Polsce na CITO </h4>
    </div>
    <div v-for="(card,index) in cards" :key="card['Sygnatura czasowa']" class="card" :id="index">
      <img
        class="card-image"
        :src="`https://maps.geoapify.com/v1/staticmap?style=dark-matter-yellow-roads&width=600&height=400&center=lonlat:${card.lon},${card.lat}&zoom=5.4&pitch=45&marker=lonlat:${card.lon},${card.lat};type:awesome;color:%23e01401&apiKey=1b48259b810e48ddb151889f9ea58db0`"
      />
      <template v-for="(elem, label) in card" :key="elem">
      <div :class="`${label=='Sygnatura czasowa' ? 'mt-5' : ''}`" >
        <span> {{ label }}: </span>
        <strong v-if="elem.toString().match('http')">
          <a :href="elem">{{ elem }}</a>
        </strong>
        <strong v-else>{{ elem }}</strong>
      </div>
      </template>
    </div>

    <!-- 
    <Scheduler></Scheduler> -->
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  @apply flex flex-col md:flex-row md:pl-9 md:items-stretch pb-6 w-full overflow-y-auto md:h-screen;
}
.card {
  @apply flex-auto mt-5 md:mt-0 shrink-0 bg-gray-100 shadow-xl shadow-gray-800 w-5/6 md:w-2/3 lg:w-1/3 px-5 py-4 mb-10 mx-10 md:px-4 md:mb-0 rounded-xl overflow-auto break-all md:overflow-hidden ;
}
.heading {
  @apply mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-emerald-300 break-words;
  word-break: break-word;
}
.card-image {
  @apply max-h-[40vh] ;
  margin: -1.25rem;
  width: calc(2 * 1.25rem + 100%) !important;
  max-width: 100vw;
  //height: 25vh;
  object-fit: cover;
}
</style>
<script setup>
import { ref, onMounted, onActivated } from 'vue'
import { sync, Storage, getRows, getHeaders, getPreparedCards, getPreparedCardsWithLonLat } from '../composables/fetchMeetings.js'
import { getLatLonFromCityName } from '../composables/geolocationMarks.js'
import Scheduler from './Scheduler/Index.vue'
import PasswordPopup from './PasswordPopup.vue'
import isArray from 'lodash/isArray'
import saLogo from '../../public/logo.svg'
    const jsonFrom = ref([])
    const rows = ref([])
    const headers = ref([])
    const cards = ref([])
    const latlon = ref([])
    await sync()

    rows.value = getRows()
    headers.value = getHeaders()
    cards.value = await getPreparedCardsWithLonLat()

</script>
