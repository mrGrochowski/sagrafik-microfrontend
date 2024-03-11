<template>
  <div class="card-container">
    <passwordDialog v-if="!passwordGuard" />
    <div class="card card--special card--dark inline-flex flex-col">
      <h1 class="heading">
        <div
          id="logo"
          class="inline-block md:hidden w-1/6 radius bg-emerald-300 text-slate-800 rounded-xl px-1"
        >
          <saLogo class="inline-block"></saLogo>
        </div>
        Witaj w SA Grafik Online
      </h1>
      <h4>Wszystkie Meetingi w Polsce na CITO</h4>
      <span class="text-xs">Jeżeli potrzebujesz edytować meeting skontaktuj się z nami na email <a href="mailto:sagrafik.online@gmail.com">sagrafik.online@gmail.com</a>. Możesz też dodać nowy meeting klikając w przycisk poniżej.</span>
      <a
        class="rounded-full shadow-sm bg-emerald-300 text-slate-600 p-2 inline-block mt-3 mx-auto"
        href="https://docs.google.com/forms/d/e/1FAIpQLSe9KC-zzcd89iinRnFIZoK7rjcRsFJjsFwFz3u6Wcad3rS2WQ/viewform"
        >Dodaj meeting</a
      >
    </div>
    
    <template v-for="(card, index) in cards" :key="card['Sygnatura czasowa']">
      
      <div class="card card--pop-up" :class="{ 'card--pop-up-active': popUpList[index] }">
        <span>{{ card["Dzień tygodnia"] }} {{ card["Godzina rozpoczęcia"] }}</span>
        <h2 v-if="card?.['Nazwa Meetingu'] != ''" class="text-lg font-bold">
          {{ card["Nazwa Meetingu"] }}
        </h2>
        <h2 v-if="_.isUndefined(card['Nazwa Meetingu'])" class="text-lg font-bold">
          {{ card.Miasto }} {{ card["Dzień tygodnia"] }}
        </h2>

        <strong class="underline" @click="togglePopUp(index)">
          Więcej
        </strong>
      </div>
    </template>
    <Dialog v-if="clickedCard" @close="()=>{clickedCard=false}">
      <template v-for="(elem, label) in clickedCard">
        <span>{{ label }}:</span> <strong> {{ elem }}</strong><br />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, watch } from "vue";
import {
  sync,
  Storage,
  getRows,
  getHeaders,
  getPreparedCards,
  getPreparedCardsWithLonLat,
  getSortedMiniCards,
  getSmoothSortedMiniCards
} from "../composables/fetchMeetings.js";
import { checkPasswordCorrect } from "../composables/decryptContent.js";
import { getLatLonFromCityName } from "../composables/geolocationMarks.js";
import Scheduler from "./Scheduler/Index.vue";
import isArray from "lodash/isArray";
import saLogo from "../../public/logo.svg";
import passwordDialog from "./passwordDialog.vue";
import Dialog from "./Dialog.vue";
import { useGlobalState } from "../composables/globalState.js";
import _ from "lodash";
await sync();
const { password, passwordGuard } = useGlobalState();

const rows = ref([]);
const headers = ref([]);
const cards = ref([]);
const popUpList = ref([]);
const clickedCard = ref(0);


watch(password, async (e) => {
  await checkPasswordCorrect();
  if (e != "" && passwordGuard.value) {
    rows.value = getRows();
    headers.value = getHeaders();
    cards.value = await getSmoothSortedMiniCards();
    popUpList.value = await [...Array(cards.value.length)].map((e) => false);
  }
});

const togglePopUp = (index) => {
  clickedCard.value = cards.value[index];
};
</script>

<style lang="scss" scoped>
.card-container {
  @apply flex flex-col md:pl-9 pb-6 w-full;
}
.card {
  //@apply flex-auto mt-5 shrink-0 bg-gray-100 shadow-xl shadow-gray-800 w-5/6 rounded-xl overflow-auto break-all px-5 py-4 mb-10 mx-10 md:mt-0 md:w-2/3 lg:w-1/3 md:px-4 md:mb-0 md:overflow-hidden;
  @apply w-5/6 md:w-1/2 mb-5 p-5 self-center bg-slate-200 rounded-xl shadow-xl break-all;
  &--dark {
    @apply bg-zinc-700 text-slate-200;
  }
  &--pop-up {
    @apply overflow-hidden;
  }
  &--pop-up-active {
    //@apply fixed h-auto top-7;
    position: absolute;
    top: 1rem;
    height: auto;
  }
}
.card--special {
}
.heading {
  @apply mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-emerald-300 break-words;
  word-break: break-word;
}
.card-image {
  @apply max-h-[40vh];
  margin: -1.25rem;
  width: calc(2 * 1.25rem + 100%) !important;
  max-width: 100vw;
  min-height: 25vh;
  object-fit: cover;
}

.backdrop {
  background: #00000055;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
