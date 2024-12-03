<script setup lang="ts">
import {provide, reactive} from "vue";

interface Notify {
  visible: boolean,
  timeout: number,
  color: string,
  message: string,
}

const notification = reactive<Notify>({
  visible: false,
  timeout: 3000,
  color: 'info',
  message: '',
});

const notify = (message: string, options: { color?: string, timeout?: number } = {}) => {
  notification.message = message;
  notification.color = options.color || 'info';
  notification.timeout = options.timeout || 3000;
  notification.visible = true;
};

provide('notify', notify);
</script>


<template>
  <v-snackbar
    v-model="notification.visible"
    :timeout="notification.timeout"
    :color="notification.color"
    top
  >
    {{ notification.message }}
    <template #actions>
      <v-btn
        @click="notification.visible = false"
      >
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
  <slot />
</template>

<style scoped>

</style>
