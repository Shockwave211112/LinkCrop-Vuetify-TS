<script setup lang="ts">

import {ref} from "vue";
import LinksTab from "@/components/Profile/Admin/LinksTab.vue";
import UsersTab from "@/components/Profile/Admin/UsersTab.vue";
import GroupsTab from "@/components/Profile/Admin/GroupsTab.vue";
import PermissionsTab from "@/components/Profile/Admin/PermissionsTab.vue";

const tab = ref<string>('users');
</script>

<template>
  <v-tabs
    v-model="tab"
    color="selected"
    bg-color="secondary"
  >
    <v-tab
      prepend-icon="mdi-account-group"
      text="Пользователи"
      value="users"
    />
    <v-tab
      prepend-icon="mdi-link"
      text="Ссылки"
      value="links"
    />
    <v-tab
      prepend-icon="mdi-group"
      text="Группы"
      value="groups"
    />
    <v-tab
      prepend-icon="mdi-group"
      text="Права"
      value="permissions"
    />
  </v-tabs>
  <v-tabs-window
    v-model="tab"
    class="w-100 h-100"
  >
    <v-tabs-window-item
      value="users"
      class="tab-item"
    >
      <UsersTab />
    </v-tabs-window-item>
    <v-tabs-window-item
      value="links"
      class="tab-item"
    >
      <LinksTab />
    </v-tabs-window-item>
    <v-tabs-window-item
      value="groups"
      class="tab-item"
    >
      <GroupsTab />
    </v-tabs-window-item>
    <v-tabs-window-item
      value="permissions"
      class="tab-item"
    >
      <PermissionsTab />
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<style scoped>

</style>
