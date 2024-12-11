<script setup lang="ts">
import type {Group, Link} from "@/types/objects";
import {inject, reactive} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

import type {NotifyFunction} from "@/types/objects";
import {useGroupStore} from "@/store/groups";
const notify = inject('notify') as NotifyFunction;

const props =  defineProps({
  group: reactive<Group>({
    id: -999,
    name: 'Placeholder',
    description: 'Placeholder',
    count: -999,
    created_at: Date(),
    updated_at: Date(),
  }),
})

const rules = {
  props: {
    group: {
      name: { required },
      description: { required },
    }
  },
};
const v$ = useVuelidate(rules, {props});

async function validateGroupForm() {
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
        v-model="props.group.name"
        variant="outlined"
        label="Название"
        :error="v$.props.group.name.$error"
        :class="v$.props.group.name.$error ? 'pb-2' : ''"
        :error-messages="v$.props.group.name.$errors[0]?.$message.toString()"
      />
      <v-date-input
        v-model="props.group.created_at"
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
        v-model="props.group.description"
        variant="outlined"
        label="Описание"
        :error="v$.props.group.description.$error"
        :class="v$.props.group.description.$error ? 'pb-2' : ''"
        :error-messages="v$.props.group.description.$errors[0]?.$message.toString()"
      />
      <v-row class=" justify-end ma-1 mt-2">
        <slot
          name="buttons"
          :validate="validateGroupForm"
        />
      </v-row>
      <v-spacer class="h-100" />
    </v-col>
  </v-form>
</template>

<style scoped>

</style>
