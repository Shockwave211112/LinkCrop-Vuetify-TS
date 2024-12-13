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
  const isValid = await v$.value.$validate();
  if (!isValid) {
    notify("Проверьте данные в полях!", 'warning');
    return
  }
  try {
    await apiClient.post('/auth/login', {
      'email': userEmail.value,
      'password': password.value,
    }).then((response) => {
      localStorage.setItem('authToken', response.data.token)
      user.login();
      notify("Авторизация успешна!", 'success');
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  } catch (error) {
    notify("Неправильные данные!", 'error');
  }
};

async function getOauthLink(provider: string = 'google') {
  try {
    await apiClient.get(`/auth/${provider}/redirect`)
      .then(({data}) => {
        window.location.href = data.redirect_url
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  } catch (error) {
    notify("Неправильные данные!", 'error');
  }
}
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

        <v-spacer />

        <div class="social d-flex flex-column align-center">
          <div class="text-grey">
            или войти с помощью соц. сетей:
          </div>
          <div class="buttons mt-2">
            <v-btn
              icon="mdi-google"
              variant="tonal"
              class="mr-2"
              @click="getOauthLink('google')"
            />
            <v-btn
              icon="mdi-facebook"
              variant="tonal"
              @click="getOauthLink('facebook')"
            />
          </div>
        </div>
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
