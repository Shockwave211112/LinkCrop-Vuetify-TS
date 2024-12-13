<script setup lang="ts">
import {inject, ref, watch} from 'vue'
import {useUserStore} from "@/store/user";
import {useRouter} from "vue-router";
import {apiClient} from "@/plugins/axios";

import type {NotifyFunction} from "@/types/objects";

import AuthForm from './Auth/AuthForm.vue';
import RegisterForm from './Auth/RegisterForm.vue';


const menu = ref(false);
const register = ref(false);
watch(menu, (newValue) => {
  if(!newValue) {
    register.value = false
  }
});

const switchForm = () => {
  register.value = !register.value
};

const notify = inject('notify') as NotifyFunction;
const user = useUserStore();
const router = useRouter();

async function logout() {
  try {
    apiClient.get('/auth/logout')
      .then(() => {
        localStorage.removeItem('authToken')
        user.logout();
        notify('Вы вышли из системы', 'success', 3000);
        menu.value = false;
        router.push('/');
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error', 3000);
    })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <header class="position-sticky bg-primary top-0 d-flex align-center justify-space-between pa-5">
    <router-link
      to="/"
      class="text-decoration-none"
    >
      LinkCrop
    </router-link>
    <v-menu
      v-if="!user.userData"
      v-model="menu"
      min-width="300"
      offset="8"
      :close-on-content-click="false"
      @on-close="register=false"
    >
      <template #activator="{ props }">
        <v-btn
          variant="tonal"
          prepend-icon="mdi-login"
          v-bind="props"
          @click="menu=true"
        >
          Войти/Зарегистрироваться
        </v-btn>
      </template>
      <v-card>
        <transition
          name="fade"
          mode="out-in"
        >
          <AuthForm
            v-if="!register"
            @switch="switchForm"
          />
          <RegisterForm
            v-else
            @switch="switchForm"
          />
        </transition>
      </v-card>
    </v-menu>

    <v-menu
      v-else
      v-model="menu"
      min-width="300"
      offset="8"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <div
          class="user d-flex align-center"
          v-bind="props"
          @click="menu=true"
        >
          <span>{{ user.userData.name }}</span>
          <v-icon
            class="pa-6"
            size="small"
          >
            mdi-account-circle-outline
          </v-icon>
        </div>
      </template>
      <v-card>
        <v-list-item>
          <v-btn
            variant="text"
            prepend-icon="mdi-account"
            @click="router.push('/profile')"
          >
            Мои ссылки
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            variant="text"
            prepend-icon="mdi-logout"
            @click="logout"
          >
            Выйти
          </v-btn>
        </v-list-item>
      </v-card>
    </v-menu>
  </header>
</template>

<style scoped>
header {
  height: 3.5rem;
  z-index: 20;
  font-size: x-large;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.2);
}

a {
  color: inherit;
  font-weight: bold;
  font-size: x-large;
}

.user:hover {
  cursor: pointer;
  color: rgb(var(--v-theme-accent));
  transition: color 0.2s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
