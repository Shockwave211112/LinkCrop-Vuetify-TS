<script setup lang="ts">
import {inject, ref} from "vue";
import { useVuelidate } from '@vuelidate/core'
import {required, email, minLength, sameAs} from '@vuelidate/validators'
import axios, {AxiosResponse} from 'axios';
import type {TokenResponse} from "@/types/responses";
import {apiClient} from "@/plugins/axios";
import type {NotifyFunction} from "@/types/objects";
import {useUserStore} from "@/store/user";
import {useI18n} from "vue-i18n";
const notify = inject('notify') as NotifyFunction;
const user = useUserStore();

const { t } = useI18n();
const name = ref<string>('')
const userEmail = ref<string>('')
const password = ref<string>('')
const passwordConfirmation = ref<string>('')

const rules = {
  name: { required },
  userEmail: { required,
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
const v$ = useVuelidate(rules, { name, userEmail, password, passwordConfirmation })

async function register(): Promise<void> {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    notify(t('messages.checkFields'), 'warning');
    return
  }
  try {
    await apiClient.post('/auth/registration', {
      'email': userEmail.value,
      'name': name.value,
      'password': password.value,
      'password_confirmation': passwordConfirmation.value,
    }).then((response) => {
        localStorage.setItem('authToken', response.data.token)
        user.login();
        notify(t('messages.register'), 'success');
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  } catch (error) {
    notify(t('errors.incorrect'), 'error');
  }
};

</script>

<template>
  <div>
    <v-card-title>{{ t('header.register') }}</v-card-title>
    <v-form>
      <v-card-text>
        <v-text-field
          v-model="userEmail"
          variant="outlined"
          type="text"
          label="Email"
          :error="v$.userEmail.$error"
          :class="v$.userEmail.$error ? 'pb-2' : ''"
          :error-messages="v$.userEmail.$errors[0]?.$message.toString()"
        />
        <v-text-field
          v-model="name"
          variant="outlined"
          type="text"
          :label="t('header.name')"
          :error="v$.name.$error"
          :class="v$.name.$error ? 'pb-2' : ''"
          :error-messages="v$.name.$errors[0]?.$message.toString()"
        />
        <v-text-field
          v-model="password"
          variant="outlined"
          type="password"
          :label="t('header.password')"
          autocomplete="off"
          :error="v$.password.$error"
          :class="v$.password.$error ? 'pb-2' : ''"
          :error-messages="v$.password.$errors[0]?.$message.toString()"
        />
        <v-text-field
          v-model="passwordConfirmation"
          type="password"
          variant="outlined"
          :label="t('header.passwordConfirmation')"
          autocomplete="off"
          :error="v$.passwordConfirmation.$error"
          :error-messages="v$.passwordConfirmation.$errors[0]?.$message.toString()"
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
          :text="t('header.registerConfirm')"
          variant="text"
          @click="register"
        />
      </v-card-actions>
    </v-form>
  </div>
</template>

<style scoped>

</style>
