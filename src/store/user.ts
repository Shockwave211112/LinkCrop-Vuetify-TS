import { defineStore } from 'pinia'
import { ref } from "vue";
import { apiClient } from "@/plugins/axios";
import type { User } from "@/types/objects";
import router from "@/router";

export const useUserStore = defineStore('user', () => {
  const userData = ref<User|null>(
    localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null);

  function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    userData.value = null;
  }

  async function login() {
    await apiClient.get('/user/info')
      .then(({data}) => {
        const userObject = data.entity;
        userObject.roles = data.roles;

        localStorage.setItem('user', JSON.stringify(userObject));
        userData.value = userObject;

        router.push('/profile');
      });
  }

  return {
    userData,
    logout,
    login,
  }
})
