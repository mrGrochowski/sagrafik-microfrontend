<template>
  <div :class="{ 'devMode' : VITE_DEVMODE == 1}">
    <Suspense><router-view class="p-2"></router-view></Suspense>
    <Nav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Nav from './components/Nav/Index.vue'
import { useGlobalState } from './composables/globalState';
const { VITE_DEVMODE } = import.meta.env


const state = useGlobalState()


</script>

<style lang="scss">
.devMode {
  font-family: 'Redacted Script', cursive !important;
}

html {
    font-size: calc(15px + 0.390625vw);
}
#app {
  //@apply min-h-screen bg-gray-50;
  @apply min-h-screen bg-[#1f222b];
}

* {
  scroll-behavior: smooth;  
  scroll-snap-align:center;
  scroll-snap-type: x mandatory;
}

</style>
