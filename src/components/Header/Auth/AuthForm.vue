<script setup lang="ts">
import {ref} from "vue";
import {inject} from "vue";
import {useUserStore} from "@/store/user";
import {apiClient} from "@/plugins/axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import type {NotifyFunction} from "@/types/objects";
import {useI18n} from "vue-i18n";
const notify = inject('notify') as NotifyFunction;

const { t } = useI18n();
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
    notify(t('messages.checkFields'), 'warning');
    return
  }
  try {
    await apiClient.post('/auth/login', {
      'email': userEmail.value,
      'password': password.value,
    }).then((response) => {
      localStorage.setItem('authToken', response.data.token)
      user.login();
      notify(t('messages.login'), 'success');
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  } catch (error) {
    notify(t('errors.incorrect'), 'error');
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
    notify(t('errors.incorrect'), 'error');
  }
}
</script>

<template>
  <div>
    <v-card-title>{{ t('header.auth') }}</v-card-title>
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
          autocomplete="off"
          variant="outlined"
          :label="t('header.password')"
          hide-details="auto"
          :error="v$.password.$error"
          :error-messages="v$.password.$errors[0]?.$message.toString()"
        />
        <div class="d-flex justify-end mt-2 mb-2">
          <v-btn
            variant="text"
            size="small"
            @click="$emit('forgot')"
          >
            {{ t('header.forgot') }}
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :text="t('header.login')"
          variant="text"
          @click="auth"
        />
        <v-btn
          :text="t('header.register')"
          variant="text"
          @click="$emit('switch')"
        />
      </v-card-actions>
      <div class="social d-flex flex-column align-center mb-5">
        <div class="text-grey">
          {{ t('header.social') }}
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
    </v-form>
  </div>
</template>

<style scoped>
.social {
  font-size: small
}
</style>
