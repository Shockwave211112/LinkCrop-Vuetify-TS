<template>
  <v-app>
    <v-main>
      <router-view />
      <Notification />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { provide, reactive } from 'vue';
import Notification from "@/components/Notification.vue";
import type {Notify} from "@/types/objects";

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
</style>
