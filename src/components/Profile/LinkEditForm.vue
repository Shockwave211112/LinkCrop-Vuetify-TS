<script setup lang="ts">
import type {Group, Link} from "@/types/objects";
import {ref} from "vue";

const props =  defineProps({
  link: ref<Link|null>(null),
  groups: ref<Group|null>(null),
})


</script>

<template>
  <v-form class="d-flex">
    <v-col
      cols="5"
      class="d-flex flex-column h-100"
    >
      <v-text-field
        v-model="props.link.name"
        variant="outlined"
        label="Название"
      />
      <v-select
        v-model="props.link.groups"
        :items="groups"
        item-value="id"
        item-title="name"
        variant="outlined"
        multiple
        chips
        label="Группы"
      />
      <v-date-input
        v-model="props.link.created_at"
        variant="outlined"
        disabled
        label="Дата создания"
      />
    </v-col>
    <v-col
      cols="7"
      class="d-flex flex-column"
    >
      <v-text-field
        v-model="props.link.origin"
        variant="outlined"
        label="Куда редиректим?"
      />
      <v-text-field
        v-model="props.link.description"
        variant="outlined"
        label="Описание"
      />
      <v-spacer class="h-100" />
      <v-row class=" justify-end ma-1">
        <slot name="buttons" />
      </v-row>
    </v-col>
  </v-form>
</template>

<style scoped>

</style>
