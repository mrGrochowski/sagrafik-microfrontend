<template>
  <!-- component -->

  <!-- <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile-->
  <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 bg-emerald-300 shadow">
    <div id="tabs" class="flex justify-between">
      <router-link to="/" class="w-full focus:text-teal-500 focus:bg-zinc-900 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <!-- <IconHomeSvg class="inline-block mb-1" /> -->
        <span class="inline-block h-7 w-7"><meetingIcon /></span>
        <span class="tab tab-home block text-xs">Meetingi</span>
      </router-link>
      <router-link to="/about" class="w-full focus:text-teal-500 focus:bg-zinc-900 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <IconCategorySvg />
        <span class="tab tab-kategori block text-xs">Ustawienia</span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import IconHomeSvg from './IconHomeSvg.vue'
import IconCategorySvg from './IconCategorySvg.vue'

import meetingIcon from '../../../public/meeting2.svg'
</script>
