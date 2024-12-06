<script setup lang="ts">
import {ref} from "vue";
import LinksTab from "@/components/Profile/ProfileTabs/LinksTab.vue";
import GroupsTab from "@/components/Profile/ProfileTabs/GroupsTab.vue";
import AdminTab from "@/components/Profile/ProfileTabs/AdminTab.vue";

const tab = ref('links')
</script>

<template>
  <main class="h-100 d-flex bg-secondary">
    <v-tabs
      v-model="tab"
      direction="vertical"
      color="selected"
    >
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
        prepend-icon="mdi-account-group-outline"
        text="Админка"
        value="admin"
      />
    </v-tabs>
    <v-tabs-window
      v-model="tab"
      class="w-100"
    >
      <v-tabs-window-item value="links">
        <LinksTab />
      </v-tabs-window-item>
      <v-tabs-window-item value="groups">
        <GroupsTab />
      </v-tabs-window-item>
      <v-tabs-window-item value="admin">
        <AdminTab />
      </v-tabs-window-item>
    </v-tabs-window>
  </main>
</template>

<style scoped>
main {
  //background: linear-gradient(145deg, rgba(0,0,0,1) 0%, rgba(0,9,22,1) 35%, rgba(0,14,36,1) 70%, rgba(0,23,56,1) 100%);
}

</style>
