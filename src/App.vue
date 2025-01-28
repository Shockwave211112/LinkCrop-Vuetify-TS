<template>
  <v-app
    :class="{ 'light-theme': !theme.global.current.value.dark, 'rotate-background': profilePage }"
    class="background"
  >
    <v-main>
      <router-view />
      <Notification />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {computed, provide, reactive} from 'vue';
import Notification from "@/components/Notification.vue";
import type { Notify } from "@/types/objects";

const notifications = reactive<Notify[]>([]);
const addNotification = (message: string, color?: string, timeout?: number) => {
  notifications.push({
    id: `${Date.now()}-${Math.random()}`,
    message,
    color: color || 'info',
    timeout: timeout || 3000,
    visible: true,
  });
};

import {useLocale, useTheme} from "vuetify";
import {useRoute} from "vue-router";
import {getCookie} from "@/utils/cookie";


const route = useRoute();
const profilePage = computed(() => route.name === "/profile");

const { current } = useLocale();
const savedLang = getCookie('locale');
if(savedLang) {
  current.value = savedLang;
}

const theme = useTheme();
const savedTheme = getCookie('theme');
if(savedTheme) {
  theme.global.name.value = savedTheme;
}

provide('notifications', notifications);
provide('notify', addNotification);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.light-theme.background::before {
  filter: brightness(70%) invert(100%) !important;
}

.rotate-background.background::before {
  rotate: 180deg;
}

.background {
  position: relative;
  z-index: 0;
}

.background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  height: 100vh;
  background-image: url("@/assets/imgs/patterns.jpg");
  background-size: cover;
  background-repeat: repeat;
  filter: brightness(70%);
}
</style>
