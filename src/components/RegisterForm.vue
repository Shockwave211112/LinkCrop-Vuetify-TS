<script setup lang="ts">
import {ref} from "vue";
import { useVuelidate } from '@vuelidate/core'
import {required, email, minLength, sameAs} from '@vuelidate/validators'
import axios, {AxiosResponse} from 'axios';
import type {TokenResponse} from "@/data/responses";

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordConfirmation = ref<string>('')

const rules = {
  name: { required },
  email: { required,
    email
  },
  password: {
    required,
    minLength: minLength(8),
    sameAsConfirmation: sameAs(passwordConfirmation)
  },
  passwordConfirmation: {
    required,
    minLength: minLength(8),
    sameAsPassword: sameAs(password)
  },
}
const v$ = useVuelidate(rules, { name, email, password, passwordConfirmation })

async function register() {
  v$.value.validate();
  if(v$.value.$error) {
    console.log('aboba')
    return
  }
  try {
    // const response: AxiosResponse<TokenResponse> = await axios.post(import.meta.env.API_URL, )
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div>
    <v-card-title>Регистрация</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="email"
        variant="outlined"
        label="Email"
      />
      <v-text-field
        v-model="name"
        variant="outlined"
        label="Имя"
      />
      <v-text-field
        v-model="password"
        variant="outlined"
        label="Пароль"
      />
      <v-text-field
        v-model="passwordConfirmation"
        variant="outlined"
        label="Повтор пароля"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        icon="mdi-keyboard-backspace"
        variant="text"
        @click="$emit('switch')"
      />
      <v-btn
        text="Зарегистрироваться"
        variant="text"
        @click="register"
      />
    </v-card-actions>
  </div>
</template>

<style scoped>

</style>
