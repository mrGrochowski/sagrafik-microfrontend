<template>

<!-- -->
      <Dialog @close="$router.push({ path: '/', replace: true })">
        <template v-for="(elem, label , index) in clickedCard">
        <template v-if="!clickedCard.hasOwnProperty('Nazwa Meetingu') && index == 0">
          <h4 class="text-xl font-semibold mb-2">{{ clickedCard.Miasto }} {{ clickedCard['Dzień tygodnia'] }}</h4>
        </template>
        <template v-if="label == 'Nazwa Meetingu'">
          <h4 class="text-xl font-semibold mb-2">{{ elem }}</h4>
        </template>
        <template v-else> 
          <span>{{ label }}:</span> <strong> {{ elem }}</strong><br />
        </template>
      </template> 
      </Dialog>
</template>

<script setup>
import Dialog from './Dialog.vue';

import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()

import { getSmoothSortedMiniCards } from "../composables/fetchMeetings.js";
import { useGlobalState } from "../composables/globalState.js";
const { password, passwordGuard } = useGlobalState();
const cards = ref([]);
const clickedCard = ref(0);

if (password.value != "" && passwordGuard.value) {
  cards.value = await getSmoothSortedMiniCards();
  console.log("🚀 ~ route.params.id:", route.params.id)
  clickedCard.value = cards.value.find(e => { console.log(e.id); return e.id == route.params.id });
}


</script>
