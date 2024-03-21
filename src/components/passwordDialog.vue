<template>
  <div
    id="popup-modal"
    tabindex="-1"
    class="fixed top-0 left-0 right-0 bottom-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex justify-center items-center"
  >
    <div
      class="w-full h-full absolute top-0 left-0 block backdrop-blur bg-slate-900/75"
    ></div>
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow bg-gray-700">
        <!-- <span
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
        </span> -->
        <div class="p-6 text-center">
          <logo class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"></logo>
          <h2
            class="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white break-words;"
          >
            Witaj w SA Grafik Online
          </h2>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Podaj <strong v-if="errorIndicator">POPRAWNE</strong> hasło standardowe
          </h3>
          <div class="flex align-top text-left items-end shrink-1">
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Hasło</label
              >
              <input
                type="password"
                id="password"
                class=""
                :class="`${errorIndicator?'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 animate-shake animate-once' : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}`"
                placeholder="•••••••••"
                autofocus
                required
                @change="(e) => passwordCheck(e.target.value)"
              />
            </div>
            <button
              data-modal-hide="popup-modal"
              type="submit"
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
import { ref, watch } from "vue";
import logo from "../../public/logo.svg";
import { useGlobalState } from "../composables/globalState.js";
const state = useGlobalState();
const { password, passwordGuard } = state;
const errorIndicator = ref(false);
import delay from 'lodash/delay'

watch(password, (e) => {
    errorIndicator.value = !passwordGuard.value;
    delay(()=>errorIndicator.value = false, 2000);
    return;
});

const passwordCheck = (value) => {
  return (state.password.value = value);
};
</script>
