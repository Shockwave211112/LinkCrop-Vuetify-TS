<script setup lang="ts">
import {ref} from "vue";
import RoleEditModal from "@/components/Profile/Modals/RoleEditModal.vue";
import {useI18n} from "vue-i18n";
import type {Role} from "@/types/objects";

const { t } = useI18n();
const roles: Role[] = [
  { id: 1, name: t('profile.admin.roles.admin') },
  { id: 2, name: t('profile.admin.roles.user') },
];
const selectedRole = ref<Role>({
  id: -1,
  name: '',
});
const editDialog = ref<boolean>(false);

function edit(item: Role) {
  selectedRole.value = item;
  editDialog.value = true;
}
</script>

<template>
  <v-card>
    <v-card-title>{{ t('profile.admin.roleList') }}</v-card-title>
    <v-card-text>
      <v-table
        hover
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>{{ t('profile.links.table.title') }}</th>
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
    @close-modal="editDialog = false;"
  />
</template>

<style scoped>

</style>
