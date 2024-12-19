<script setup lang="ts">
import {inject, ref} from "vue";
import {apiClient} from "@/plugins/axios";

import type {NotifyFunction} from "@/types/objects";
import type {Model} from "@/types/constants";
const notify = inject('notify') as NotifyFunction;

const props =  defineProps({
  selectedModel: ref<Model|null>(null),
  selectedId: ref<number>(-1),
});
const emit = defineEmits(['close-modal', 'delete-item'])
const modelName = ref<string>('');
const loading = ref<boolean>(true);

async function deleteItem() {
  await apiClient.delete(`/${props.selectedModel}/` + props.selectedId)
    .then((response) => {
      notify(response.data.message, 'success');
      emit('delete-item');
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
}

function getModelName() {
  switch(props.selectedModel) {
    case 'user':
      modelName.value = 'пользователя';
      break;
    case 'groups':
      modelName.value = 'группу';
      break;
    case 'links':
      modelName.value = 'ссылку';
      break;
  }
  loading.value = false;
}
</script>

<template>
  <v-dialog
    max-width="400"
    scrim="black"
    @after-enter="getModelName"
    @after-leave="loading = true"
  >
    <v-card
      :loading="loading"
      :disabled="loading"
    >
      <template #loader="{ isActive }">
        <v-progress-linear
          v-if="loading"
          :active="isActive"
          color="accent"
          indeterminate
        />
      </template>
      <v-card-title>Уверены?</v-card-title>
      <v-card-text>Вы точно хотите удалить {{ modelName }}?</v-card-text>
      <v-card-actions>
        <v-btn
          variant="text"
          @click="deleteItem(selectedId)"
        >
          Да
        </v-btn>
        <v-btn
          variant="text"
          @click="emit('close-modal')"
        >
          Нет
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
