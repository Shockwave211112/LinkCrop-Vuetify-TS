<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app";
import {useRouter} from "vue-router";

const { t } = useI18n();
const router = useRouter();
const appStore = useAppStore();

function start () {
  if(localStorage.getItem('authToken') != null) {
    router.push('/profile');
  }
  else {
    appStore.toggleMenu(true)
  }
}
</script>

<template>
  <main
    class="h-100
      w-75
      ma-auto
      d-flex
      flex-column
      justify-space-around
      text-center"
  >
    <v-container class="pa-4">
      <h1 class="pb-3">
        {{ t('index.welcome') }}
      </h1>
      <p class="font-weight-light">
        {{ t('index.description') }}
      </p>
    </v-container>

    <v-spacer />

    <v-container class="features">
      <h2 class="text-h4 font-weight-bold mb-4">
        {{ t('index.advantages.header') }}
      </h2>
      <div class="list d-flex pl-10 pr-10">
        <v-card
          class="list-item w-25 ma-2"
          hover
          rounded="xl"
        >
          <v-card-title class="d-flex align-center flex-column font-weight-bold">
            <v-icon
              size="x-large"
              color="accent"
            >
              mdi-scissors-cutting
            </v-icon>
            {{ t('index.advantages.adv1.header') }}
          </v-card-title>
          <v-card-text class="font-weight-medium">
            {{ t('index.advantages.adv1.description') }}
          </v-card-text>
        </v-card>
        <v-card
          class="list-item w-25 ma-2"
          hover
          rounded="xl"
        >
          <v-card-title class="d-flex align-center flex-column font-weight-bold">
            <v-icon
              size="x-large"
              color="accent"
            >
              mdi-format-list-group
            </v-icon>
            {{ t('index.advantages.adv2.header') }}
          </v-card-title>
          <v-card-text class="font-weight-medium">
            {{ t('index.advantages.adv2.description') }}
          </v-card-text>
        </v-card>
        <v-card
          class="list-item w-25 ma-2"
          hover
          rounded="xl"
        >
          <v-card-title class="d-flex align-center flex-column font-weight-bold">
            <v-icon
              size="x-large"
              color="accent"
            >
              mdi-chart-areaspline
            </v-icon>
            {{ t('index.advantages.adv3.header') }}
          </v-card-title>
          <v-card-text class="font-weight-medium">
            {{ t('index.advantages.adv3.description') }}
          </v-card-text>
        </v-card>
        <v-card
          class="list-item w-25 ma-2"
          hover
          rounded="xl"
        >
          <v-card-title class="d-flex align-center flex-column font-weight-bold">
            <v-icon
              size="x-large"
              color="accent"
            >
              mdi-monitor-dashboard
            </v-icon>
            {{ t('index.advantages.adv4.header') }}
          </v-card-title>
          <v-card-text class="font-weight-medium">
            {{ t('index.advantages.adv4.description') }}
          </v-card-text>
        </v-card>
      </div>
    </v-container>

    <v-spacer />

    <v-container class="examples d-flex pa-10">
      <div
        class="text-center text-md-start w-33"
      >
        <h2 class="text-h4 font-weight-bold mb-4">
          {{ t('index.usage.header') }}
        </h2>
        <p class="font-weight-light">
          {{ t('index.usage.description') }}
        </p>
      </div>

      <v-card
        class="w-66 ml-10"
        rounded="xl"
      >
        <v-card-text class="text-md-start">
          <v-row>
            <v-col cols="3">
              <v-icon color="accent">
                mdi-chart-bar
              </v-icon>
              <span class="font-weight-bold pl-2">
                {{ t('index.examples.ex1.header') }}
              </span>
            </v-col>
            <v-col cols="9">
              {{ t('index.examples.ex1.description') }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon color="accent">
                mdi-account-multiple
              </v-icon>
              <span class="font-weight-bold pl-2">
                {{ t('index.examples.ex2.header') }}
              </span>
            </v-col>
            <v-col cols="9">
              {{ t('index.examples.ex2.description') }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon color="accent">
                mdi-briefcase
              </v-icon>
              <span class="font-weight-bold pl-2">
                {{ t('index.examples.ex3.header') }}
              </span>
            </v-col>
            <v-col cols="9">
              {{ t('index.examples.ex3.description') }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon color="accent">
                mdi-clock-outline
              </v-icon>
              <span class="font-weight-bold pl-2">
                {{ t('index.examples.ex4.header') }}
              </span>
            </v-col>
            <v-col cols="9">
              {{ t('index.examples.ex4.description') }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container class="go">
      <v-btn
        variant="tonal"
        class="bg-green"
        @click="start"
      >
        {{ t('index.start') }}
      </v-btn>
    </v-container>
    <v-spacer />
  </main>
</template>

<style scoped>
.list-item {
  transition: all 0.3s ease;
  background-color: rgba(var(--v-theme-primary), 0.7);
  border: 1px solid transparent;
}

.list-item:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
  z-index: 30;
  background-color: rgba(var(--v-theme-primary), 1);
  border: 1px solid rgb(var(--v-theme-accent));
}

main {
  background-color: rgba(var(--v-theme-secondary), 0.2);
  backdrop-filter: blur(10px) brightness(90%);
}
</style>
