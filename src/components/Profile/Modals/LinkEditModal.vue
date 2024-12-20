<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {apiClient} from "@/plugins/axios";

import type {Link, NotifyFunction} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;
import DeleteModal from "@/components/Profile/Modals/DeleteModal.vue";
import LinkEditForm from "@/components/Profile/LinkEditForm.vue";
import StatisticModal from "@/components/Profile/Modals/StatisticModal.vue";

const referralUrl = import.meta.env.VITE_API_URL + '/l/';

const loading = ref<boolean>(true);

const props =  defineProps({
  linkId: ref<number>(-1),
});

const emit = defineEmits(['close-modal', 'delete-item', 'update-item']);
const link = reactive<Link>({});
const deleteDialog = ref<boolean>(false);
const statsDialog = ref<boolean>(false);

async function fetchLinkInfo() {
  await apiClient.get(`/links/` + props.linkId)
    .then(({data}) => {
      link.id = data.entity.id;
      link.name = data.entity.name;
      link.description = data.entity.description;
      link.referral = data.entity.referral;
      link.origin = data.entity.origin;
      link.created_at = data.entity.created_at;
      link.groups = data.entity.groups;
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      loading.value = false;
    })
}

async function save(validate) {
  const isValid = await validate();

  if(isValid) {
    await apiClient.patch('/links/' + props.linkId, {
      'name': link.name,
      'description': link.description,
      'origin': link.origin,
    }).then((response) => {
      emit('update-item');
      notify(response.data.message, 'success');
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  }
}

function copyReferral(referral: string) {
  try {
    navigator.clipboard.writeText(referralUrl + referral);
    notify("Скопировано", 'success');
  } catch (error) {
    notify("Произошла ошибка", 'error');
  }
}
</script>

<template>
  <v-dialog
    max-width="700"
    min-height="200"
    scrim="black"
    @after-enter="fetchLinkInfo"
    @after-leave="loading = true"
  >
    <v-card
      :loading="loading"
      :disabled="loading"
    >
      <template #loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="accent"
          indeterminate
        />
      </template>
      <v-card-title class="d-flex justify-space-between align-center">
        Ссылка #{{ linkId }}
        <v-btn
          icon="mdi-close"
          size="small"
          @click="emit('close-modal')"
        />
      </v-card-title>
      <v-card-text class="d-flex align-center justify-center">
        <v-progress-circular
          v-if="loading"
          indeterminate
        />
        <div
          v-else
          class="w-100 h-100"
        >
          <LinkEditForm
            :link="link"
            :edit-groups="false"
          >
            <template #buttons="{ validate }">
              <v-btn
                icon="mdi-chart-line-variant"
                class="bg-accent mr-2"
                @click="statsDialog = true "
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  Открыть статистику
                </v-tooltip>
              </v-btn>
              <v-btn
                icon="mdi-content-copy"
                class="bg-accent mr-2"
                @click="copyReferral(link.referral)"
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  Скопировать ссылку
                </v-tooltip>
              </v-btn>
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
                  Удалить
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
                  Сохранить
                </v-tooltip>
              </v-btn>
            </template>
          </LinkEditForm>
        </div>
      </v-card-text>
    </v-card>
    <DeleteModal
      v-model="deleteDialog"
      :selected-id="linkId"
      :selected-model="'links'"
      @close-modal="deleteDialog = false"
      @delete-item="deleteDialog = false; $emit('delete-item');"
    />
    <StatisticModal
      v-model="statsDialog"
      :link-id="linkId"
      @close-stat="statsDialog = false"
    />
  </v-dialog>
</template>

<style scoped>

</style>
