import { defineStore } from 'pinia'
import {ref} from "vue";

export const userStore = defineStore('user', () => {
  const id = ref(0)
  const name = ref(null)
  const email = ref(null)
  const roles = ref(null)
  const isAuthorized = ref(false)

  return {
    id,
    name,
    email,
    roles,
    isAuthorized,
  }
})
