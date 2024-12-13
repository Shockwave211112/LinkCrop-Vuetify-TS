<template>
</template>

<script lang="ts" setup>
import {inject, onMounted} from "vue";
import {useUserStore} from "@/store/user";
import type {NotifyFunction} from "@/types/objects";
import router from "@/router";

const user = useUserStore();
const notify = inject('notify') as NotifyFunction;

onMounted(() => {
  const token: string = document.cookie
      .split(';')
      ?.find(item => item.startsWith(`token=`))
      ?.split('=')[1]
    ?? '';

  if(token) {
    try {
      localStorage.setItem('authToken', decodeURIComponent(token));
      user.login();
      notify("Авторизация успешна!", 'success');
    }
    catch(error) {
      router.push('/');
      notify("Произошла ошибка при авторизации.", 'error');
    }
  }
  else {
    router.push('/');
    notify("Произошла ошибка при авторизации.", 'error');
  }
})
</script>

<style scoped>
</style>
