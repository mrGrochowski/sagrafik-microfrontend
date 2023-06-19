<template>
  <!-- component -->

  <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 bg-emerald-300 shadow md:w-1/12 md:max-w-min md:h-full">
    <div id="tabs" class="flex justify-between md:flex-col">
      <div id="logo" class="w-full text-zinc-900 focus:text-teal-500 focus:bg-zinc-900 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"><saLogo></saLogo></div>
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
import saLogo from '../../../public/logo.svg'
import meetingIcon from '../../../public/meeting2.svg'
</script>
