<script setup lang="ts">
import type {Link, NotifyFunction} from "@/types/objects";
import {inject, onMounted, ref, watch} from "vue";
import {apiClient} from "@/plugins/axios";
import {formatDate} from "@/utils/formatters";
import GroupEditModal from "@/components/Profile/Modals/GroupEditModal.vue";

const notify = inject('notify') as NotifyFunction;
const isLoading = ref<boolean>(true);

const groups = ref<Link[]>([]);
const headers: object[] = [
  { title: 'ID', value: 'id', sortable: true },
  { title: 'Название', value: 'name', sortable: true },
  { title: 'Описание', value: 'description', sortable: true },
  { title: 'Количество ссылок', value: 'count', sortable: true },
  { title: 'ID пользователей', value: 'users', sortable: false },
  { title: 'Дата создания', value: 'created_at', sortable: true },
];

const currentPage = ref<number>(1);
const totalItems = ref<number>(-1);
const perPage = ref<number>(10);

const searchQuery = ref<string>('');
const debounceTimer = ref<number | null>(null);
const searchField = ref<string>('name');
const searchFields: object[] = [
  {title: 'Название', value: 'name'},
  {title: 'Описание', value: 'description'},
  {title: 'Количество ссылок', value: 'count'},
];

const currentOrder = ref<string>('id');
const currentSortDir = ref<string>('desc');

const editDialog = ref<boolean>(false);
const selectedId = ref<number>(-1);

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

  await apiClient.get(`/admin/groups`, {params})
    .then(({data}) => {
      groups.value = data.data;
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
  selectedId.value = id;
  editDialog.value = true;
}

function changeSort(sortBy: object[]) {
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
    <div class="d-flex w-100 justify-space-around">
      <div class="d-flex w-25">
        <v-text-field
          v-model="searchQuery"
          class="w-50"
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          hide-details="auto"
          variant="solo-filled"
          density="comfortable"
          clearable
        />
        <v-select
          v-model="searchField"
          class="w-25"
          label="Где?"
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
      :items="groups"
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
          <td>{{ item.description }}</td>
          <td>{{ item.count }}</td>
          <td>
            <v-chip
              v-for="user in item.users"
              :key="user.id"
            >
              {{ user.id }}
            </v-chip>
          </td>
          <td>{{ formatDate(item.created_at) }}</td>
        </tr>
      </template>
    </v-data-table-server>
  </v-card>
  <GroupEditModal
    v-model="editDialog"
    :group-id="selectedId"
    @close-modal="editDialog = false; selectedId = -1"
    @update-item="fetch"
    @delete-item="editDialog = false; selectedId = -1; fetch"
  />
</template>

<style scoped>

</style>
