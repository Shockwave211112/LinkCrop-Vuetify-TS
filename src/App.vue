<template>
  <v-app>
    <v-main>
      <Notification>
        <router-view />
      </Notification>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Notification from "@/components/Notification.vue";
</script>
