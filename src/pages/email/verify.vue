<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {inject, onMounted, ref} from "vue";
import type {NotifyFunction} from "@/types/objects";
import {apiClient} from "@/plugins/axios";
import {useI18n} from "vue-i18n";
import {useUserStore} from "@/store/user";

const router = useRouter();
const token = ref<string>('');
const userStore = useUserStore();
const notify = inject('notify') as NotifyFunction;
const { t } = useI18n();

async function verifyEmail() {
  try {
    await apiClient.get('/email/verify?token=' + token.value)
      .then((response) => {
          userStore.getInfo();
          router.push('/');
          notify(response.data.message, 'success');
        }
      ).catch(({response}) => {
        notify(response.data.message, 'error');
      })
  } catch (error) {
    notify(t('errors.incorrect'), 'error');
  }
}

onMounted(() => {
  token.value = useRoute().query.token?.toString() ?? '';
  verifyEmail();
})
</script>

<template>
  ...
</template>

<style scoped>
</style>
