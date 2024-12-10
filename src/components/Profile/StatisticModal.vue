<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {apiClient} from "@/plugins/axios";
import { Line } from 'vue-chartjs';
import {formatDate} from "@/utils/formatters";
import type {Statistic} from "@/types/responses";

import type {NotifyFunction} from "@/types/objects";
const notify = inject('notify') as NotifyFunction;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const loading = ref<boolean>(true);
const props =  defineProps({
  linkId: ref<number>(-1),
});
const name = ref<string>('');
const emit = defineEmits(['close-stat'])
const labels = ref<string[]>([]);
const hits = ref<number[]>([]);
const graphData = ref<object>({});
const graphOptions = ref<object>({
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: 'white'  // Цвет подписей на оси X
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'  // Цвет сетки оси X (белый с прозрачностью)
      }
    },
    y: {
      ticks: {
        color: 'white'  // Цвет подписей на оси Y
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'  // Цвет сетки оси Y (белый с прозрачностью)
      }
    }
  }
})

function clearData() {
  labels.value = [];
  hits.value = [];
  graphData.value = {};
  loading.value = true;
}

async function fetchLinkInfo() {
  await apiClient.get(`/links/` + props.linkId)
    .then(({data}) => {
      name.value = data.entity.referral;

      data.stats.forEach((item: Statistic) => {
        labels.value.push(formatDate(item.date))
        hits.value.push(item.hits)
      });

      graphData.value = {
        labels: labels.value,
        datasets: [{
          label: 'Переходы',
          fill: true,  // Включаем заливку под графиком
          borderColor: 'rgb(0, 255, 255)',  // Цвет линии графика (циановый)
          backgroundColor: 'rgba(0, 255, 255, 0.2)',  // Полупрозрачный циановый цвет под графиком
          pointBackgroundColor: 'rgb(0, 255, 255)',  // Цвет точек (циановый)
          pointBorderColor: 'rgb(0, 255, 255)',  // Цвет границ точек (циановый)
          pointHoverBackgroundColor: 'rgb(0, 255, 255)',  // Цвет точек при наведении
          pointHoverBorderColor: 'rgb(0, 255, 255)',  // Цвет границ точек при наведении
          tension: 0.4,  // Для плавного графика (значение от 0 до 1)
          radius: 5,  // Размер точек
          borderWidth: 2,
          data: hits.value,
        }]
      }
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      loading.value = false;
    })
}
</script>

<template>
  <v-dialog
    width="1000"
    height="600"
    scrim="black"
    @after-enter="fetchLinkInfo"
    @after-leave="clearData"
  >
    <v-card
      :loading="loading"
      :disabled="loading"
    >
      <template #loader="{ isActive }">
        <!--          Почему то без v-if loading не исчезает.. TODO:убрать v-if отсюда-->
        <v-progress-linear
          v-if="loading"
          :active="isActive"
          color="accent"
          indeterminate
        />
      </template>
      <v-card-title class="d-flex justify-space-between align-center">
        Статистика ссылки #{{ name }}
        <v-btn
          icon="mdi-close"
          size="small"
          @click="emit('close-stat')"
        />
      </v-card-title>
      <v-card-text class="d-flex align-center justify-center">
        <div v-if="loading">
          Загрузка...
        </div>
        <div
          v-else
          class="w-100 h-100 align-center d-flex justify-center flex-column"
        >
          <div
            v-if="hits.length != 0"
            class="w-100 h-100 align-center d-flex justify-center flex-column"
          >
            <Line
              :data="graphData"
              :options="graphOptions"
            />
            <h3 class="text-grey">
              Всего - {{ hits.reduce((sum, item) => sum + item) }}
            </h3>
          </div>

          <div
            v-else
          >
            Нет данных о переходах по данной ссылке!
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
