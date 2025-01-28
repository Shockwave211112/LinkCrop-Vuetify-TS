<script setup lang="ts">
import {computed, inject, ref} from "vue";
import {apiClient} from "@/plugins/axios";
import { Line } from 'vue-chartjs';
import {formatDate} from "@/utils/formatters";
import type {Statistic} from "@/types/responses";
import type {NotifyFunction} from "@/types/objects";
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
import {useI18n} from "vue-i18n";

const notify = inject('notify') as NotifyFunction;
const { t } = useI18n();
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

function getThemeColor(variable: string) {
  const rootStyle = getComputedStyle(document.documentElement);
  return rootStyle.getPropertyValue(variable).trim();
}

const isLoading = ref<boolean>(true);
const props =  defineProps<{
  linkId: number,
}>();
const name = ref<string>('');
const emit = defineEmits(['close-stat'])
const labels = ref<string[]>([]);
const hits = ref<number[]>([]);
const graphData = ref({} as unknown as {
  labels: string[];
  datasets: any[];
});
const graphOptions = ref<object>({
  responsive: true,
  scales: {
    x: {
      ticks: {
        color: computed(() => `rgb(${getThemeColor('--v-theme-on-primary')})`) // Цвет подписей оси X
      },
      grid: {
        color: computed(() => `rgba(${getThemeColor('--v-theme-on-primary')}, 0.1)`) // Сетка оси X
      }
    },
    y: {
      ticks: {
        color: computed(() => `rgb(${getThemeColor('--v-theme-on-primary')})`) // Цвет подписей оси Y
      },
      grid: {
        color: computed(() => `rgba(${getThemeColor('--v-theme-on-primary')}, 0.1)`) // Сетка оси Y
      }
    }
  }
});

function clearData() {
  labels.value = [];
  hits.value = [];
  graphData.value = {
    labels: [],
    datasets: [],
  };
  isLoading.value = true;
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
          label: t('profile.stats.dataLabel'),
          fill: true,  // Включаем заливку под графиком
          borderColor: `rgb(${getThemeColor('--v-theme-accent')})`,  // Цвет линии графика (циановый)
          backgroundColor: `rgba(${getThemeColor('--v-theme-accent')}, 0.2)`,  // Полупрозрачный циановый цвет под графиком
          pointBackgroundColor: `rgb(${getThemeColor('--v-theme-accent')})`,  // Цвет точек (циановый)
          pointBorderColor: `rgb(${getThemeColor('--v-theme-accent')})`,  // Цвет границ точек (циановый)
          pointHoverBackgroundColor: `rgb(${getThemeColor('--v-theme-accent')})`,  // Цвет точек при наведении
          pointHoverBorderColor: `rgb(${getThemeColor('--v-theme-accent')})`,  // Цвет границ точек при наведении
          tension: 0.4,  // Для плавного графика (значение от 0 до 1)
          radius: 5,  // Размер точек
          borderWidth: 2,
          data: hits.value,
        }]
      }
    }).catch(({response}) => {
      notify(response.data.message, 'error');
    }).finally(() => {
      isLoading.value = false;
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
      :loading="isLoading"
      :disabled="isLoading"
    >
      <template #loader="{ isActive }">
        <v-progress-linear
          v-if="isLoading"
          :active="isActive"
          color="accent"
          indeterminate
        />
      </template>
      <v-card-title class="d-flex justify-space-between align-center">
        {{ t('profile.stats.header') + ' #' + name }}
        <v-btn
          icon="mdi-close"
          size="small"
          @click="emit('close-stat')"
        />
      </v-card-title>
      <v-card-text class="d-flex align-center justify-center">
        <v-progress-circular
          v-if="isLoading"
          indeterminate
        />
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
              {{ t('profile.stats.total') + ' #' + hits.reduce((sum, item) => sum + item) }}
            </h3>
          </div>

          <div
            v-else
          >
            {{ t('profile.stats.noData') }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
