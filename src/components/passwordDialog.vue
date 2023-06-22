<template>
  <a
    href="#popup-modal"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    Toggle modal
  </a>

  <div id="popup-modal" tabindex="-1" class="fixed top-0 left-0 right-0 bottom-0 z-50 target:block hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full">
    <a href="#_clear" class="w-full h-full absolute top-0 left-0 block backdrop-blur bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"></a>
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <a
          href="#_clear"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </a>
        <div class="p-6 text-center">
          <logo class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"></logo>
          <h2 class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white break-words;"> Witaj w SA Grafik Online </h2>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Podaj hasło które otrzymałeś</h3>
        <div class="flex align-top text-left items-end shrink-1">
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hasło</label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              autofocus
              required
            />
          </div>
          <button
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-2"
          >
            Zatwierdź
          </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '../../public/logo.svg'
</script>
