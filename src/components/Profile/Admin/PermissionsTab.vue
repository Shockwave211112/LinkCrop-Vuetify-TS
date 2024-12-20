<script setup lang="ts">
import {inject, ref} from "vue";
import type {NotifyFunction} from "@/types/objects";
import UserEditModal from "@/components/Profile/Modals/UserEditModal.vue";
import RoleEditModal from "@/components/Profile/Modals/RoleEditModal.vue";

const notify = inject('notify') as NotifyFunction;

const roles: object[] = [
  { id: 1, name: 'Админ' },
  { id: 2, name: 'Пользователь' },
];

const headers: object[] = [
  { title: 'ID', value: 'id', sortable: true },
  { title: 'Имя', value: 'name', sortable: true },
];

const selectedRole = ref<object>({});
const editDialog = ref<boolean>(false);

function edit(item: object) {
  selectedRole.value = item;
  editDialog.value = true;
}
</script>

<template>
  <v-card>
    <v-card-title>Список ролей</v-card-title>
    <v-card-text>
      <v-table
        hover
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="role in roles"
            :key="role.id"
            @click="edit(role)"
          >
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
  <RoleEditModal
    v-model="editDialog"
    :role="selectedRole"
    @close-modal="editDialog = false; selectedId = -1"
  />
</template>

<style scoped>

</style>
