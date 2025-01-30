<script setup lang="ts">
import StatisticModal from "@/components/Profile/Modals/StatisticModal.vue";
import LinkEditForm from "@/components/Profile/LinkEditForm.vue";
import {inject, onMounted, reactive, ref} from "vue";
import { useGroupStore } from "@/store/groups";
import { apiClient }  from "@/plugins/axios";
import type {Group, Link, NotifyFunction} from "@/types/objects";
import {useLinkStore} from "@/store/links";
import DeleteModal from "@/components/Profile/Modals/DeleteModal.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const notify = inject('notify') as NotifyFunction;

const referralUrl = import.meta.env.VITE_API_URL + '/l/';

const linkStore = useLinkStore();
const groupStore = useGroupStore();

const createDialog = ref<boolean>(false);
const deleteDialog = ref<boolean>(false);
const statisticDialog = ref<boolean>(false);
const selectedId = ref<number>(-1);
const showingGroupsBeforeFocus = ref<number[]>([]);

const searchFields: object[] = [
  {title: t('profile.searchOptions.title'), value: 'name'},
  {title: t('profile.searchOptions.description'), value: 'description'},
  {title: t('profile.searchOptions.redirect'), value: 'origin'},
  {title: t('profile.searchOptions.endpoint'), value: 'referral'},
];

const sortOrders: object[] = [
  {title: 'ID', value: 'id'},
  {title: t('profile.sortOptions.title'), value: 'name'},
  {title: t('profile.sortOptions.description'), value: 'description'},
  {title: t('profile.sortOptions.endpoint'), value: 'referral'},
];

const tempCreationLink = reactive<Link>({
  id: 0,
  name: '',
  description: '',
  referral: '',
  origin: '',
  updated_at: Date(),
  created_at: Date(),
  groups: [],
});

onMounted(() => {
  linkStore.fetchLinks();
});

function filterByGroups(): void {
  if(linkStore.showingGroups.length === showingGroupsBeforeFocus.value.length
    && linkStore.showingGroups.sort().toString() === showingGroupsBeforeFocus.value.sort().toString()) return;

  linkStore.fetchLinks(true);
}

function copyReferral(referral: string) {
  try {
    navigator.clipboard.writeText(referralUrl + referral);
    notify(t('messages.copied'), 'success');
  } catch (error) {
    notify(t('errors.default'), 'error');
  }
}

function clearTempLink() {
  tempCreationLink.id = 0;
  tempCreationLink.name = '';
  tempCreationLink.description = '';
  tempCreationLink.groups = [];
  tempCreationLink.created_at = Date();
  tempCreationLink.updated_at = Date();
  tempCreationLink.origin = '';
}

async function create(validate: () => Promise<boolean>, link: Link) {
  const isValid = await validate();
  if (isValid) {
    const data: {
      name: string,
      description: string,
      origin: string,
      group_id?: number[] | Group[],
    } = {
      'name': link.name,
      'description': link.description,
      'origin': link.origin,
    }
    if (link.groups && link.groups.length) {
      data.group_id = link.groups;
    }

    await apiClient.post('/links', data).then((response) => {
      notify(response.data.message, 'success');
      createDialog.value = false;
      clearTempLink();
      linkStore.fetchLinks(true);
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  }
}

async function save(validate: () => Promise<boolean>, link: Link) {
  const isValid = await validate();
  if (isValid) {
    await apiClient.patch('/links/' + link.id, {
      'name': link.name,
      'description': link.description,
      'origin': link.origin,
      'group_id': link.groups,
    }).then((response) => {
      notify(response.data.message, 'success');
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  }
}

function openDialog(id: number, type: string) {
  selectedId.value = id;

  switch(type) {
    case 'delete':
      deleteDialog.value = true;
      break;
    case 'stats':
      statisticDialog.value = true;
      break;
  }
}

function deleteItem() {
  selectedId.value = -1;
  deleteDialog.value = false;
  linkStore.fetchLinks(true);
}
</script>

<template>
  <v-card
    class="links-list d-flex flex-column h-100"
    :loading="linkStore.isLoading || groupStore.isLoading"
    :disabled="linkStore.isLoading || groupStore.isLoading"
  >
    <template #loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="accent"
        indeterminate
      />
    </template>
    <v-card-title
      v-if="!groupStore.isLoading"
      class="bg-secondary pa-4 d-flex align-center justify-space-between"
    >
      <div
        class="title w-25"
      >
        <span>{{ t('profile.links.header') }}</span>
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
            {{ t('profile.links.create') }}
          </v-tooltip>
        </v-btn>
      </div>
      <div
        class="search w-25 d-flex"
      >
        <v-text-field
          v-model="linkStore.searchQuery"
          class="w-50"
          :label="t('profile.search')"
          prepend-inner-icon="mdi-magnify"
          hide-details="auto"
          variant="solo-filled"
          density="comfortable"
          clearable
        />
        <v-select
          v-model="linkStore.searchField"
          class="w-25"
          :label="t('profile.whereSearch')"
          hide-details="auto"
          :items="searchFields"
          variant="solo-filled"
          density="comfortable"
          @update:model-value="linkStore.fetchLinks(true)"
        />
      </div>
      <div
        class="group-filter w-25 d-flex justify-end"
      >
        <v-btn
          v-model="linkStore.currentSortDir"
          hide-details="auto"
          variant="plain"
          :icon="linkStore.currentSortDir == 'desc' ? 'mdi-arrow-down-thin': 'mdi-arrow-up-thin'"
          @click="(linkStore.currentSortDir == 'desc'
                    ? linkStore.currentSortDir = 'asc'
                    : linkStore.currentSortDir = 'desc');
                  linkStore.fetchLinks(true)"
        >
          <v-icon />
          <v-tooltip
            activator="parent"
            location="top"
          >
            {{ t('profile.sortOrder') }}
          </v-tooltip>
        </v-btn>
        <v-select
          v-model="linkStore.currentOrder"
          :label="t('profile.sort')"
          hide-details="auto"
          :items="sortOrders"
          max-width="140"
          variant="solo-filled"
          density="comfortable"
          @update:model-value="linkStore.fetchLinks(true)"
        />
        <v-select
          v-model="linkStore.showingGroups"
          :label="t('profile.groups.title')"
          :placeholder="t('profile.defaultGroupSelect')"
          hide-details="auto"
          :items="groupStore.groupList"
          item-value="id"
          item-title="name"
          multiple
          max-width="200"
          variant="solo-filled"
          density="comfortable"
          @focusin="showingGroupsBeforeFocus = linkStore.showingGroups"
          @focusout="filterByGroups"
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
              (+{{ linkStore.showingGroups?.length - 1 }})
            </span>
          </template>
        </v-select>
      </div>
    </v-card-title>
    <v-card-text class="d-flex flex-column flex-grow-1">
      <v-expansion-panels
        class="mb-4"
      >
        <div
          v-for="link in linkStore.links"
          :key="link.id"
          class="links w-100"
        >
          <v-expansion-panel class="ma-1">
            <v-expansion-panel-title>
              <v-row
                no-gutters
                class="align-center"
              >
                <v-col
                  cols="2"
                >
                  <div class="opacity-30 pb-1">
                    {{ t('profile.links.table.title') }}
                  </div>
                  <div>
                    {{ link.name }}
                  </div>
                </v-col>
                <v-col
                  cols="4"
                >
                  <div class="opacity-30 pb-1">
                    {{ t('profile.links.table.description') }}
                  </div>
                  <div>
                    {{ link.description }}
                  </div>
                </v-col>
                <v-col
                  cols="4"
                >
                  <div class="opacity-30 pb-1">
                    {{ t('profile.links.table.groups') }}
                  </div>
                  <v-chip
                    v-for="(group, index) in link.groups"
                    :key="index"
                    class="ma-1"
                    size="small"
                  >
                    {{ groupStore?.groupList?.find(item => item.id == group)?.name }}
                  </v-chip>
                </v-col>
                <v-col
                  cols="2"
                >
                  <div class="opacity-30 pb-1">
                    {{ t('profile.links.table.endpoint') }}
                  </div>
                  <div>{{ link.referral }}</div>
                </v-col>
              </v-row>
              <template #actions="{ expanded }">
                <div>
                  <v-btn
                    icon="mdi-chart-line-variant"
                    class="bg-accent mr-2"
                    size="small"
                    @click.stop="openDialog(link.id, 'stats')"
                  >
                    <v-icon />
                    <v-tooltip
                      activator="parent"
                      location="top"
                    >
                      {{ t('profile.links.table.buttons.stat') }}
                    </v-tooltip>
                  </v-btn>
                  <v-btn
                    icon="mdi-content-copy"
                    size="small"
                    class="bg-accent mr-2"
                    @click.stop="copyReferral(link.referral)"
                  >
                    <v-icon />
                    <v-tooltip
                      activator="parent"
                      location="top"
                    >
                      {{ t('profile.links.table.buttons.copy') }}
                    </v-tooltip>
                  </v-btn>
                  <v-icon :icon="expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                </div>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <LinkEditForm
                :link="link"
                :edit-groups="true"
              >
                <template #buttons="{ validate }">
                  <v-btn
                    icon="mdi-trash-can-outline"
                    class="bg-error mr-3"
                    @click="openDialog(link.id, 'delete')"
                  >
                    <v-icon />
                    <v-tooltip
                      activator="parent"
                      location="top"
                    >
                      {{ t('profile.buttons.delete') }}
                    </v-tooltip>
                  </v-btn>
                  <v-btn
                    icon="mdi-content-save"
                    class="bg-success"
                    @click="save(validate, link)"
                  >
                    <v-icon />
                    <v-tooltip
                      activator="parent"
                      location="top"
                    >
                      {{ t('profile.buttons.save') }}
                    </v-tooltip>
                  </v-btn>
                </template>
              </LinkEditForm>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </div>
        <v-progress-circular
          v-if="(groupStore.isLoading || linkStore.isLoading) && !linkStore.links"
          indeterminate
        />
        <h3
          v-else-if="!linkStore.links?.length"
          class="text-gray font-weight-light"
        >
          {{ t('profile.nothingFound') }}
        </h3>
      </v-expansion-panels>
      <v-spacer />
      <v-pagination
        v-model="linkStore.currentPage"
        :length="linkStore.totalPages"
        :total-visible="6"
        rounded="circle"
        class="bg-none"
        @update:model-value="linkStore.fetchLinks(false)"
      />
    </v-card-text>
    <v-dialog
      v-model="createDialog"
      max-width="1000px"
      scrim="black"
    >
      <v-card>
        <v-card-title>
          {{ t('profile.links.form.header') }}
        </v-card-title>
        <v-card-text>
          <LinkEditForm
            :link="tempCreationLink"
            :edit-groups="true"
          >
            <template #buttons="{ validate }">
              <v-btn
                icon="mdi-restore"
                class="bg-primary mr-3"
                @click="clearTempLink"
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  {{ t('profile.buttons.reset') }}
                </v-tooltip>
              </v-btn>
              <v-btn
                icon="mdi-content-save"
                class="bg-success"
                @click="create(validate, tempCreationLink)"
              >
                <v-icon />
                <v-tooltip
                  activator="parent"
                  location="top"
                >
                  {{ t('profile.buttons.save') }}
                </v-tooltip>
              </v-btn>
            </template>
          </LinkEditForm>
        </v-card-text>
      </v-card>
    </v-dialog>
    <DeleteModal
      v-model="deleteDialog"
      :selected-id="selectedId"
      :selected-model="'links'"
      @close-modal="deleteDialog = false; selectedId = -1;"
      @delete-item="deleteItem"
    />
    <StatisticModal
      v-model="statisticDialog"
      :link-id="selectedId"
      @close-stat="statisticDialog = false"
    />
  </v-card>
</template>

<style scoped>
.links {
  font-size: large;
}

.links-list {
  background-color: rgba(var(--v-theme-secondary), 70%);
}
</style>
