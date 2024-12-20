<script setup lang="ts">

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
        Добро пожаловать в LinkCrop!
      </h1>
      <p class="font-weight-light">
        Удобный способ сокращения и управления вашими ссылками.
      </p>
    </v-container>

    <v-spacer />

    <v-container class="features">
      <h2 class="text-h4 font-weight-bold mb-4">
        Наши преимущества
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
            Быстрота
          </v-card-title>
          <v-card-text class="font-weight-medium">
            Сокращение ссылок за секунды.
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
            Группировка
          </v-card-title>
          <v-card-text class="font-weight-medium">
            Возможность создания и назначения групп для ссылок, а также фильтрация по ним.
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
            Статистика
          </v-card-title>
          <v-card-text class="font-weight-medium">
            Функционал просмотра полной статистики переходам по Вашим ссылкам.
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
            Удобство
          </v-card-title>
          <v-card-text class="font-weight-medium">
            Быстрый, понятный и удобный интерфейс.
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
          Как можно использовать наш сервис?
        </h2>
        <p class="font-weight-light">
          Узнайте, как сокращенные ссылки могут помочь вам оптимизировать работу и сделать ваши задачи эффективнее.
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
              <span class="font-weight-bold pl-2">Для маркетинга</span>
            </v-col>
            <v-col cols="9">
              Отслеживайте эффективность рекламных кампаний и оптимизируйте бюджеты.
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon color="accent">
                mdi-account-multiple
              </v-icon>
              <span class="font-weight-bold pl-2">Для блогеров</span>
            </v-col>
            <v-col cols="9">
              Делитесь короткими и удобными ссылками в соцсетях для вашей аудитории.
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon color="accent">
                mdi-briefcase
              </v-icon>
              <span class="font-weight-bold pl-2">Для бизнеса</span>
            </v-col>
            <v-col cols="9">
              Получайте аналитику и улучшайте взаимодействие с клиентами.
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-icon color="accent">
                mdi-clock-outline
              </v-icon>
              <span class="font-weight-bold pl-2">Для всех</span>
            </v-col>
            <v-col cols="9">
              Сокращение ссылок — это просто, быстро и удобно для любых целей.
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container class="go">
      <v-btn
        variant="tonal"
        class="bg-green"
      >
        Начать работу!
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
