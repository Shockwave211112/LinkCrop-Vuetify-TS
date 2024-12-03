<script setup lang="ts">

import {ref} from "vue";

const email = ref(null)
const password = ref(null)
</script>

<template>
  <div>
    <v-card-title>Авторизация</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="email"
        variant="outlined"
        label="Email"
      />
      <v-text-field
        v-model="password"
        variant="outlined"
        label="Пароль"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text="Войти"
        variant="text"
      />
      <v-btn
        text="Регистрация"
        variant="text"
        @click="$emit('switch')"
      />
    </v-card-actions>
  </div>
</template>

<style scoped>

</style>
