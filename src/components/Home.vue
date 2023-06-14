<template>
  <!-- <PasswordPopup /> -->
  <div class="flex flex-col items-center pb-6">
    <!-- Tutaj będzie tabelka
    {{ headers }} -->
    <div class="card mt-5">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-emerald-300">Witaj w SA Grafik <br />Online</h1>
      <h4>Wszystkie Meetingi w Polsce na CITO 🔥</h4>
    </div>
    <div v-for="(card,index) in cards" :key="card['Sygnatura czasowa']" class="card">
      <!-- <img
          class="card-image"
          src="https://maps.geoapify.com/v1/staticmap?style=dark-matter-yellow-roads&width=600&height=400&center=lonlat:19.416073,51.854635&zoom=5.4&pitch=45&marker=lonlat:19.416073,51.854635;type:awesome;color:%23e01401&apiKey=1b48259b810e48ddb151889f9ea58db0"
        /> -->
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
.card {
  @apply bg-gray-100 shadow-xl shadow-gray-800 w-5/6 px-5 py-4 mb-10 mx-10 rounded-xl break-all overflow-auto;
}
.card-image {
  margin: -1.25rem;
  //width:100%;
  width: calc(2 * 1.25rem + 100%) !important;
  max-width: 100vw;
  // max-height:25%;
  height: 25vh;
  object-fit: cover;
}
</style>
<script>
import { ref, onMounted, onActivated } from 'vue'
import { sync, Storage, getRows, getHeaders, getPreparedCards, getPreparedCardsWithLonLat } from '../composables/fetchMeetings.js'
import { getLatLonFromCityName } from '../composables/geolocationMarks.js'
import Scheduler from './Scheduler/Index.vue'
import PasswordPopup from './PasswordPopup.vue'
import isArray from 'lodash/isArray'

export default {
  async setup() {
    const jsonFrom = ref([])
    const rows = ref([])
    const headers = ref([])
    const cards = ref([])
    const latlon = ref([])
    await sync()

    // onActivated(() => {
    // onMounted(() => {
    //if (isArray(cards.value) && cards.value.length == 0) {
    rows.value = getRows()
    headers.value = getHeaders()
    cards.value = await getPreparedCardsWithLonLat()
    console.log("🚀 ~ file: Home.vue:70 ~ //onMounted ~ cards.value:", cards.value)

 /*    cards.value.forEach(async(e, index) => {
      //console.log("🚀 ~ file: Home.vue:69 ~ cards.value.forEach ~ e:", e)
      latlon.value.push(await getLatLonFromCityName(e.Miasto))
    }) */
    //}
    // })
    return { jsonFrom, rows, headers, cards, latlon }
  },
}
//onActivated(async () => {
</script>
