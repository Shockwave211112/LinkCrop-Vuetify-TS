<script setup lang="ts">
import {ref} from "vue";
import {inject} from "vue";
import {useUserStore} from "@/store/user";
import {apiClient} from "@/plugins/axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import type {NotifyFunction} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

const userEmail = ref<string>(null);
const password = ref<string>(null);

const user = useUserStore();

const rules = {
  userEmail: { required, email },
  password: { required },
};
const v$ = useVuelidate(rules, {userEmail, password});

async function auth(): Promise<void> {
  await v$.value.$validate();
  if (v$.value.$invalid) {
    notify("Проверьте данные в полях!", 'warning', 3000);
    return
  }
  try {
    await apiClient.post('/auth/login', {
      'email': userEmail.value,
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
    notify("Неправильные данные!", 'error', 3000);
  }
};
</script>

<template>
  <div>
    <v-card-title>Авторизация</v-card-title>
    <v-form>
      <v-card-text>
        <v-text-field
          v-model="userEmail"
          variant="outlined"
          label="Email"
          :error="v$.userEmail.$error"
          :class="v$.userEmail.$error ? 'pb-2' : ''"
          :error-messages="v$.userEmail.$errors[0]?.$message.toString()"
        />
        <v-text-field
          v-model="password"
          type="password"
          variant="outlined"
          label="Пароль"
          :error="v$.password.$error"
          :error-messages="v$.password.$errors[0]?.$message.toString()"
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
    </v-form>
  </div>
</template>

<style scoped>

</style>
