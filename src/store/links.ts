import { defineStore } from 'pinia'
import {inject, ref, watch} from "vue";
import { apiClient } from "@/plugins/axios";
import type { Link } from "@/types/objects";
import type { NotifyFunction } from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

export const useLinkStore = defineStore('links', () => {
  const links = ref<Link[]|null>(null);
  const currentPage = ref<number>(1);
  const totalPages = ref<number>(1);

  const currentOrder = ref<string>('id');
  const currentSortDir = ref<string>('desc');
  const searchQuery = ref<string>('');
  const searchField = ref<string>('name');
  const showingGroups = ref<number[]>([]);

  const isLoading = ref<boolean>(true);
  const debounceTimer = ref<number | null>(null);

  async function fetchLinks(withFilters: boolean = false) {
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

      if(showingGroups.value.length) {
        params.groups = showingGroups.value;
      }
    }
    isLoading.value = true;

    await apiClient.get(`/links`, {params})
      .then(({data}) => {
        links.value = data.data;
        totalPages.value = data.last_page;
      }).catch(({response}) => {
        notify(response.data.message, 'error');
      }).finally(() => {
        isLoading.value = false;
      })
  }


  watch(searchQuery, () => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value);
    }
    debounceTimer.value = setTimeout(() => {
      fetchLinks(true);
    }, 700);
  });

  return {
    links,
    currentPage,
    totalPages,
    isLoading,

    searchQuery,
    searchField,
    showingGroups,
    currentOrder,
    currentSortDir,

    fetchLinks,
  }
})
