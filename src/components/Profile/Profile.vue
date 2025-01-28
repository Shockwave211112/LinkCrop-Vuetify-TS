<script setup lang="ts">
import {onMounted, ref} from "vue";
import LinksTab from "@/components/Profile/ProfileTabs/LinksTab.vue";
import GroupsTab from "@/components/Profile/ProfileTabs/GroupsTab.vue";
import AdminTab from "@/components/Profile/ProfileTabs/AdminTab.vue";
import {useUserStore} from "@/store/user";
import {useGroupStore} from "@/store/groups";
import { useI18n } from 'vue-i18n';
import SettingsTab from "@/components/Profile/ProfileTabs/SettingsTab.vue";

const { t } = useI18n();
const tab = ref<string>('links');
const user = useUserStore().userData;
const groups = useGroupStore();

onMounted(() => {
  groups.fetchGroups();
})
</script>

<template>
  <main class="d-flex flex-grow-1">
    <div class="d-flex flex-grow-1 tabs">
      <v-tabs
        v-model="tab"
        direction="vertical"
        color="selected"
      >
        <v-tab
          prepend-icon="mdi-link"
          :text="t('profile.links.title')"
          value="links"
        />
        <v-tab
          prepend-icon="mdi-group"
          :text="t('profile.groups.title')"
          value="groups"
        />
        <v-tab
          prepend-icon="mdi-cogs"
          :text="t('profile.settings.title')"
          value="settings"
        />
        <v-tab
          v-show="user?.roles.includes('admin')"
          prepend-icon="mdi-cogs"
          :text="t('profile.admin.title')"
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
        <v-tabs-window-item
          value="settings"
          class="tab-item"
        >
          <SettingsTab />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </main>
</template>

<style scoped>
.tab-item {
  height: 100%;
}

.tabs {
  background-color: rgba(var(--v-theme-secondary), 0.8);
  backdrop-filter: blur(5px) contrast(140%);
}
</style>
