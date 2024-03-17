import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    const password = ref('')
    const passwordGuard = ref(false)
    const Storage = ref('')
    const cards = ref('');
    return { password, passwordGuard , Storage , cards }
  }
)