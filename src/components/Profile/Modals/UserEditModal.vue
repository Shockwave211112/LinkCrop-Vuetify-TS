<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {apiClient} from "@/plugins/axios";

import type {NotifyFunction, User} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import DeleteModal from "@/components/Profile/Modals/DeleteModal.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const isLoading = ref<boolean>(true);
const props =  defineProps<{
  userId: number,
}>();
const emit = defineEmits(['close-modal', 'delete-item', 'update-item']);
const user = reactive<User>({
  id: -1,
  email: '',
  name: '',
  created_at: new Date().toISOString(),
  email_verified_at: '',
});
const emailVerified = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);

const rules = {
  user: {
    name: { required },
    email: { required, email },
  }
};
const v$ = useVuelidate(rules, { user });

function clearData() {
  user.id = -1;
  user.name = '';
  user.email = '';
  user.email_verified_at = '';
  user.created_at = '';
  isLoading.value = true;
}

async function fetchUserInfo() {
  await apiClient.get(`/user/` + props.userId)
    .then(({data}) => {
      user.id = data.entity.id;
      user.name = data.entity.name;
      user.email = data.entity.email;
      user.email_verified_at = data.entity.email_verified_at;
      user.created_at = data.entity.created_at;
      emailVerified.value = (user.email_verified_at != null);
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
    })
}

async function save() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    notify(t('messages.checkFields'), 'warning');
    return
  }

  await apiClient.patch('/user/' + props.userId, {
    'name': user.name,
    'email': user.email,
  }).then((response) => {
    emit('update-item');
    notify(response.data.message, 'success');
  }).catch(({response}) => {
    notify(response.data.message, 'error');
  })
}
</script>

<template>
  <v-dialog
    max-width="700"
    min-height="200"
    scrim="black"
    @after-enter="fetchUserInfo"
    @after-leave="clearData"
  >
    <v-card
      :loading="isLoading"
      :disabled="isLoading"
    >
      <template #loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="accent"
          indeterminate
        />
      </template>
      <v-card-title class="d-flex justify-space-between align-center">
        {{ t('profile.admin.forms.user') + ' #' + userId }}
        <v-btn
          icon="mdi-close"
          size="small"
          @click="emit('close-modal')"
        />
      </v-card-title>
      <v-card-text class="d-flex align-center justify-center">
        <v-progress-circular
          v-if="isLoading"
          indeterminate
        />
        <div
          v-else
          class="w-100 h-100"
        >
          <v-text-field
            v-model="user.name"
            variant="outlined"
            :label="t('profile.admin.users.name')"
            :error="v$.user.name.$error"
            :class="v$.user.name.$error ? 'pb-2' : ''"
            :error-messages="v$.user.name.$errors[0]?.$message.toString()"
          />
          <div class="d-flex">
            <v-text-field
              v-model="user.email"
              variant="outlined"
              label="Email"
              :error="v$.user.email.$error"
              :class="v$.user.email.$error ? 'pb-2' : ''"
              :error-messages="v$.user.email.$errors[0]?.$message.toString()"
            />
            <v-checkbox
              v-model="emailVerified"
              :label="emailVerified
                ? t('profile.admin.forms.emailConfirmation')
                : t('profile.admin.forms.emailNotConfirmed')"
              disabled
              false-icon="mdi-close"
            />
          </div>
          <v-date-input
            v-model="user.created_at"
            variant="outlined"
            disabled
            hide-details
            :label="t('profile.admin.users.createdAt')"
            format="DD-MM-YYYY"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          prepend-icon="mdi-trash-can-outline"
          class="text-error"
          variant="tonal"
          @click="deleteDialog = true"
        >
          {{ t('profile.buttons.delete') }}
        </v-btn>
        <v-btn
          prepend-icon="mdi-content-save"
          class="text-success mr-3"
          variant="tonal"
          @click="save"
        >
          {{ t('profile.buttons.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <DeleteModal
      v-model="deleteDialog"
      :selected-id="userId"
      :selected-model="'user'"
      @close-modal="deleteDialog = false"
      @delete-item="deleteDialog = false; $emit('delete-item');"
    />
  </v-dialog>
</template>

<style scoped>

</style>
