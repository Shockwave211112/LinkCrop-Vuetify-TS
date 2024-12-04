<script setup lang="ts">

import {ref} from "vue";
import {inject} from "vue";
import {useUserStore} from "@/store/user";
import {apiClient} from "@/plugins/axios";

import type {NotifyFunction} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

const email = ref<string>(null);
const password = ref<string>(null);

const user = useUserStore();

async function auth(): Promise<void> {
  try {
    await apiClient.post('/auth/login', {
      'email': email.value,
      'password': password.value,
    }).then((response) => {
      localStorage.setItem('authToken', response.data.token)
      user.login();
      notify("Авторизация успешна!", 'success', 3000);
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error', 3000);
    })
  } catch (error) {
    console.log(error)
  }
};
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
        type="password"
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
