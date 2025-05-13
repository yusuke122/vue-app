<template>
<div class="offcanvas offcanvas-start show" tabindex="-1" style="visibility: visible;">
  <div class="d-flex" style="height: 100vh;">
    <!-- 左側：カレンダー -->
    <div class="w-50 p-3 border-end">
      <VCalendar 
        :attributes="calendarAttributes"
        @dayclick="onDaySelect"
      />
    </div>

    <!-- 右側：グラフ -->
    <div class="w-50 d-flex flex-column p-3">
      <!-- チェックボックス -->
      <div class="mb-2">
        <label><input type="checkbox" v-model="showChartA" /> グラフA</label>
        <label class="ms-3"><input type="checkbox" v-model="showChartB" /> グラフB</label>
      </div>

      <!-- グラフA -->
      <div class="flex-fill" v-if="showChartA">
        <BarChart :chart-data="chartDataA" />
      </div>

      <!-- グラフB -->
      <div class="flex-fill mt-3" v-if="showChartB">
        <LineChart :chart-data="chartDataB" />
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { BarChart, LineChart } from './components/charts'; // Chart.js ラッパー
import axios from 'axios';

const selectedDate = ref(null);
const showChartA = ref(true);
const showChartB = ref(true);
const chartDataA = ref(null);
const chartDataB = ref(null);
const calendarAttributes = ref([]);

// 初期データの取得（選択可能日付）
const fetchAvailableDates = async () => {
  const res = await axios.get('/api/available-dates');
  calendarAttributes.value = res.data.map(date => ({
    key: date,
    dates: new Date(date),
    customData: true
  }));
};

// 日付選択時の処理
const onDaySelect = async ({ date }) => {
  selectedDate.value = date;

  // 日付ごとのデータ取得
  const res = await axios.get(`/api/data?date=${date.toISOString().split('T')[0]}`);
  chartDataA.value = transformToChartData(res.data.graphA);
  chartDataB.value = transformToChartData(res.data.graphB);
};

const transformToChartData = (data) => ({
  labels: data.labels,
  datasets: [{
    label: data.label,
    data: data.values,
    backgroundColor: 'rgba(75, 192, 192, 0.5)'
  }]
});

fetchAvailableDates();
</script>
