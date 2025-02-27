<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {apiClient} from "@/plugins/axios";

import type {Group, NotifyFunction} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

import DeleteModal from "@/components/Profile/Modals/DeleteModal.vue";
import GroupEditForm from "@/components/Profile/GroupEditForm.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const isLoading = ref<boolean>(true);
const props =  defineProps<{
  groupId: number,
}>();
const emit = defineEmits(['close-modal', 'delete-item', 'update-item']);
const group = reactive<Group>({
  id: -1,
  name: '',
  description: '',
  count: 0,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  links: [],
  users: [],
});
const deleteDialog = ref<boolean>(false);

async function fetchLinkInfo() {
  await apiClient.get(`/groups/` + props.groupId)
    .then(({data}) => {
      group.id = data.entity.id;
      group.name = data.entity.name;
      group.description = data.entity.description;
      group.count = data.entity.referral;
      group.users = data.entity.users;
      group.links = data.entity.links;
      group.created_at = data.entity.created_at;
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
    })
}

async function save(validate: () => Promise<boolean>) {
  const isValid = await validate();

  if(isValid) {
    await apiClient.patch('/groups/' + props.groupId, {
      'name': group.name,
      'description': group.description,
    }).then((response) => {
      emit('update-item');
      notify(response.data.message, 'success');
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  }
}
</script>

<template>
  <v-dialog
    max-width="700"
    min-height="200"
    scrim="black"
    @after-enter="fetchLinkInfo"
    @after-leave="isLoading = true"
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
        {{ t('profile.admin.forms.group') + ' #' + groupId }}
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
          <GroupEditForm
            :group="group"
          >
            <template #buttons="{ validate }">
              <v-btn
                icon="mdi-trash-can-outline"
                class="bg-error mr-2"
                @click="deleteDialog = true"
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  {{ t('profile.buttons.delete') }}
                </v-tooltip>
              </v-btn>
              <v-btn
                icon="mdi-content-save"
                class="bg-success"
                @click="save(validate)"
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  {{ t('profile.buttons.save') }}
                </v-tooltip>
              </v-btn>
            </template>
          </GroupEditForm>
        </div>
      </v-card-text>
    </v-card>
    <DeleteModal
      v-model="deleteDialog"
      :selected-id="groupId"
      :selected-model="'groups'"
      @close-modal="deleteDialog = false"
      @delete-item="deleteDialog = false; $emit('delete-item');"
    />
  </v-dialog>
</template>

<style scoped>

</style>
