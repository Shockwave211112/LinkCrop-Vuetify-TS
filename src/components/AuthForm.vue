<script setup lang="ts">

import {ref} from "vue";
import axios, {type AxiosResponse} from "axios";
import type {TokenResponse} from "@/types/responses";
import type {NotifyFunction} from "@/types/functions";
import {inject} from "vue";

const notify = inject('notify') as NotifyFunction;

const email = ref<string>(null)
const password = ref<string>(null)

async function auth() {
  try {
    const response: AxiosResponse<TokenResponse> = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', {
      'email': email.value,
      'password': password.value,
    }).then().catch(({response}) => {
      notify(response.data.message, { color: 'error', timeout: 300000 })

    })
  } catch (error) {
    console.log(error)
  }
}
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
        @click="auth"
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
