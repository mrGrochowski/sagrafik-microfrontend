<template>
  <div :class="{ 'devMode' : VITE_DEVMODE == 1}">
    <Suspense><router-view class="p-2"></router-view></Suspense>
    <Nav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Nav from './components/Nav/Index.vue'
const { VITE_DEVMODE } = import.meta.env

const store = useStore()
const user = ''
const stack = computed(() => {
  return store.state.stack
})

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
  @apply min-h-screen bg-zinc-800;
}

* {
  scroll-behavior: smooth;  
  scroll-snap-align:center;
  scroll-snap-type: x mandatory;
}
/* nav {
  a.active {
    &::after {
      @apply block w-full bg-green-500;
      content: '';
      height: 1.5px;
    }
  }
} */
</style>
