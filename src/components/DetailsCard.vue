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
    <div class="flex pt-4">
      <span class="cursor-pointer" @click="share">
        <ShareBtn class="inline-block h-[30px]" /> Udostępnij
      </span>
    </div>

  </Dialog>
</template>

<script setup>
import { ref , watch } from "vue";
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import Dialog from './Dialog.vue';
import ShareBtn from '../../public/share.svg'
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


const share = () => {
  navigator.share({
    text: 'Zapraszam na meeting',
    url: window.location.href,
    title:'Meeting SA'
  })
}

</script>
