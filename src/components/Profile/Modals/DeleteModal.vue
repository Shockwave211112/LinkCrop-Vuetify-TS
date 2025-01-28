<script setup lang="ts">
import {inject} from "vue";
import {apiClient} from "@/plugins/axios";
import type {NotifyFunction} from "@/types/objects";
import type {Model} from "@/types/constants";
import {useI18n} from "vue-i18n";

const notify = inject('notify') as NotifyFunction;
const { t } = useI18n();

const props =  defineProps<{
  selectedModel: Model|null,
  selectedId: number,
}>();
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
      <v-card-title>
        {{ t('profile.deleteModal.header') }}
      </v-card-title>
      <v-card-text>
        {{ t('profile.deleteModal.confirmation') }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          variant="text"
          @click="deleteItem"
        >
          {{ t('profile.deleteModal.yes') }}
        </v-btn>
        <v-btn
          variant="text"
          @click="emit('close-modal')"
        >
          {{ t('profile.deleteModal.no') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
