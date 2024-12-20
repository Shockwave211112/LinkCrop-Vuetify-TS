<script setup lang="ts">
import type {Group, Link} from "@/types/objects";
import {inject, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

import type {NotifyFunction} from "@/types/objects";
import {useGroupStore} from "@/store/groups";
const notify = inject('notify') as NotifyFunction;

const groups = useGroupStore().groupList;

const props =  defineProps({
  link: reactive<Link>({
    id: -999,
    name: 'Placeholder',
    description: 'Placeholder',
    referral: 'Placeholder',
    origin: 'Placeholder',
    created_at: Date(),
    updated_at: Date(),
    groups: [],
  }),
  editGroups: ref<boolean>(true),
})

const rules = {
  props: {
    link: {
      name: { required },
      description: { required },
      origin: { required },
    }
  },
};
const v$ = useVuelidate(rules, {props});

async function validateLinkForm() {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    notify("Проверьте данные в полях!", 'warning');
  }
  return isValid;
}
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
        :error="v$.props.link.name.$error"
        :class="v$.props.link.name.$error ? 'pb-2' : ''"
        :error-messages="v$.props.link.name.$errors[0]?.$message.toString()"
      />
      <v-select
        v-model="props.link.groups"
        :items="groups"
        item-value="id"
        item-title="name"
        variant="outlined"
        multiple
        chips
        :disabled="props.editGroups == false"
        label="Группы"
      />
      <v-date-input
        v-model="props.link.created_at"
        variant="outlined"
        disabled
        label="Дата создания"
        format="DD-MM-YYYY"
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
        :error="v$.props.link.origin.$error"
        :class="v$.props.link.origin.$error ? 'pb-2' : ''"
        :error-messages="v$.props.link.origin.$errors[0]?.$message.toString()"
      />
      <v-text-field
        v-model="props.link.description"
        variant="outlined"
        label="Описание"
        :error="v$.props.link.description.$error"
        :class="v$.props.link.description.$error ? 'pb-2' : ''"
        :error-messages="v$.props.link.description.$errors[0]?.$message.toString()"
      />
      <v-row class=" justify-end ma-1 mt-2">
        <slot
          name="buttons"
          :validate="validateLinkForm"
        />
      </v-row>
      <v-spacer class="h-100" />
    </v-col>
  </v-form>
</template>

<style scoped>

</style>
