<template>
  <Dialog class="z-40" @close="$router.push({ path: '/', replace: true })">
    <template v-for="(elem, label, index) in clickedCard" :key="label.id">
      <template v-if="!clickedCard.hasOwnProperty('Nazwa Meetingu') && index == 0">
        <h4 class="text-xl font-semibold mb-2">{{ clickedCard.Miasto }} {{ clickedCard['Dzień tygodnia'] }}</h4>
      </template>
      <template v-if="label == 'Nazwa Meetingu'">
        <h4 class="text-xl font-semibold mb-2">{{ elem }}</h4>
      </template>
      <template v-else-if="label == 'Sygnatura czasowa'"></template>
      <template v-else>
        <span>{{ label }}:</span> <strong> {{ elem }}</strong><br />
      </template>
    </template>
  </Dialog>
</template>

<script setup>
import { ref , watch } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute()

import Dialog from './Dialog.vue';

import { checkPasswordCorrect } from "../composables/decryptContent.js";
import { useGlobalState } from "../composables/globalState.js";
import { sync, setCardsToStore } from "../composables/fetchMeetings.js";


const { password, passwordGuard, cards } = useGlobalState();
const clickedCard = ref(0);


watch(password, async (e) => { 
  setCardsToStore();
  await checkPasswordCorrect();
  if (e != "" && passwordGuard.value) {
  clickedCard.value = cards.value.find(e => e['Sygnatura czasowa'] == route.params.id);
  }
})
if (password.value != "" && passwordGuard.value) {
  clickedCard.value = cards.value.find(e => e['Sygnatura czasowa'] == route.params.id);
}

</script>
