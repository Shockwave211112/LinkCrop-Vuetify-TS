<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import type {Group, Link} from "@/types/objects";
import {apiClient} from "@/plugins/axios";

import type {NotifyFunction} from "@/types/objects";
import LinkEditForm from "@/components/Profile/LinkEditForm.vue";
const notify = inject('notify') as NotifyFunction;

const referralUrl = import.meta.env.VITE_API_URL + '/l/';

const links = ref<Link[]>([]);
const groups = ref<Group[]>([]);
const currentPage = ref<number|null>(1);
const totalPages = ref<number|null>(1);

onMounted(() => {
  getLinks();
  getGroups();
});

async function getLinks() {
  await apiClient.get('/links')
    .then(({data}) => {
      links.value = data.data;
      totalPages.value = data.last_page;
    })
}

async function getGroups() {
  await apiClient.get('/groups?all=true')
    .then(({data}) => {
      groups.value = data.data;
    })
}

async function save(link: Link) {
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

function copyReferral(referral: string) {
  try {
    navigator.clipboard.writeText(referralUrl + referral);
    notify("Скопировано", 'success');
  } catch(error) {
    notify("Произошла ошибка", 'error');
  }

}
</script>

<template>
  <v-card class="bg-secondary">
    <v-card-title>
      Список твоих ссылок
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
                  cols="7"
                >
                  <div class="opacity-30 pb-1">
                    Описание:
                  </div>
                  <div>
                    {{ link.description }}
                  </div>
                </v-col>
                <v-col
                  cols="2"
                >
                  <div class="opacity-30 pb-1">
                    Эндпоинт:
                  </div>
                  <div>{{ link.referral }}</div>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    icon="mdi-content-copy"
                    size="small"
                    class="bg-accent"
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
                <template #buttons>
                  <v-btn
                    variant="tonal"
                    prepend-icon="mdi-trash-can-outline"
                    class="bg-error mr-3"
                    @click="delete(link.id)"
                  >
                    Удалить
                  </v-btn>
                  <v-btn
                    variant="tonal"
                    prepend-icon="mdi-content-save"
                    class="bg-success"
                    @click="save(link)"
                  >
                    Сохранить
                  </v-btn>
                </template>
              </LinkEditForm>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </div>
      </v-expansion-panels>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        rounded="circle"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.links {
  font-size: large;
}
</style>
