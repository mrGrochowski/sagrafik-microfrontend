import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
        const password = ref('')
        const isPasswordCorrect = ref('')
    return { password, isPasswordCorrect }
  }
)