<script setup lang="ts">
import {ref} from "vue";
import {inject} from "vue";
import {apiClient} from "@/plugins/axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import type {NotifyFunction} from "@/types/objects";
import {useI18n} from "vue-i18n";
const notify = inject('notify') as NotifyFunction;

const { t } = useI18n();
const userEmail = ref<string>(null);

const rules = {
  userEmail: { required, email }
};
const v$ = useVuelidate(rules, {userEmail});

async function sendResetPasswordEmail() {
  try {
    await apiClient.post(`/auth/forgot-password`, {
      'email': userEmail.value,
    })
      .then(() => {
        notify(t('messages.emailSent'), 'success');
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
    <v-card-title>{{ t('header.resetTitle') }}</v-card-title>
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
        <div class="d-flex justify-end mb-2" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          icon="mdi-keyboard-backspace"
          variant="text"
          @click="$emit('switch')"
        />
        <v-btn
          variant="text"
          @click="sendResetPasswordEmail"
        >
          {{ t('header.reset') }}
        </v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>

<style scoped>
</style>
