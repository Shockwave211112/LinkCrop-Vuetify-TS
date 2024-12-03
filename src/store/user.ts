import { defineStore } from 'pinia'
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const id = ref<number>(-1)
  const name = ref<string|null>(null)
  const email = ref<string|null>(null)
  const roles = ref<object>([])
  const isAuthorized = ref<boolean>(false)

  return {
    id,
    name,
    email,
    roles,
    isAuthorized,
  }
})
