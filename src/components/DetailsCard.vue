<template>
  <Dialog @close="$router.push({ path: '/', replace: true })">
    <template v-for="(elem, label, index) in clickedCard" :key="label.id">
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

import { useGlobalState } from "../composables/globalState.js";
import { ref } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute()

const { password, passwordGuard, cards } = useGlobalState();
const clickedCard = ref(0);

if (password.value != "" && passwordGuard.value) {
  clickedCard.value = cards.value.find(e => e.id == route.params.id);
}

</script>
