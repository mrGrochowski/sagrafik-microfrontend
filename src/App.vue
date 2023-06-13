<template>
  <div :class="{ 'devMode' : VITE_DEVMODE == 1}">
  <h1>{{VITE_DEVMODE == 1}}</h1>
    <router-view class="p-2"></router-view>
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

#app {
  //@apply min-h-screen bg-gray-50;
  @apply min-h-screen bg-zinc-800;
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
