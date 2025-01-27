import { defineStore } from 'pinia'
import { ref } from "vue";
import { apiClient } from "@/plugins/axios";
import type { User } from "@/types/objects";
import router from "@/router";

export const useAppStore = defineStore('app', () => {
  const isMenuOpen = ref(false);

  const toggleMenu = (state = false) => {
    isMenuOpen.value = state;
  }

  return {
    isMenuOpen,
    toggleMenu,
  }
})
