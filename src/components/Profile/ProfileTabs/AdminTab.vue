<script setup lang="ts">

import {ref} from "vue";
import LinksTab from "@/components/Profile/Admin/LinksTab.vue";
import UsersTab from "@/components/Profile/Admin/UsersTab.vue";

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
    />
    <v-tabs-window-item
      value="groups"
      class="tab-item"
    />
  </v-tabs-window>
</template>

<style scoped>

</style>
