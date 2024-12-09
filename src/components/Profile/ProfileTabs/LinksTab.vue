<script setup lang="ts">
import {inject, onMounted, reactive, ref} from "vue";
import type {Group, Link} from "@/types/objects";
import {apiClient} from "@/plugins/axios";
import LinkEditForm from "@/components/Profile/LinkEditForm.vue";

import type {NotifyFunction} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

const referralUrl = import.meta.env.VITE_API_URL + '/l/';
const createDialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);
const loading = ref<boolean>(false);

const search = ref<string>('');
const showingGroups = ref<number[]>([]);
const searchField = ref<string>('name');
const searchFields: object[] = [
  {title: 'Название', value: 'name'},
  {title: 'Описание', value: 'description'},
  {title: 'Куда', value: 'origin'},
  {title: 'Эндпоинт', value: 'referral'},
];

const links = ref<Link[]>([]);
const groups = ref<Group[]>([]);
const currentPage = ref<number>(1);
const currentOrder = ref<string>('id');
const currentSortDir = ref<string>('desc');
const totalPages = ref<number>(1);

const tempCreationLink = ref<Link>({
  id: 0,
  name: '',
  description: '',
  origin: '',
  referral: '',
  updated_at: Date(),
  created_at: Date(),
  groups: [],
});

onMounted(() => {
  fetchLinks();
  fetchGroups();
});

async function fetchLinks(withSearch: boolean = false) {
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

  if(withSearch) {
    if(search.value) {
      params.search = search.value;
      params.searchBy = searchField.value;
    }
    if(showingGroups.value.length) {
      params.groups = showingGroups.value;
    }
  }
  loading.value = true;
  await apiClient.get(`/links`, {params})
    .then(({data}) => {
      links.value = data.data;
      totalPages.value = data.last_page;
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      loading.value = false;
    })
}

async function fetchGroups() {
  await apiClient.get('/groups?all=true')
    .then(({data}) => {
      groups.value = data.data;
    })
}

async function save(validate, link: Link) {
  const isValid = await validate();
  if (isValid) {
    await apiClient.patch('/links/' + link.id, {
      'name': link.name,
      'description': link.description,
      'origin': link.origin,
      'group_id': link.groups,
    }).then(() => {
      notify("Успешно сохранено!", 'success');
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  }
}

async function deleteLink(id: number) {
  await apiClient.delete('/links/' + id).then(() => {
    notify("Успешно удалено!", 'success');
    links.value.splice(links.value.findIndex(item => item.id == id), 1);
  }).catch(({response}) => {
    notify(response.data.message, 'error');
  }).finally(() => {
    deleteDialog.value = false;
  })
}

function copyReferral(referral: string) {
  try {
    navigator.clipboard.writeText(referralUrl + referral);
    notify("Скопировано", 'success');
  } catch (error) {
    notify("Произошла ошибка", 'error');
  }
}

function clearTempLink() {
  tempCreationLink.value = {
    id: 0,
    name: '',
    description: '',
    origin: '',
    referral: '',
    updated_at: Date(),
    created_at: Date(),
    groups: [],
  }
}

async function create(validate, link: Link) {
  const isValid = await validate();
  if (isValid) {
    const data = {
      'name': link.name,
      'description': link.description,
      'origin': link.origin,
      'group_id': link.groups,
    }
    if (!link.groups.length) {
      delete data.group_id;
    }

    await apiClient.post('/links', data).then(() => {
      notify("Создание успешно!", 'success');
      createDialog.value = false;
      clearTempLink();
      fetchLinks();
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  }
}
</script>

<template>
  <v-card
    class="bg-secondary"
    :loading="loading"
    :disabled="loading"
  >
    <v-card-title class="pa-4 d-flex align-center justify-space-between">
      <div
        class="title w-25"
      >
        <span>Список ссылок</span>
        <v-btn
          icon="mdi-plus"
          size="small"
          class="bg-accent ml-4"
          @click="createDialog = true"
        />
      </div>
      <div
        class="search w-25 d-flex"
      >
        <v-text-field
          v-model="search"
          class="w-50"
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          hide-details="auto"
          @keyup.enter="fetchLinks(true)"
        />
        <v-select
          v-model="searchField"
          class="w-25"
          label="Где?"
          hide-details="auto"
          :items="searchFields"
        />
      </div>
      <div
        class="sort w-25 d-flex justify-end"
      >
        <v-select
          v-model="showingGroups"
          label="Группы"
          placeholder="Все"
          hide-details="auto"
          :items="groups"
          item-value="id"
          item-title="name"
          multiple
          max-width="200"
          @focusout="fetchLinks(true)"
        >
          <template #selection="{item, index}">
            <v-chip
              v-if="index < 1"
              class="mr-1"
              size="small"
            >
              {{ item.title }}
            </v-chip>
            <span
              v-else-if="index === 1"
              class="text-grey text-caption align-self-center"
            >
              (+{{ showingGroups?.length - 1 }} др.)
            </span>
          </template>
        </v-select>
      </div>
    </v-card-title>
    <v-card-text>
      <v-expansion-panels class="mb-4">
        <div
          v-for="link in links"
          :key="link.id"
          class="links w-100"
        >
          <v-expansion-panel>
            <v-expansion-panel-title
              v-slot="{ expanded }"
            >
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
                    {{ link.name }}
                  </div>
                </v-col>
                <v-col
                  cols="4"
                >
                  <div class="opacity-30 pb-1">
                    Описание:
                  </div>
                  <div>
                    {{ link.description }}
                  </div>
                </v-col>
                <v-col
                  cols="3"
                >
                  <div class="opacity-30 pb-1">
                    Группы:
                  </div>
                  <v-chip
                    v-for="(group, index) in link.groups"
                    :key="index"
                    class="ma-1"
                  >
                    {{ groups.find(item => item.id == group)?.name }}
                  </v-chip>
                </v-col>
                <v-col
                  cols="2"
                >
                  <div class="opacity-30 pb-1">
                    Эндпоинт:
                  </div>
                  <div>{{ link.referral }}</div>
                </v-col>
                <v-col
                  cols="1"
                  class="d-flex justify-end align-center"
                >
                  <v-btn
                    icon="mdi-chart-line-variant"
                    class="bg-accent mr-2"
                    size="small"
                    @click.stop="copyReferral(link.referral)"
                  />
                  <v-btn
                    icon="mdi-content-copy"
                    size="small"
                    class="bg-accent mr-2"
                    @click.stop="copyReferral(link.referral)"
                  />
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <LinkEditForm
                :link="link"
                :groups="groups"
              >
                <template #buttons="{ validate }">
                  <v-btn
                    icon="mdi-trash-can-outline"
                    class="bg-error mr-3"
                    @click="deleteDialog = true"
                  />
                  <v-btn
                    icon="mdi-content-save"
                    class="bg-success"
                    @click="save(validate, link)"
                  />
                </template>
              </LinkEditForm>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-dialog
            v-model="deleteDialog"
            max-width="400"
            scrim="black"
          >
            <v-card>
              <v-card-title>Уверены?</v-card-title>
              <v-card-text>Вы точно хотите удалить ссылку?</v-card-text>
              <v-card-actions>
                <v-btn
                  variant="text"
                  @click="deleteLink(link.id)"
                >
                  Да
                </v-btn>
                <v-btn
                  variant="text"
                  @click="deleteDialog = false"
                >
                  Нет
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-expansion-panels>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        rounded="circle"
        @update:model-value="fetchLinks"
      />
    </v-card-text>
    <v-dialog
      v-model="createDialog"
      max-width="1000px"
      scrim="black"
    >
      <v-card>
        <v-card-title>Создание новой ссылки</v-card-title>
        <v-card-text>
          <LinkEditForm
            :link="tempCreationLink"
            :groups="groups"
          >
            <template #buttons="{ validate }">
              <v-btn
                icon="mdi-restore"
                class="bg-primary mr-3"
                @click="clearTempLink"
              />
              <v-btn
                icon="mdi-content-save"
                class="bg-success"

                @click="create(validate, tempCreationLink)"
              />
            </template>
          </LinkEditForm>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>
.links {
  font-size: large;
}
</style>
