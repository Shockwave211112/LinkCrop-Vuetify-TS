<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import type {Link} from "@/types/objects";
import {apiClient} from "@/plugins/axios";
import {formatDate} from "@/utils/formatters";

import type {NotifyFunction} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

const referralUrl = import.meta.env.VITE_API_URL + '/l/';

const links = ref<Link[]>([]);
const currentPage = ref<number|null>(1);
const totalPages = ref<number|null>(1);

onMounted(() => {
  getLinks();
});

async function getLinks() {
  await apiClient.get('/links')
    .then(({data}) => {
      console.log(data);
      links.value = data.data;
      totalPages.value = data.total;
    })
}

function copyReferral(referral: string) {
  try {
    navigator.clipboard.writeText(referralUrl + referral);
    notify("Скопировано", 'success', 3000);
  } catch($e) {
    notify("Произошла ошибка", 'error', 3000);
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
                  class="d-flex justify-start"
                  cols="2"
                >
                  {{ link.name }}
                </v-col>
                <v-col
                  class="text--secondary"
                  cols="7"
                >
                  {{ link.description }}
                </v-col>
                <v-col
                  class="text--secondary"
                  cols="2"
                >
                  {{ link.referral }}
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
              <div class="d-flex">
                <v-col cols="5">
                  <v-text-field
                    v-model="link.name"
                    variant="outlined"
                    label="Название"
                  />
                  <v-text-field
                    :value="formatDate(link.created_at)"
                    variant="outlined"
                    disabled
                    label="Дата создания"
                  />
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="link.origin"
                    variant="outlined"
                    label="Куда редиректим?"
                  />
                  <v-text-field
                    v-model="link.description"
                    variant="outlined"
                    label="Описание"
                  />
                </v-col>
              </div>
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
