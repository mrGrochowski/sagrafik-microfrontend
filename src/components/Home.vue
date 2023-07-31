<template>
  <div class="card-container">
  
    <passwordDialog v-if="!passwordGuard"/>
    <div class="card card--special card--dark">
      <h1 class="heading"><div id="logo" class="inline-block md:hidden w-1/6 radius bg-emerald-300 text-slate-800 rounded-xl px-1"><saLogo class="inline-block"></saLogo></div> Witaj w SA Grafik Online </h1>
      <h4>Wszystkie Meetingi w Polsce na CITO </h4>
    </div>
    <div v-for="(card,index) in cards" :key="card['Sygnatura czasowa']" class="card" :id="index">
      <img
        class="card-image gradient"
        :src="`https://maps.geoapify.com/v1/staticmap?style=dark-matter-yellow-roads&width=600&height=400&center=lonlat:${card.lon},${card.lat}&zoom=5.4&pitch=45&marker=lonlat:${card.lon},${card.lat};type:awesome;color:%23e01401&apiKey=1b48259b810e48ddb151889f9ea58db0`"
      />
      <template v-for="(elem, label) in card" :key="elem">
      <div :class="`${label=='Sygnatura czasowa' ? 'mt-5' : ''}`" >
        <span> {{ label }}: </span>
        <strong v-if="elem && elem.toString().match('http')">
          <a :href="elem">{{ elem }}</a>
        </strong>
        <strong v-else>{{ elem }}</strong>
      </div>
      </template>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onActivated, watch } from 'vue'
import { sync, Storage, getRows, getHeaders, getPreparedCards, getPreparedCardsWithLonLat, getSortedCards } from '../composables/fetchMeetings.js'
import {checkPasswordCorrect} from '../composables/decryptContent.js'
import { getLatLonFromCityName } from '../composables/geolocationMarks.js'
import Scheduler from './Scheduler/Index.vue'
import isArray from 'lodash/isArray'
import saLogo from '../../public/logo.svg'
import passwordDialog from './passwordDialog.vue'
import {useGlobalState} from '../composables/globalState.js'
console.clear();
    await sync()
    const { password, passwordGuard } = useGlobalState() 
    
    const jsonFrom = ref([])
    const rows = ref([])
    const headers = ref([])
    const cards = ref([])
    const latlon = ref([])
    
    watch(password, async e => {
      await checkPasswordCorrect()
      if (e!='' && passwordGuard.value) {
        rows.value = getRows()
        headers.value = getHeaders()
        cards.value = await getSortedCards()
      }
    }) 
    
    
</script>


<style lang="scss" scoped>
.card-container {
  @apply flex flex-col md:pl-9 pb-6 w-full;
}
.card {
  @apply flex-auto mt-5 shrink-0 bg-gray-100 shadow-xl shadow-gray-800 w-5/6 rounded-xl overflow-auto break-all px-5 py-4 mb-10 mx-10 md:mt-0 md:w-2/3 lg:w-1/3 md:px-4 md:mb-0 md:overflow-hidden;
  &--dark {
    @apply bg-zinc-700 text-slate-200
  }
}
.card--special {
  
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
  min-height: 25vh;
  object-fit: cover;
}
.gradient {
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #505050;
    background: linear-gradient(to right, #b8b8b8 8%, #a0a0a0 38%, #b8b8b8 54%);
    background-size: 1000px 640px;
    
    position: relative;
    
}

@keyframes placeHolderShimmer{
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
}
</style>