<script setup lang="ts">
import {inject, ref} from "vue";
import { apiClient }  from "@/plugins/axios";
import type { NotifyFunction } from "@/types/objects";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const notify = inject('notify') as NotifyFunction;
import {useUserStore} from "@/store/user";

const user = useUserStore().userData;
const emailVerified = ref<boolean>(user!.email_verified_at != null);

async function resendVerify() {
  try {
    await apiClient.get('/email/resend')
      .then(() => {
        notify('Письмо отправлено!', 'success');
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  } catch (error) {
    notify(t('errors.incorrect'), 'error');
  }
}

async function resetPassword() {
  try {
    await apiClient.post(`/auth/forgot-password`, {
      'email': user!.email,
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
  <v-card
    class="d-flex flex-column h-100 profile-settings"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="accent"
        indeterminate
      />
    </template>
    <v-card-title
      class="bg-secondary pa-4 d-flex align-center justify-space-between"
    >
      {{ t('profile.settings.header') }}
    </v-card-title>
    <v-card-subtitle class="text-body-1 font-size pt-2">
      <span class="font-weight-bold">{{ t('profile.settings.welcome') + user?.name }}.</span>
      <br>
      {{ t('profile.settings.subtitle') }}
    </v-card-subtitle>
    <v-card-text class="d-flex flex-grow-1 text-body-1">
      <v-row class="pa-1">
        <v-col cols="9">
          <div>
            <span class="font-weight-bold">{{ t('profile.settings.email') }}</span>
            <div class="d-flex align-center mt-2">
              <v-text-field
                v-model="user!.email"
                class="w-75"
                max-width="500px"
                density="comfortable"
                hide-details="auto"
                disabled
              />
              <v-checkbox
                v-model="emailVerified"
                :label="emailVerified
                  ? t('profile.admin.forms.emailConfirmation')
                  : t('profile.admin.forms.emailNotConfirmed')"
                disabled
                hide-details="auto"
                density="comfortable"
                false-icon="mdi-close"
              />
            </div>
            <v-sheet
              v-if="!emailVerified"
              class="bg-warning mt-2 pa-2 d-flex justify-space-between align-center"
              rounded
              max-width="500px"
            >
              <div class="text-black">
                <v-icon
                  size="small"
                  color="black"
                >
                  mdi-alert
                </v-icon>
                {{ t('profile.settings.verifyEmail') }}
              </div>
              <v-btn
                color="black"
                size="small"
                :text="t('profile.settings.sendBtn')"
                @click="resendVerify"
              />
            </v-sheet>
          </div>
          <div class="d-flex flex-column mt-2">
            <span class="font-weight-bold">{{ t('profile.settings.passwordChange') }}</span>
            <v-btn
              class="mt-2"
              variant="tonal"
              max-width="25%"
              :text="t('profile.settings.resetBtn')"
              @click="resetPassword"
            />
          </div>
        </v-col>
        <v-col cols="3" />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.profile-settings {
  background-color: rgba(var(--v-theme-secondary), 70%);
}
</style>
