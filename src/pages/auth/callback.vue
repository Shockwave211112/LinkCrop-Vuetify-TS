<template>
</template>

<script lang="ts" setup>
import {inject, onMounted} from "vue";
import {useUserStore} from "@/store/user";
import type {NotifyFunction} from "@/types/objects";
import router from "@/router";
import {useI18n} from "vue-i18n";
import {deleteCookie, getCookie} from "@/utils/cookie";

const { t } = useI18n();
const user = useUserStore();
const notify = inject('notify') as NotifyFunction;

onMounted(() => {
  const token: string = getCookie('token') ?? '';

  if(token) {
    try {
      localStorage.setItem('authToken', decodeURIComponent(token));
      user.login();
      notify(t('messages.login'), 'success');
      deleteCookie('token');
    }
    catch(error) {
      router.push('/');
      notify(t('errors.default'), 'error');
    }
  }
  else {
    router.push('/');
    notify(t('errors.default'), 'error');
  }
})
</script>

<style scoped>
</style>
