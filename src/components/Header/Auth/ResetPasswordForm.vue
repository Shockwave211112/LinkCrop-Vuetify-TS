<script lang="ts" setup>
import {inject, onMounted, ref} from "vue";
import type {NotifyFunction} from "@/types/objects";
import router from "@/router";
import {useRoute} from "vue-router";
import {minLength, required, sameAs} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {apiClient} from "@/plugins/axios";

const notify = inject('notify') as NotifyFunction;

const password = ref<string>('');
const passwordConfirmation = ref<string>('');
const token = ref<string>('');

const rules = {
  password: {
    required,
    minLength: minLength(8),
    sameAsConfirmation: sameAs(passwordConfirmation)
  },
  passwordConfirmation: {
    required,
    minLength: minLength(8),
    sameAsPassword: sameAs(password)
  },
}
const v$ = useVuelidate(rules, { password, passwordConfirmation })

async function setNewPassword() {
  if (!token.value) {
    notify("Отсутствует токен для сброса пароля!", 'error');
    return
  }

  const isValid = await v$.value.$validate();
  if (!isValid) {
    notify("Проверьте данные в полях!", 'warning');
    return
  }
  try {
    await apiClient.post('/auth/change-password?token=' + token.value, {
      'password': password.value,
      'password_confirmation': passwordConfirmation.value,
    }).then((response) => {
        router.push("/");
        notify(response.data.message, 'success');
      }
    ).catch(({response}) => {
      notify(response.data.message, 'error');
    })
  } catch (error) {
    notify("Неправильные данные!", 'error');
  }
}
onMounted(() => {
  token.value = useRoute().query.token
})
</script>

<template>
  <main
    class="h-100
      w-75
      ma-auto
      bg-secondary
      d-flex
      flex-column
      align-center
      text-center"
  >
    <v-card class="w-50 mt-10">
      <v-card-title>Смена пароля</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="password"
            type="password"
            variant="outlined"
            label="Введите новый пароль"
            :error="v$.password.$error"
            :class="v$.password.$error ? 'pb-2' : ''"
            :error-messages="v$.password.$errors[0]?.$message.toString()"
          />
          <v-text-field
            v-model="passwordConfirmation"
            type="password"
            variant="outlined"
            label="Повторите новый пароль"
            :error="v$.passwordConfirmation.$error"
            :error-messages="v$.passwordConfirmation.$errors[0]?.$message.toString()"
          />
          <v-btn
            variant="tonal"
            @click="setNewPassword"
          >
            Сохранить новый пароль
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </main>
</template>

<style scoped>
</style>
