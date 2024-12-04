<script setup lang="ts">
import {inject, watch} from "vue";
import type {Notify} from "@/types/objects";

const notifications = inject('notifications') as Notify[];

const removeNotification = (id: string) => {
  const index = notifications.findIndex(notification => notification.id === id);
  if (index !== -1) {
    notifications.splice(index, 1);
  }
};
</script>

<template>
  <div
    v-for="(notification, index) in notifications.filter(item => item.visible)"
    :key="notification.id"
  >
    <v-snackbar
      v-model="notification.visible"
      :timeout="notification.timeout"
      :color="notification.color"
      :style="`bottom: ${index * 60}px`"
      @update:model-value="removeNotification(notification.id)"
    >
      {{ notification.message }}
      <template #actions>
        <v-btn
          icon="mdi-close-thick"
          @click="removeNotification(notification.id)"
        />
      </template>
    </v-snackbar>
  </div>
  <slot />
</template>

<style scoped>

</style>
