import { defineStore } from 'pinia'
import { ref } from "vue";
import { apiClient } from "@/plugins/axios";
import type { Group } from "@/types/objects";

export const useGroupStore = defineStore('groups', () => {
  const groupList = ref<Group[]>();
  const isLoading = ref<boolean>(true);

  async function fetchGroups() {
    await apiClient.get('/groups/all')
      .then(({data}) => {
        groupList.value = data.data;
      }).finally(() => {
        isLoading.value = false;
      })
  }

  return {
    groupList,
    isLoading,
    fetchGroups
  }
})
