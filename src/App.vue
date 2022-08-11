<template>
  <router-view class="p-2"></router-view>
  <Nav />
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Nav from './components/Nav/Index.vue'

const store = useStore()
const user = ''
const stack = computed(() => {
  return store.state.stack
})
</script>

<style lang="scss">
#app {
  @apply min-h-screen bg-gray-50;
}

nav {
  a.active {
    &::after {
      @apply block w-full bg-green-500;
      content: '';
      height: 1.5px;
    }
  }
}
</style>
