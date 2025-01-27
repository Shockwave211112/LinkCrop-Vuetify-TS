<script setup lang="ts">
import {computed, inject, ref, watch} from 'vue'
import {useUserStore} from "@/store/user";
import {useRouter} from "vue-router";
import {apiClient} from "@/plugins/axios";

import type {NotifyFunction} from "@/types/objects";

import AuthForm from './Auth/AuthForm.vue';
import RegisterForm from './Auth/RegisterForm.vue';
import ForgotPasswordForm from "@/components/Header/Auth/ForgotPasswordForm.vue";
import {useLocale, useTheme} from "vuetify";
import {useI18n} from "vue-i18n";
import {setCookie} from "@/utils/cookie";
import {useAppStore} from "@/store/app";

const register = ref(false);
const forgot = ref(false);

const notify = inject('notify') as NotifyFunction;
const user = useUserStore();
const app = useAppStore();
const router = useRouter();
const { t } = useI18n();
const theme = useTheme()
const { current } = useLocale();

function toggleTheme () {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme;
  setCookie('theme', newTheme, 180);
}

async function changeLanguage () {
  current.value = current.value === 'en' ? 'ru' : 'en';
  setCookie('locale', current.value, 180);
  window.location.reload();
}

watch(() => app.isMenuOpen, (newValue) => {
  if(!newValue) {
    register.value = false
    forgot.value = false
  }
});

const switchForm = (action: string = 'auth') => {
  switch(action) {
    case 'auth':
      register.value = false;
      forgot.value = false;
      break;
    case 'register':
      register.value = true;
      forgot.value = false;
      break;
    case 'forgot':
      register.value = false;
      forgot.value = true;
      break;
  }
};

async function logout() {
  try {
    apiClient.get('/auth/logout')
      .then(() => {
        localStorage.removeItem('authToken')
        user.logout();
        notify(t('messages.logout'), 'success', 3000);
        app.toggleMenu(false);
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
    <div class="d-flex align-center">
      <router-link
        to="/"
        class="text-decoration-none"
      >
        LinkCrop
      </router-link>
      <v-btn
        :icon="theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        size="small"
        variant="flat"
        class="bg-primary ml-2"
        @click="toggleTheme"
      />
      <v-btn
        icon="mdi-translate"
        size="small"
        variant="flat"
        class="bg-primary"
        @click="changeLanguage"
      />
    </div>
    <div class="d-flex align-center">
      <v-menu
        v-if="!user.userData"
        v-model="app.isMenuOpen"
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
            @click="app.toggleMenu(true)"
          >
            {{ t('header.title') }}
          </v-btn>
        </template>
        <v-card>
          <transition
            name="fade"
            mode="out-in"
          >
            <RegisterForm
              v-if="register"
              @switch="switchForm('auth')"
            />
            <ForgotPasswordForm
              v-else-if="forgot"
              @switch="switchForm('auth')"
            />
            <AuthForm
              v-else
              @switch="switchForm('register')"
              @forgot="switchForm('forgot')"
            />
          </transition>
        </v-card>
      </v-menu>

      <v-menu
        v-else
        v-model="app.isMenuOpen"
        min-width="300"
        offset="8"
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <div
            class="user d-flex align-center"
            v-bind="props"
            @click="app.toggleMenu(true)"
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
              {{ t('header.profile') }}
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              variant="text"
              prepend-icon="mdi-logout"
              @click="logout"
            >
              {{ t('header.logout') }}
            </v-btn>
          </v-list-item>
        </v-card>
      </v-menu>
    </div>
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
