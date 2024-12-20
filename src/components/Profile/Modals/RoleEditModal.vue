<script setup lang="ts">
import {computed, inject, onMounted, reactive, ref} from "vue";
import {apiClient} from "@/plugins/axios";

import type {NotifyFunction, Permission, User} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

const isLoading = ref<boolean>(true);
const props =  defineProps({
  role: ref<number>(-1),
});
const emit = defineEmits(['close-modal']);
const permissions = ref<Permission[]>([]);
const activePermissions = ref<number[]>([]);

onMounted(() => {
  fetchAllPermissions();
})

function clearData() {
  activePermissions.value = [];
}

async function fetchAllPermissions() {
  await apiClient.get(`/permissions/`)
    .then(({data}) => {
      permissions.value = data;
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
    })
}

async function save() {
  await apiClient.post(`/permissions/sync`, {
    role_id: props.role.id,
    permissions: activePermissions.value,
  })
    .then(({data}) => {
      notify(data.message, 'success');
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
    })
}

const allSelected = computed(() => {
  return activePermissions.value.length === permissions.value.length;
});

function toggleAllPermissions(): void {
  if (allSelected.value) {
    activePermissions.value = [];
  } else {
    activePermissions.value = permissions.value.map((p) => p.id);
  }
}
</script>

<template>
  <v-dialog
    max-width="500"
    max-height="700"
    scrim="black"
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
        Роль #{{ role.name }}
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
          <v-btn
            size="small"
            variant="outlined"
            class="ma-1"
            @click="toggleAllPermissions"
          >
            {{ allSelected ? 'Снять выделение' : 'Выбрать все' }}
          </v-btn>
          <v-checkbox
            v-for="permission in permissions"
            :key="permission.id"
            v-model="activePermissions"
            :label="'(' + permission.name +') ' + permission.description"
            :value="permission.id"
            hide-details
            density="compact"
          />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          prepend-icon="mdi-content-save"
          class="text-success"
          variant="tonal"
          @click="save"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
