<script setup lang="ts">
import type {Group, Link} from "@/types/objects";
import {inject, reactive, ref} from "vue";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

import type {NotifyFunction} from "@/types/objects";
import {useGroupStore} from "@/store/groups";
import {useI18n} from "vue-i18n";
const notify = inject('notify') as NotifyFunction;
const { t } = useI18n();
const groups = useGroupStore().groupList;

const props =  withDefaults(defineProps<{
  link: Link,
  editGroups?: boolean,
}>(), {
  editGroups: false,
});

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

async function validateLinkForm(): Promise<boolean> {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    notify(t('messages.checkFields'), 'warning');
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
        :label="t('profile.links.form.title')"
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
        :disabled="!props.editGroups"
        :label="t('profile.links.form.groups')"
      />
      <v-date-input
        v-model="props.link.created_at"
        variant="outlined"
        disabled
        :label="t('profile.links.form.createdAt')"
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
        :label="t('profile.links.form.redirect')"
        :error="v$.props.link.origin.$error"
        :class="v$.props.link.origin.$error ? 'pb-2' : ''"
        :error-messages="v$.props.link.origin.$errors[0]?.$message.toString()"
      />
      <v-text-field
        v-model="props.link.description"
        variant="outlined"
        :label="t('profile.links.form.description')"
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
