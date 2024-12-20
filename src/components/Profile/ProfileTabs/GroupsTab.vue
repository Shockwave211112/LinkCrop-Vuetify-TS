<script setup lang="ts">
import GroupEditForm from "@/components/Profile/GroupEditForm.vue";
import {inject, onMounted, reactive, ref, watch} from "vue";
import { apiClient }  from "@/plugins/axios";
import type {Group, NotifyFunction} from "@/types/objects";
import {useGroupStore} from "@/store/groups";
import {useLinkStore} from "@/store/links";
import DeleteModal from "@/components/Profile/Modals/DeleteModal.vue";
const notify = inject('notify') as NotifyFunction;

const linkStore = useLinkStore();
const createDialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);
const selecetedId = ref<number>(-1);
const isLoading = ref<boolean>(false);

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

const groups = ref<Group[]>([]);
const groupStore = useGroupStore();
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);

const tempCreationGroup = reactive<Group>({
  id: 0,
  name: '',
  description: '',
  count: 0,
  updated_at: Date(),
  created_at: Date(),
});

onMounted(() => {
  fetchGroups();
});

watch(searchQuery, () => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }
  debounceTimer.value = setTimeout(() => {
    fetchGroups(true);
  }, 700);
});

async function fetchGroups(withFilters: boolean = false) {
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

  await apiClient.get(`/groups`, {params})
    .then(({data}) => {
      groups.value = data.data;
      totalPages.value = data.last_page;
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
    })
}

function clearTempGroup() {
  tempCreationGroup.id = 0;
  tempCreationGroup.name = '';
  tempCreationGroup.description = '';
  tempCreationGroup.created_at = Date();
  tempCreationGroup.updated_at = Date();
}

async function create(validate, group: Group) {
  const isValid = await validate();
  if (isValid) {
    const data = {
      'name': group.name,
      'description': group.description,
    }

    await apiClient.post('/groups', data).then((response) => {
      notify(response.data.message, 'success');
      createDialog.value = false;
      clearTempGroup();
      fetchGroups(true);
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      groupStore.fetchGroups();
    })
  }
}

async function save(validate, group: Group) {
  const isValid = await validate();
  if (isValid) {
    await apiClient.patch('/groups/' + group.id, {
      'name': group.name,
      'description': group.description,
    }).then((response) => {
      notify(response.data.message, 'success');
      linkStore.fetchLinks(true);
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      groupStore.fetchGroups();
    })
  }
}

function openDialog(id: number, type: string) {
  selecetedId.value = id;

  switch(type) {
    case 'delete':
      deleteDialog.value = true;
      break;
  }
}

function deleteItem() {
  selecetedId.value = -1;
  deleteDialog.value = false;
  fetchGroups(true);
}
</script>

<template>
  <v-card
    class="groups-list d-flex flex-column h-100"
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
    <v-card-title
      class="bg-secondary pa-4 d-flex align-center justify-space-between"
    >
      <div
        class="title w-25"
      >
        <span>Список групп</span>
        <v-btn
          icon="mdi-plus"
          size="small"
          class="bg-accent ml-4"
          @click="createDialog = true"
        >
          <v-icon />
          <v-tooltip
            activator="parent"
            location="top"
          >
            Создать группу
          </v-tooltip>
        </v-btn>
      </div>
      <div
        class="search w-25 d-flex"
      >
        <v-text-field
          v-model="searchQuery"
          class="w-50"
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          hide-details="auto"
          variant="solo-filled"
          density="comfortable"
          clearable
        />
        <v-select
          v-model="searchField"
          class="w-25"
          label="Где?"
          hide-details="auto"
          :items="searchFields"
          variant="solo-filled"
          density="comfortable"
          @update:model-value="fetchGroups(true)"
        />
      </div>
      <div
        class="group-filter w-25 d-flex justify-end"
      >
        <v-btn
          v-model="currentSortDir"
          hide-details="auto"
          variant="plain"
          :icon="currentSortDir == 'desc' ? 'mdi-arrow-down-thin': 'mdi-arrow-up-thin'"
          @click="(currentSortDir == 'desc' ? currentSortDir = 'asc' : currentSortDir = 'desc'); fetchGroups(true)"
        >
          <v-icon />
          <v-tooltip
            activator="parent"
            location="top"
          >
            Порядок сортировки
          </v-tooltip>
        </v-btn>
        <v-select
          v-model="currentOrder"
          label="Сортировка"
          hide-details="auto"
          :items="sortOrders"
          max-width="200"
          variant="solo-filled"
          density="comfortable"
          @update:model-value="fetchGroups(true)"
        />
      </div>
    </v-card-title>
    <v-card-text class="d-flex flex-column flex-grow-1">
      <v-expansion-panels class="mb-4">
        <div
          v-for="group in groups"
          :key="group.id"
          class="groups w-100"
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-row
                no-gutters
                class="align-center"
              >
                <v-col
                  cols="2"
                >
                  <div class="opacity-30 pb-1">
                    Название:
                  </div>
                  <div>
                    {{ group.name }}
                  </div>
                </v-col>
                <v-col
                  cols="6"
                >
                  <div class="opacity-30 pb-1">
                    Описание:
                  </div>
                  <div>
                    {{ group.description }}
                  </div>
                </v-col>
                <v-col>
                  <div class="opacity-30 pb-1">
                    Количество ссылок в группе:
                  </div>
                  <div>{{ group.count }}</div>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <GroupEditForm
                :disabled="group.name.includes('Default')"
                :group="group"
              >
                <template #buttons="{ validate } ">
                  <v-btn
                    v-if="!group.name.includes('Default')"
                    icon="mdi-trash-can-outline"
                    class="bg-error mr-3"
                    @click="openDialog(group.id, 'delete')"
                  >
                    <v-icon />
                    <v-tooltip
                      activator="parent"
                      location="top"
                    >
                      Удалить
                    </v-tooltip>
                  </v-btn>
                  <v-btn
                    v-if="!group.name.includes('Default')"
                    icon="mdi-content-save"
                    class="bg-success"
                    @click="save(validate, group)"
                  >
                    <v-icon />
                    <v-tooltip
                      activator="parent"
                      location="top"
                    >
                      Сохранить
                    </v-tooltip>
                  </v-btn>
                </template>
              </GroupEditForm>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </div>
        <v-progress-circular
          v-if="isLoading && !groups.length"
          indeterminate
        />
        <h3
          v-else-if="!groups.length"
          class="text-gray font-weight-light"
        >
          Ничего не найдено
        </h3>
      </v-expansion-panels>
      <v-spacer />
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="6"
        rounded="circle"
        @update:model-value="fetchGroups()"
      />
    </v-card-text>
    <DeleteModal
      v-model="deleteDialog"
      :selected-id="selecetedId"
      :selected-model="'groups'"
      @close-modal="deleteDialog = false; selecetedId = -1;"
      @delete-item="deleteItem"
    />
    <v-dialog
      v-model="createDialog"
      max-width="1000px"
      scrim="black"
    >
      <v-card>
        <v-card-title>Создание новой группы</v-card-title>
        <v-card-text>
          <GroupEditForm
            :group="tempCreationGroup"
          >
            <template #buttons="{ validate }">
              <v-btn
                icon="mdi-restore"
                class="bg-primary mr-3"
                @click="clearTempGroup"
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  Сбросить поля
                </v-tooltip>
              </v-btn>
              <v-btn
                icon="mdi-content-save"
                class="bg-success"
                @click="create(validate, tempCreationGroup)"
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  Сохранить
                </v-tooltip>
              </v-btn>
            </template>
          </GroupEditForm>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
.groups {
  font-size: large;
}

.groups-list {
  background-color: rgba(var(--v-theme-secondary), 0.9);
}
</style>
