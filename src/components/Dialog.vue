<template>
  <div
    id="dialog"
    tabindex="-1"
    class="fixed isolate top-0 left-0 bottom-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex justify-center items-start"
  >
    <div class="fixed z-0 top-0 left-0 bottom-0 right-0 block backdrop-blur bg-slate-900/75 " @click="$emit('close')"></div>
    <div class="mt-3 p-3 pr-7 bg-slate-200 rounded-xl shadow-xl relative w-4/5 h-auto break-words shadow-[0_0px_60px_-15px_#99f6e4]">
    <span class="absolute right-3 bg-slate-200" @click="$emit('close')">✖</span>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>

</script>
<style>
.backdrop {
  z-index:-1;
  background-color: rgba(0,0,0,0.3);
}
</style>
