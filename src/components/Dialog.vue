<template>
  <div
    id="dialog"
    tabindex="-1"
    class="fixed isolate top-0 left-0 right-0 bottom-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex justify-center items-center"
  >
    <div class="w-full h-full absolute top-0 left-0 block backdrop-blur bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75 "></div>
    <slot></slot>
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
