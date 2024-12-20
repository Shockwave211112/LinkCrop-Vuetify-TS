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

async function deleteItem() {
  await apiClient.delete(`/${props.selectedModel}/` + props.selectedId)
    .then((response) => {
      notify(response.data.message, 'success');
      emit('delete-item');
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
}
</script>

<template>
  <v-dialog
    max-width="400"
    scrim="black"
  >
    <v-card>
      <v-card-title>Удаление</v-card-title>
      <v-card-text>Вы уверены?</v-card-text>
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
