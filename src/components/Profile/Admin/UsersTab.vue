<script setup lang="ts">
import UserEditModal from "@/components/Profile/Modals/UserEditModal.vue";
import type {NotifyFunction} from "@/types/objects";
import {inject, onMounted, ref} from "vue";
import {apiClient} from "@/plugins/axios";

const notify = inject('notify') as NotifyFunction;
const isLoading = ref<boolean>(true);

const users = ref<Users[]>([]);
const totalPages = ref<number>(1);
const currentPage = ref<number>(1);

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
const sortOrders: object[] = [
  {title: 'ID', value: 'id'},
  {title: 'Название', value: 'name'},
  {title: 'Описание', value: 'description'},
  {title: 'Количество ссылок', value: 'count'},
];

const editUserDialog = ref<boolean>(false);
const selectedUser = ref<number>(-1);

async function fetchUsers(withFilters: boolean = false) {
  const params: {
    page: number,
    orderBy: string,
    dir: string,
    search?: string,
    searchBy?: string,
    groups?: number[],
  } = {
    page: currentPage.value,
    orderBy: currentOrder.value,
    dir: currentSortDir.value,
  };

  if(withFilters) {
    if(searchQuery.value) {
      params.search = searchQuery.value;
      params.searchBy = searchField.value;
    }
  }
  isLoading.value = true;

  await apiClient.get(`/user`, {params})
    .then(({data}) => {
      users.value = data.data;
      totalPages.value = data.last_page;
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
    })
}

onMounted(() => {
  fetchUsers();
})

function editUser(id: number) {
  selectedUser.value = id;
  editUserDialog.value = true;
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
    <v-table
      hover
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Дата регистрации</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          @click="editUser(user.id)"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.created_at }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <UserEditModal
    v-model="editUserDialog"
    :user-id="selectedUser"
    @close-modal="editUserDialog = false; selectedUser = -1"
    @update-item="fetchUsers(true);"
    @delete-item="editUserDialog = false; selectedUser = -1; fetchUsers(true)"
  />
</template>

<style scoped>

</style>
