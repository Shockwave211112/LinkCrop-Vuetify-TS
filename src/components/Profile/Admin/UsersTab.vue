<script setup lang="ts">
import UserEditModal from "@/components/Profile/Modals/UserEditModal.vue";
import type {NotifyFunction, SortItem, User} from "@/types/objects";
import {inject, onMounted, ref, watch} from "vue";
import {apiClient} from "@/plugins/axios";
import {formatDate} from "@/utils/formatters";
import {useI18n} from "vue-i18n";

const notify = inject('notify') as NotifyFunction;
const isLoading = ref<boolean>(true);
const { t } = useI18n();

const users = ref<User[]>([]);
const headers: object[] = [
    { title: 'ID', value: 'id', sortable: true },
    { title: t('profile.admin.users.name'), value: 'name', sortable: true },
    { title: 'Email', value: 'email', sortable: true },
    { title: t('profile.admin.users.createdAt'), value: 'created_at', sortable: true },
];

const currentPage = ref<number>(1);
const totalItems = ref<number>(-1);
const perPage = ref<number>(10);

const searchQuery = ref<string>('');
const debounceTimer = ref<number | null>(null);
const searchField = ref<string>('name');
const searchFields: object[] = [
  {title: t('profile.admin.users.name'), value: 'name'},
  {title: 'Email', value: 'email'},
  {title: 'ID', value: 'id'},
];

const currentOrder = ref<string>('id');
const currentSortDir = ref<string>('desc');

const editDialog = ref<boolean>(false);
const selectedUser = ref<number>(-1);

watch(searchQuery, () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  debounceTimer.value = setTimeout(() => {
    fetch();
  }, 700);
});

async function fetch() {
  const params: {
    page: number,
    orderBy: string,
    dir: string,
    search?: string,
    searchBy?: string,
    groups?: number[],
    perPage?: number,
  } = {
    page: currentPage.value,
    orderBy: currentOrder.value,
    dir: currentSortDir.value,
    perPage: perPage.value,
  };

  if(searchQuery.value) {
    params.search = searchQuery.value;
    params.searchBy = searchField.value;
  }

  isLoading.value = true;

  await apiClient.get(`/user`, {params})
    .then(({data}) => {
      users.value = data.data;
      totalItems.value = data.total;
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
    })
}

onMounted(() => {
  fetch();
})

function edit(id: number) {
  selectedUser.value = id;
  editDialog.value = true;
}

function changeSort(sortBy: SortItem[]) {
  if(sortBy.length) {
    currentOrder.value = sortBy[0]['key'];
    currentSortDir.value = sortBy[0]['order'];
  }
  else {
    currentOrder.value = 'id';
    currentSortDir.value = 'desc';
  }
}
</script>

<template>
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
    <div class="d-flex w-100 justify-space-around ma-2">
      <div class="d-flex w-25">
        <v-text-field
          v-model="searchQuery"
          class="w-75"
          :label="t('profile.search')"
          prepend-inner-icon="mdi-magnify"
          hide-details="auto"
          variant="solo-filled"
          density="comfortable"
          clearable
        />
        <v-select
          v-model="searchField"
          class="w-25"
          :label="t('profile.whereSearch')"
          hide-details="auto"
          :items="searchFields"
          variant="solo-filled"
          density="comfortable"
          @update:model-value="fetch"
        />
      </div>
    </div>
    <v-data-table-server
      v-model:page="currentPage"
      v-model:items-per-page="perPage"
      hover
      :headers="headers"
      :items="users"
      :items-length="totalItems"
      @update:sort-by="changeSort"
      @update:options="fetch"
    >
      <template #body="{ items }">
        <tr
          v-for="item in items"
          :key="item.id"
          @click="edit(item.id)"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
        </tr>
      </template>
    </v-data-table-server>
  </v-card>
  <UserEditModal
    v-model="editDialog"
    :user-id="selectedUser"
    @close-modal="editDialog = false; selectedUser = -1"
    @update-item="fetch"
    @delete-item="editDialog = false; selectedUser = -1; fetch()"
  />
</template>

<style scoped>

</style>
