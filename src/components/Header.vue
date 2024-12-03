<script setup lang="ts">
import {ref, watch} from 'vue'
import AuthForm from './AuthForm.vue';
import RegisterForm from './RegisterForm.vue';
import {useUserStore} from "@/store/user";

const menu = ref(false)
const register = ref(false)
watch(menu, (newValue) => {
  if(!newValue) {
    register.value = false
  }
})

const switchForm = () => {
  register.value = !register.value
};

const user = useUserStore()

</script>

<template>
  <header class="position-sticky bg-primary top-0 d-flex align-center justify-space-between pa-5">
    <router-link
      to="/"
      class="text-decoration-none"
    >
      LinkCrop
    </router-link>
    <v-menu
      v-if="!user.isAuthorized"
      v-model="menu"
      min-width="300"
      offset="8"
      :close-on-content-click="false"
      @on-close="register=false"
    >
      <template #activator="{ props }">
        <v-btn
          variant="tonal"
          prepend-icon="mdi-login"
          v-bind="props"
          @click="menu=true"
        >
          Войти/Зарегистрироваться
        </v-btn>
      </template>
      <v-card>
        <transition
          name="fade"
          mode="out-in"
        >
          <AuthForm
            v-if="!register"
            @switch="switchForm"
          />
          <RegisterForm
            v-else
            @switch="switchForm"
          />
        </transition>
      </v-card>
    </v-menu>

    <v-menu
      v-else
      v-model="menu"
      min-width="300"
      offset="8"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <div
          class="user d-flex align-center"
          v-bind="props"
          @click="menu=true"
        >
          <v-icon class="pa-6">
            mdi-account-circle-outline
          </v-icon>
          <span>Юзернейм</span>
        </div>
      </template>
      <v-card>
        <v-list-item>
          <v-btn
            variant="text"
            prepend-icon="mdi-account"
          >
            Мои ссылки
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            variant="text"
            prepend-icon="mdi-logout"
          >
            Выйти
          </v-btn>
        </v-list-item>
      </v-card>
    </v-menu>
  </header>
</template>

<style scoped>
header {
  height: 3.5rem;
  z-index: 20;
  font-size: x-large;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.2);
}

a {
  color: inherit;
  font-weight: bold;
  font-size: x-large;
}

.user:hover {
  cursor: pointer;
  color: red;
  transition: color 0.2s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
