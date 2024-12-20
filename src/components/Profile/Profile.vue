<script setup lang="ts">
import {onMounted, ref} from "vue";
import LinksTab from "@/components/Profile/ProfileTabs/LinksTab.vue";
import GroupsTab from "@/components/Profile/ProfileTabs/GroupsTab.vue";
import AdminTab from "@/components/Profile/ProfileTabs/AdminTab.vue";
import {useUserStore} from "@/store/user";
import {useGroupStore} from "@/store/groups";

const tab = ref<string>('links');
const user = useUserStore().userData;
const groups = useGroupStore();

onMounted(() => {
  groups.fetchGroups();
})

</script>

<template>
  <main class="d-flex flex-grow-1">
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
        v-show="user?.roles.includes('admin')"
        prepend-icon="mdi-cogs"
        text="Админка"
        value="admin"
      />
    </v-tabs>
    <v-tabs-window
      v-model="tab"
      class="w-100 h-100"
    >
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
        value="admin"
        class="tab-item"
      >
        <AdminTab />
      </v-tabs-window-item>
    </v-tabs-window>
  </main>
</template>

<style scoped>
main {
  background-color: rgba(var(--v-theme-secondary), 0.8);
  backdrop-filter: blur(3px) contrast(140%);
}

.tab-item {
  height: 100%;
}
</style>
