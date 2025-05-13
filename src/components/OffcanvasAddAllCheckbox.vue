<template>
  <div class="offcanvas offcanvas-start show" tabindex="-1" style="visibility: visible; position: static; width: 100vw;">
    <div class="d-flex" style="height: 100vh;">
      
      <!-- 左側：カレンダー -->
      <div class="w-50 border-end p-3">
        <VCalendar
          is-expanded
          @dayclick="onDayClick"
          :attributes="calendarAttributes"
        />
      </div>

      <!-- 右側：グラフ + チェックボックス -->
      <div class="w-50 d-flex flex-column p-3">
        <!-- チェックボックス -->
        <div class="mb-2">
          <label><input type="checkbox" v-model="showAllCharts" @change="toggleAllCharts" /> 全表示</label>
          <label><input type="checkbox" v-model="showChartA" /> グラフA</label>
          <label class="ms-3"><input type="checkbox" v-model="showChartB" /> グラフB</label>
        </div>

        <!-- グラフA -->
        <div class="flex-fill mb-3" v-if="showChartA">
          <BarChart :chart-data="chartDataA" :chart-options="chartOptions" />
        </div>

        <!-- グラフB -->
        <div class="flex-fill" v-if="showChartB">
          <LineChart :chart-data="chartDataB" :chart-options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { VCalendar } from 'v-calendar';
import 'v-calendar/style.css';
import BarChart from './components/BarChart.vue';
import LineChart from './components/LineChart.vue';

const showChartA = ref(true);
const showChartB = ref(true);
const showAllCharts = ref(true);  // 全表示チェックボックス

const selectedDate = ref(new Date());

// ダミーデータ生成（APIの代用）
const getGraphData = (date) => {
  const label = date.toISOString().split('T')[0];
  return {
    labels: ['A', 'B', 'C'],
    values: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
    label: `データ (${label})`,
  };
};

// カレンダー選択可能日付
const calendarAttributes = ref([
  {
    key: 'available',
    highlight: true,
    dates: [new Date()],
  },
]);

const chartDataA = computed(() => {
  const data = getGraphData(selectedDate.value);
  return {
    labels: data.labels,
    datasets: showChartA.value
      ? [{
          label: data.label + ' - A',
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }]
      : [],
  };
});

const chartDataB = computed(() => {
  const data = getGraphData(selectedDate.value);
  return {
    labels: data.labels,
    datasets: showChartB.value
      ? [{
          label: data.label + ' - B',
          data: data.values.map(v => v * 0.8),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
      : [],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      onClick: () => {}, // レジェンドクリック無効化
    },
  },
};

const onDayClick = ({ date }) => {
  selectedDate.value = date;
};

// 全表示チェックボックスの変更時
const toggleAllCharts = () => {
  showChartA.value = showAllCharts.value;
  showChartB.value = showAllCharts.value;
};
</script>
